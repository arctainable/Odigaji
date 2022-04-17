import datetime as dt
import pymysql
import random

user_ids = list(range(1, 9)) + list(range(10, 22))

titles = {
    1 : ' 다시 가고 싶어요!',
    2 : '여행 너무 재밌었어요',
    3 : '에서의 즐거운 추억',
    4 : ' 꼭 가세요 두번 가세요'
}

contents = {
    1 : '너무너무 재밌었어요',
    2 : '또 가고 싶어요',
    3 : '강추합니다.'
}

comments = {
    1 : '인정합니다.',
    2 : '여행 좀 치시네요',
    3 : '당신 말이 다 맞습니다.'
}

date = dt.date.today()

# db와 python연결
conn=pymysql.connect(host='3.38.250.117', port=3333, user='root', password='ssafy103', db='test', charset='utf8')
curs = conn.cursor()
conn.commit()

# Attaction 테이블에 컬럼을 지정해 넣는 sql문
review_sql = "INSERT INTO reviews_cityreview (title, content, created, updated, city_id, user_id) values(%s, %s, %s, %s, %s, %s)"

select_sql = 'SELECT name FROM cities_city WHERE id=%s'

comment_sql = "INSERT INTO reviews_comment (content, created, review_id, user_id) values(%s, %s, %s, %s)"

for i in range(1, 396):

    title_n = i%4+1
    content = contents[random.randrange(1, 4)]
    created, updated = date, date
    city_id = i%99 + 1
    curs.execute(select_sql, city_id)
    city_name = curs.fetchone()[0]

    user_id = random.choices(user_ids)[0]

    title = city_name + titles[title_n]
    print((title, content, created, updated, city_id, user_id))

    curs.execute(review_sql, (title, content, created, updated, city_id, user_id))
    curs.execute('SELECT last_insert_id()')
    review_id = curs.fetchone()[0]

    for i in range(1, 4):
        c_content = comments[i]
        c_user_id = random.choices(user_ids)[0]
        curs.execute(comment_sql, (c_content, created, review_id, c_user_id))

conn.commit()