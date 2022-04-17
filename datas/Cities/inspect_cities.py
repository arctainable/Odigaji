from xmlrpc.client import Boolean
import pymysql

conn = pymysql.connect(
    host='3.38.250.117',
    port=3333, user='root',
    password='ssafy103',
    db='test',
    charset='utf8',
    )

curs = conn.cursor()
conn.commit()

select_sql = "SELECT * FROM cities_attraction WHERE city_id = %s"
print_sql = "SELECT * FROM cities_city WHERE id = %s"
for i in range(100):
    if i == 0:
        continue

    curs.execute(select_sql, i)
    if not bool(curs.fetchall()):
        curs.execute(print_sql, i)
        print(curs.fetchall())
