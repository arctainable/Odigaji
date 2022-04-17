import csv, pymysql, random

# 취향설문결과 읽어오기
file = open('취향설문결과.csv','r', encoding='utf-8')
rdr = csv.reader(file)

# 설문지 데이터 비교값
seasons_ch = {  #1
    '봄': 1,
    '여름': 2,
    '가을': 3,
    '겨울': 4
}
mnt_sea_ch = { #2
    '산': 5,
    '바다':6
}
urb_rur_ch = {  #3
    '도시':7,
    '시골':8
}
comp_ch = { #4
    '혼자':9,
    '친구':10,
    '연인':11,
    '가족':12,
}
impo_ch = {
    '풍경': 13,
    '음식':14,
    '액티비티':15,
    '힐링':16,
}
paint_ch = {
    '별이 빛나는 밤에':17,
    '그랑드자트섬의 일요일 오후':18,
    '메모리 지속성의 붕괴':19,
    '민중을 이끄는 자유의 여신':20
}
movie_ch = {
    '기생충':21,
    '토이스토리':22,
    '건축학개론':23,
    '인터스텔라':24,
    '분노의질주': 25,
    '극한직업':26
}
trans_ch = {
    '자가용': 27,
    '대중교통': 28,
    '도보': 29,
}
plan_ch = {
    '계획적': 30,
    '즉흥적': 31
}
mor_eve_ch = {
    '아침형인간': 32,
    '저녁형인간': 33,
}
# db와 mysql 연결
conn = pymysql.connect(host='3.38.250.117', port=3333, user='root', password='ssafy103', db='test', charset='utf8')
curs = conn.cursor()
conn.commit()

# db insert sql
taste_sql = "INSERT INTO recommends_taste (seasons, mnt_sea, urb_rur, comp, impo, paint, movie, trans, plan, mor_eve) values(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
visit_sql = "INSERT INTO cities_visit (city_id, taste_id, rate) values(%s, %s, %s)"


for line in rdr:
    if line[0] == '타임스탬프':
        continue
    season = seasons_ch[line[1]]
    mnt_sea = mnt_sea_ch[line[2]]
    urb_rur = urb_rur_ch[line[3]]
    comp = comp_ch[line[4]]
    impo = random.randrange(13,17)
    paint = paint_ch[line[5]]
    movie = movie_ch[line[6]]
    trans = trans_ch[line[7]]
    plan = plan_ch[line[8]]
    mor_eve = random.randrange(32,34)
    v_1 = line[9].split(':')[0]
    v_2 = line[10].split(':')[0]
    v_3 = line[11].split(':')[0]
    curs.execute(taste_sql, (
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
    curs.execute('SELECT last_insert_id()')
    taste_id = curs.fetchone()[0]

    curs.execute(visit_sql, (v_1, taste_id, 5))
    curs.execute(visit_sql, (v_2, taste_id, 4))
    curs.execute(visit_sql, (v_3, taste_id, 3))

conn.commit()
file.close()