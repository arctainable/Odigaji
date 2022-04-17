import json

import numpy as np
from django.shortcuts import get_list_or_404, get_object_or_404
from scipy.sparse import csr_matrix
import random

from recommends.models import Taste
from accounts.models import User
from cities.models import City, Visit
from cities.serializers import Visit_simple_serializer
from apscheduler.schedulers.background import BackgroundScheduler



def knn_recommend(user_id):
    '''
    추천 함수, url과 연결되지 않은 그냥 함수임.
    '''
    K = 5   # 비슷한 유저 5명 활용(이후에 K를 인자로 받는 방식으로 변경 가능)
    row_of_request_user = get_object_or_404(Taste, user_id=user_id).id
    user_num = Taste.objects.last().id+1
    city_num = City.objects.last().id+1

    # 전체 visit, taste 데이터를 가져와 csr matrix를 만들것
    # visit은 유사한 유저 찾기, 추천에 다 사용할 것이고, taste는 유사한 유저 찾기에만 사용

    # csr_mat작성 필요한 row, col, data 준비
    spr_u = []      #row - User
    spr_c = []      #col - City
    spr_r = []      #data - Rate

    # visit 테이블 데이터를 가져와 위의 리스트 삼대장을 채움
    visits = Visit.objects.all()
    for visit in visits:
        # user의 행은 userid로 찾은 taste의 Id
        user_row_in_taste = Taste.objects.get(id=visit.taste_id).id
        spr_u.append(user_row_in_taste)
        spr_c.append(visit.city_id)
        spr_r.append(visit.rate)

    # 추천에는 visit만 필요함으로 추천용 csr_matrix를 미리 만들어둔다.
    user_city_mat = csr_matrix((spr_r, (spr_u, spr_c)), shape=(user_num, city_num))

    # knn에 사용할 csr_mat를 위해 taste 테이블 데이터를 가져와 삼대장을 계속 채움
    tastes = Taste.objects.all()
    for taste in tastes:

        u_id = taste.id
        if taste.seasons != None:
            spr_u.append(u_id)
            # 들어갈 컬럼은 취향에 따라 위치가 달라지기 때문에 하나하나 작성, 도시 데이터 뒤에 붙기위해 city_num을 붙인다.
            # db에 저장된 taste의 값은 1부터 시작하는 값임. 값 정보는 Taste모델 참조
            spr_c.append(city_num+taste.seasons)
            # 값은 일단 5로 줬는데 결과보고 조정해야함
            spr_r.append(5)
        if taste.mnt_sea != None:
            spr_u.append(u_id)
            spr_c.append(city_num+taste.mnt_sea)
            spr_r.append(5)
        if taste.urb_rur != None:
            spr_u.append(u_id)
            spr_c.append(city_num+taste.urb_rur)
            spr_r.append(5)
        if taste.comp != None:
            spr_u.append(u_id)
            spr_c.append(city_num+taste.comp)
            spr_r.append(5)
        if taste.impo != None:
            spr_u.append(u_id)
            spr_c.append(city_num+taste.impo)
            spr_r.append(5)
        if taste.paint != None:
            spr_u.append(u_id)
            spr_c.append(city_num+taste.paint)
            spr_r.append(5)
        if taste.movie != None:
            spr_u.append(u_id)
            spr_c.append(city_num+taste.movie)
            spr_r.append(5)
        if taste.trans != None:
            spr_u.append(u_id)
            spr_c.append(city_num+taste.trans)
            spr_r.append(5)
        if taste.plan != None:
            spr_u.append(u_id)
            spr_c.append(city_num+taste.plan)
            spr_r.append(5)
        if taste.mor_eve != None:
            spr_u.append(u_id)
            spr_c.append(city_num+taste.mor_eve)
            spr_r.append(5)


    # 삼대장을 활용해서 mat를 만듦. shape에 col은 전체 도시수 + 취향의 총 컬럼 수인 33
    mat = csr_matrix((spr_r, (spr_u, spr_c)), shape=(user_num, city_num+34))
    # 코사인 유사도를 활용해서 유저간 유사도를 나타내는 UbyU dense 행렬을 만든다.
    UbyU = (mat*mat.transpose()).toarray()
    # 자기 자신과의 유사도를 0으로 고정.
    UbyU[range(user_num), range(user_num)] = 0
    # 여기까지가 visit과 taste를 knn알고리즘을 통해 유저별 유사도와 유사한 K명의 유저를 구하는 단계
    topK = UbyU.argsort(axis=1)[:,-K:]
    # 전체 추천도를 예상하는 알고리즘, 속도를 위해 reuest user의 추천 점수만 구하고 싶어서 주석 처리
                # for i in range(user_num):
                #     # 유저 i와, 그와 K번째로 유사한 유저의 유사도 weight
                #     weights = UbyU[i, topK[i]]
                #     # 유저 i의 행에 있는 모든 컬럼(지역)에 유저 j의 가중치 * 유저 j가 해당 지역에 준 평점을 곱해줌
                #     for j in range(K):
                #         user_city_mat[i] += weights[j] * user_city_mat[topK[i, j]]
                #
                #     user_city_mat[i] = user_city_mat[i] / weights.sum()

    # 유저 i와, 그와 K번째로 유사한 유저의 유사도 weight
    weights = UbyU[row_of_request_user, topK[row_of_request_user]]
    # 유저 i의 행에 있는 모든 컬럼(지역)에 유저 j의 가중치 * 유저 j가 해당 지역에 준 평점을 곱해줌
    for j in range(K):
        user_city_mat[row_of_request_user] += weights[j] * user_city_mat[topK[row_of_request_user, j]]
    # user_city_mat[row_of_request_user] = user_city_mat[row_of_request_user] / weights.sum()
    rsl = user_city_mat[row_of_request_user] # 요청을 보낸 유저의 행만 자른 것
    rsl_col = rsl.nonzero()[1] # 그 행에 값이 있는 컬럼의 인덱스들
    rsl_dat = rsl.data  # 값이 있는 컬럼의 값

    rtn = []
    # 값이 있는 행만 순회하며
    for i in range(rsl.count_nonzero()):
        rtn.append((rsl_col[i], rsl_dat[i]))

    max_range = min(rsl.count_nonzero(), 10)
    result = sorted(rtn, key= lambda x:-x[1])[:max_range]
    dic = {}
    for i in range(max_range):
        dic[str(i+1)] = int(result[i][0])
    dic = json.dumps(dic)

    taste = get_object_or_404(Taste, user_id=user_id)
    taste.results = dic
    taste.save()




def popular_cities(n):
    '''
    n개의 인기 도시 반환
    '''
    visits = get_list_or_404(Visit)
    ranks = {}

    for visit in visits:
        city_id = visit.city_id
        rate = visit.rate
        ranks[city_id] = ranks.get(city_id, 0) + rate
    return sorted(ranks.items(), key= lambda x: -x[1])[:n]

def random_city():
    cities = get_list_or_404(City)
    rand_id = random.randrange(0, len(cities))
    return cities[rand_id]