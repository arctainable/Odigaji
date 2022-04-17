import pymysql
import random
conn = pymysql.connect(
    host='3.38.250.117',
    port=3333, user='root',
    password='ssafy103',
    db='test',
    charset='utf8',
    )

curs = conn.cursor()
conn.commit()

insert_sql = "INSERT INTO recommends_taste (seasons, mnt_sea, urb_rur, comp, impo, paint, movie, trans, plan, mor_eve) values(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"

for i in range(900):
    season = random.randrange(1,5)
    mnt_sea = random.randrange(5,7)
    urb_rur = random.randrange(7,9)
    comp = random.randrange(9,13)
    impo = random.randrange(13,17)
    paint = random.randrange(17,21)
    movie = random.randrange(21,27)
    trans = random.randrange(27,30)
    plan = random.randrange(30,32)
    mor_eve = random.randrange(32,34)
    
    curs.execute(insert_sql, (
        season,
        mnt_sea,
        urb_rur,
        comp,
        impo,
        paint,
        movie,
        trans,
        plan,
        mor_eve,
    ))
# conn.commit()