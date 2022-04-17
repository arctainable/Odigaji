import csv, pymysql

file = open('exception_data.csv', 'r', encoding='utf-8')
rdr = csv.reader(file)

conn = pymysql.connect(
    host= '3.38.250.117',
    port=3333,
    user='root',
    password='ssafy103',
    db='test',
    charset='utf8'
)

curs = conn.cursor()
conn.commit()

province_ids = {
    '강원도':1,
    '경상남도':3,
}

insert_sql = "INSERT INTO cities_attraction (name, address, facilities, parking_lot, tel, latitude, longitude, city_id, province_id) values(%s, %s, %s, %s, %s, %s, %s, %s, %s)"

for line in rdr:
    
    '''
    line
    ['관광지명','주소','공공편익시설정보','주차가능수','관리기관전화번호','위도','경도']
    '''

    name = line[0]  # 관광지명
    tmp = line[1].split()   # tmp(주소): 도, 시
    prv_id = province_ids[tmp[0]]
    city_id = 2 if prv_id == 1 else 28

    address = line[1]
    facilites = line[2] # 공공편의시설
    parking_lot = line[3] if line[3] else 0 # 주차가능수
    tel = line[4]   # 전화번호
    latitude = line[5]  # 위도
    logitude = line[6]  # 경도
    curs.execute(insert_sql, (name, address, facilites, parking_lot, tel, latitude, logitude, city_id, prv_id))
    conn.commit()

        

file.close()