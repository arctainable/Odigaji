import json

from django.shortcuts import get_list_or_404, get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

import numpy as np
from scipy.sparse import csr_matrix

from .models import Taste
from .serializers import Taste_serializer
from accounts.models import User
from cities.models import City, Visit
from cities.serializers import Visit_serializer, City_visited_serializer, City_serializer

from .recommend import knn_recommend, popular_cities, random_city

# Create your views here.
@swagger_auto_schema(
    methods=['GET'],
    responses={200: openapi.Response('', Visit_serializer(many=True)),
               404: openapi.Response('')
               })
@swagger_auto_schema(
    methods=['POST'],
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'city': openapi.Schema(type=openapi.TYPE_INTEGER, description='도시id'),
            'rate': openapi.Schema(type=openapi.TYPE_INTEGER, description='별점')
        }
    ),
    responses={201: openapi.Response(''),
               400: openapi.Response(''),
               404: openapi.Response('')
               })
@swagger_auto_schema(
    methods=['DELETE'],
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'city': openapi.Schema(type=openapi.TYPE_INTEGER, description='도시id'),
        }
    ),
    responses={201: openapi.Response(''),
               400: openapi.Response(''),
               404: openapi.Response('')
               })
@api_view(["GET", "POST", "DELETE"])
@permission_classes([IsAuthenticated])
def sel_city(request):
    '''
    GET : 본인이 다녀온 지역 확인
    POST : 새로운 지역에 대한 평점 추가
    DELETE : 평점 삭제
    '''
    user = request.user
    if request.method == "GET":
        visits = get_list_or_404(Visit, user_id = user.id)
        serializer = Visit_serializer(visits, many=True)
        return Response(data=serializer.data)

    elif request.method == "POST":
        # 먼저 visit에 연결할 taste가 있는지 확인한다.
        if not Taste.objects.filter(user_id=user.id).exists():      # taste가 없으면
            taste_ser = Taste_serializer(data={})                   # 비어있는 taste를 만들어서 가져간다.
            if taste_ser.is_valid(raise_exception=True):
                taste = taste_ser.save(user=user)
        else:
            taste = get_object_or_404(Taste, user_id=user.id)       # 있으면 찾아서 가져간다.

        city_id = request.data["city"]
        # visit serializer에 맞는 양식
        dic = {'user':user.id,
               'city':city_id,
               'taste':taste.id,
               'rate':request.data.get('rate')
               }

        if not user.rate_cities.filter(pk=city_id).exists():        # 기존에 해당 도시 방문 정보가 없으면 새로
            if request.data.get('rate')==None:
                return Response({"message":"평점 데이터를 넣어주세요."}, status=status.HTTP_400_BAD_REQUEST)
            serializer = Visit_serializer(data=dic)
        else:
            visit = get_object_or_404(Visit, user_id=user.id, city_id=city_id)  # 있으면 기존 visit을 사용
            if request.data.get('rate') == None:                                # rate값이 없으면 삭제 요청처럼 적용
                visit.delete()
                return Response({"message":"별점을 삭제했습니다."},status=status.HTTP_205_RESET_CONTENT)
            serializer = Visit_serializer(instance=visit, data=dic)

        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        visit = get_object_or_404(Visit, user_id=user.id, city_id=request.data.city)
        visit.delete()
        return Response({"message":"별점을 삭제했습니다."}, status=status.HTTP_205_RESET_CONTENT)


@swagger_auto_schema(
    methods=['GET'],
    responses={200: openapi.Response('', Taste_serializer(many=True))})
@swagger_auto_schema(
    methods=['POST'],
    request_body=Taste_serializer,
    responses={200: openapi.Response('', City_visited_serializer(many=True))})
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def taste(request):
    '''
    GET : 본인의 취향 확인
    POST : 취향
    '''
    user = request.user
    if request.method == "GET":
        taste = get_object_or_404(Taste, user_id=user.id)
        serializer = Taste_serializer(taste)
        return Response(serializer.data)

    elif request.method == "POST":
        taste = get_object_or_404(Taste, user_id=user.id)
        serializer = Taste_serializer(instance=taste, data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)

        knn_recommend(user.id)
        taste = get_object_or_404(Taste, user_id=user.id)

        result = json.loads(taste.results)

        rec_cities = []
        for i in range(len(result)):
            city = get_object_or_404(City, id=result[str(i+1)])
            city_dct = City_visited_serializer(city).data
            rec_cities.append(city_dct)
        return Response(data=rec_cities, status=status.HTTP_200_OK)

@swagger_auto_schema(
    methods=['GET'],
    responses={200: openapi.Response('', City_visited_serializer(many=True))})
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def result(request):
    taste = get_object_or_404(Taste, user_id=request.user.id)

    result = json.loads(taste.results)

    rec_cities = []
    for i in range(len(result)):
        city = get_object_or_404(City, id=result[str(i + 1)])
        city_dct = City_visited_serializer(city).data
        rec_cities.append(city_dct)
    return Response(data=rec_cities, status=status.HTTP_200_OK)

@swagger_auto_schema(
    methods=['GET'],
    responses={200: openapi.Response('', City_visited_serializer(many=True))})
@api_view(["GET"])
@permission_classes([AllowAny])
def popular(request, n):
    rank = popular_cities(n)
    populars = []
    for r in rank:
        city_id = r[0]
        city = get_object_or_404(City, id=city_id)
        ser = City_visited_serializer(city)
        populars.append(ser.data)
    return Response(populars, status=status.HTTP_200_OK)

@swagger_auto_schema(
    methods=['GET'],
    responses={200: openapi.Response('', City_serializer)})
@api_view(["GET"])
@permission_classes([AllowAny])
def by_random(request):
    city = random_city()
    serializer = City_serializer(city)
    return Response(serializer.data, status=status.HTTP_200_OK)



















