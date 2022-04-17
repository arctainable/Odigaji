
from rest_framework import serializers
from .models import CityReview, Comment

from accounts.serializers import User_mypage_serializer
from cities.serializers import City_serializer

class Review_list_serializer(serializers.ModelSerializer):
    '''
    review들 읽어서 반환하는 serializer
    '''
    user = User_mypage_serializer(read_only=True)
    city = City_serializer(read_only=True)
    class Meta:
        model = CityReview
        fields = (
            "id",
            "title",
            "user",
            "city",
            "updated",
        )
        read_only_fields = ('user', )

class Review_serializer(serializers.ModelSerializer):
    '''
    review 생성하는 serializer
    '''
    user = User_mypage_serializer(read_only=True)
    class Meta:
        model = CityReview
        fields = '__all__'
        read_only_fields = ('user', )

class Comment_list_serializer(serializers.ModelSerializer):
    '''
    review에 대한 comment 목록을 반환 serializer
    '''
    user = User_mypage_serializer(read_only=True)
    class Meta:
        model = Comment
        fields = (
            "id",
            "review_id",
            "user",
            "content",
            "created",
        )
        read_only_fields = ('review_id', 'user')
