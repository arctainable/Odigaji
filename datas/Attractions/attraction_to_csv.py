import csv


org_f = open('1차전처리.csv','r',encoding='cp949')
rdr = csv.reader(org_f)

new_f = open('new_attractions.csv','w', encoding='utf-8')
wtr = csv.writer(new_f)

# column_names = ['관광지명','주소','공공편익시설정보','주차가능수','관리기관전화번호','위도','경도']
# wtr.writerow(column_names)

for line in rdr:
    tmp = [line[0], '', line[7], line[15], line[17], line[4], line[5]]

    if line[2]:     # 도로명 주소가 있을 때
        tmp[1] = line[2]
    elif line[3]:   # 지번 주소만 있을 때
        tmp[1] = line[3]

    if '+' in tmp[2]:
        tmp[2] = tmp[2].split('+')
        tmp[2] = ','.join(tmp[2])
    wtr.writerow(tmp)

org_f.close()
new_f.close()


# 0관광지명, 1관광지구분, 2소재지도로명주소, 3소재지지번주소,
# 4위도, 5경도, 6면적, 7공공편익시설정보, 8숙박시설정보,
# 9운동및오락시설정보, 10휴양및문화시설정보, 11접객시설정보,
# 12지원시설정보, 13지정일자, 14수용인원수, 15주차가능수, 16관광지소개,
# 17관리기관전화번호, 18관리기관명, 19데이터기준일자, 20제공기관코드,
# 21제공기관명

#관광지명,주소,공공편익시설정보,주차가능수,소개,관리기관전화번호,위도,경도