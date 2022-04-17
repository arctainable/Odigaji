import csv
import pymysql

province_ids = {
    '강원도':1,
    '경기도':2,
    '경상남도':3,
    '경상북도':4,
    '전라남도':5,
    '전라북도':6,
    '충청남도':7,
    '충청북도':8,
    '':100
}

# csv 파일 읽어들임
f = open('여행지 데이터.csv','r',encoding='utf-8')
rdr = csv.reader(f)

# db와 python 연결
conn=pymysql.connect(host='3.38.250.117', port=3333, user='root', password='ssafy103', db='test', charset='utf8')
curs = conn.cursor()
conn.commit()

# City 테이블에 각 컬럼을 지정해 넣는 sql문
sql = "INSERT into cities_city (id, province_id, name, info, population, area, photo) values (%s, %s, %s, %s, %s, %s, %s)"

for line in rdr:
    # 각 줄에서 변수 할당
    city_id = line[0]
    prv_id = province_ids[line[1]]
    name = line[2].lstrip('')
    info = line[3]
    population = line[4]
    area = line[5]
    photo = ''
    print(name, prv_id)
    # 알맞은 변수에 매핑하여 sql문 실행
    curs.execute(sql, (city_id, prv_id, name, info, population, area, ''))

conn.commit()
f.close()

# id,도명,도시명, 소개, 인구수(명), 면적(km^2), 사진url