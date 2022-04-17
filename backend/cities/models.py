from django.db import models
from django.conf import settings
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from recommends.models import Taste

# Create your models here.
User = settings.AUTH_USER_MODEL

class Province(models.Model):
    '''
    도(행정구역)
    '''
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=10)

    def __str__(self):
        return self.name

class City(models.Model):
    '''
    관광도시 정보
    특별시, 광역시, 자치시, 시, 군 등
    '''
    id = models.IntegerField(primary_key=True)
    province = models.ForeignKey(Province, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    info = models.TextField()
    population = models.IntegerField()
    area = models.FloatField()
    photo = ProcessedImageField(
        blank=True,
        upload_to='city_images/',
        # processors=[ResizeToFill(200,200)],
        options={'quality':100 }
    )
    background_photo = ProcessedImageField(
        blank=True,
        upload_to='back_images/',
        # processors=[ResizeToFill(200,200)],
        options={'quality':100 }
    )
    rate_users = models.ManyToManyField(User, through='Visit', default='', related_name='rate_cities')

    def __str__(self):
        return self.name

class Visit(models.Model):
    '''
    user가 방문한 도시 및 평점
    '''
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    rate = models.IntegerField(null=True, validators=[MinValueValidator(0), MaxValueValidator(10)])
    taste = models.ForeignKey(Taste, on_delete=models.CASCADE)


class Attraction(models.Model):
    '''
    관광도시의 세부 관광지
    '''
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    province = models.ForeignKey(Province, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    address = models.CharField(max_length=30)
    facilities = models.TextField(max_length=100)
    parking_lot = models.IntegerField()
    # info = models.TextField()
    tel = models.CharField(max_length=15)
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return self.name