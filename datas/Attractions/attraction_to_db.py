import pymysql
import csv

# 세부관광지 data
file = open('additional_attraction.csv', 'r', encoding='utf-8')
rdr = csv.reader(file)


# 지방행정구역
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

# db와 python연결
conn=pymysql.connect(host='3.38.250.117', port=3333, user='root', password='ssafy103', db='test', charset='utf8')
curs = conn.cursor()
conn.commit()

# Attaction 테이블에 컬럼을 지정해 넣는 sql문
insert_sql = "INSERT INTO cities_attraction (name, address, facilities, parking_lot, tel, latitude, longitude, city_id, province_id) values(%s, %s, %s, %s, %s, %s, %s, %s, %s)"

# Cities 테이블에서 city_id를 가져오는 sql문
selete_sql = 'SELECT id FROM cities_city WHERE name LIKE %s'



for line in rdr:
    
    '''
    line
    ['관광지명','주소','공공편익시설정보','주차가능수','관리기관전화번호','위도','경도']
    '''
    if not line:
        continue
    name = line[0]  # 관광지명
    tmp = line[1].split()   # tmp(주소): 도, 시
    
    try:
        curs.execute(selete_sql, f"%{tmp[1]}%") # 시 id 찾기
        # print(curs.fetchall()[0][0])

        if tmp[0] in province_ids:
            prv_id = province_ids[tmp[0]] # 도 id
            # curs.execute(selete_sql, tmp[1]) # 시 id 찾기
            city_id = curs.fetchall()

        else:
            prv_id = 100
            curs.execute(selete_sql, tmp[0])
            city_id = curs.fetchall()
        # print(tmp[0], prv_id, tmp[1], city_id)     # 자치구역이름 prv_id 매핑 확인

        address = line[1]
        facilites = line[2] # 공공편의시설
        parking_lot = line[3] if line[3] else 0 # 주차가능수
        tel = line[4]   # 전화번호
        latitude = line[5]  # 위도
        logitude = line[6]  # 경도
        curs.execute(insert_sql, (name, address, facilites, parking_lot, tel, latitude, logitude, city_id, prv_id))
        conn.commit()

    except Exception as e:
        print(line[0])
        print(e)
        

file.close()