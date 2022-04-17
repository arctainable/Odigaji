from django.db import models
from django.conf import settings

# Create your models here.
class Taste(models.Model):
    '''
    추천을 위한 취향 데이터
    '''
    # 초이스 필드들
    seasons_ch = (  #1
        (1, '봄'),
        (2, '여름'),
        (3, '가을'),
        (4, '겨울'))
    mnt_sea_ch = (  #2
        (5, '산'),
        (6, '바다'))
    urb_rur_ch = (  #3
        (7, '도시'),
        (8, '시골'))
    comp_ch = (     #4
        (9, '혼자'),
        (10, '친구'),
        (11, '연인'),
        (12, '가족'))
    impo_ch = (     #5
        (13, '풍경'),
        (14, '음식'),
        (15, '액티비티'),
        (16, '힐링'))
    paint_ch = (    #6
        (17, '별이 빛나는 밤'),
        (18, '그랑드자트섬의 일요일 오후'),
        (19, '메모리 지속성의 붕괴'),
        (20, '민중을 이끄는 자유의 여신'))
    movie_ch = (    #7
        (21, '기생충'), (22, '토이스토리'),
        (23, '인터스텔라'), (24, '건축학개론'),
        (25, '분노의 질주'), (26, '극한직업'))
    trans_ch = (    #8
        (27, '자가용'),
        (28, '대중교통'),
        (29, '도보'))
    plan_ch = (     #9
        (30, '계획적'),
        (31, '즉흥적'))
    mor_eve_ch = (  #10
        (32, '아침형 인간'),
        (33, '저녁형 인간'))

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, related_name="taste")
    seasons = models.IntegerField(choices=seasons_ch, null=True)
    mnt_sea = models.IntegerField(choices=mnt_sea_ch, null=True)
    urb_rur = models.IntegerField(choices=urb_rur_ch, null=True)
    comp = models.IntegerField(choices=comp_ch, null=True)
    impo = models.IntegerField(choices=impo_ch, null=True)
    paint = models.IntegerField(choices=paint_ch, null=True)
    movie = models.IntegerField(choices=movie_ch, null=True)
    trans = models.IntegerField(choices=trans_ch, null=True)
    plan = models.IntegerField(choices=plan_ch, null=True)
    mor_eve = models.IntegerField(choices=mor_eve_ch, null=True)
    results = models.JSONField(null=True, default=None)