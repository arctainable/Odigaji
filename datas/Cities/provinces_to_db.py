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
}

# db와 python 연결
conn=pymysql.connect(host='3.38.250.117', port=3333, user='root', password='ssafy103', db='test', charset='utf8')
curs = conn.cursor()
conn.commit()

# City 테이블에 각 컬럼을 지정해 넣는 sql문
sql = "INSERT into cities_province (id, name) values (%s, %s)"


for name, id in province_ids.items():
    print(id, name)
    curs.execute(sql, (id, name))

curs.execute("INSERT into cities_province (id, name) values (%s, %s)", (100, "자치 시도"))
conn.commit()
