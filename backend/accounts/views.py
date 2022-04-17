from rest_framework import status
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .serializers import User_serializer, User_mypage_serializer, User_password_serializer
from django.shortcuts import get_list_or_404, get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from django.contrib.auth import get_user_model

User = get_user_model()

@swagger_auto_schema(
    methods=['POST'],
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'username': openapi.Schema(type=openapi.TYPE_STRING, description='아이디'),
            'nickname': openapi.Schema(type=openapi.TYPE_STRING, description='닉네임'),
            'password': openapi.Schema(type=openapi.TYPE_STRING, description='비밀번호'),
            'passwordconfirm': openapi.Schema(type=openapi.TYPE_STRING, description='비밀번호확인'),
            'photo': openapi.Schema(type=openapi.TYPE_FILE, description='프로필사진'),
        }
    ),
    responses={201: openapi.Response('회원가입 성공'),
               400: openapi.Response('회원가입 실패')
               })
@api_view(['POST'])
@permission_classes([AllowAny])
# 회원가입시는 인증 x 
def signup(request):
    '''
    회원가입
    '''
    # 사용자에게 요청으로 넘어온 패스워드 데이터 받기
    password = request.data.get('password')
    passwordconfirm = request.data.get('passwordconfirm')

    # 패스워드와 확인용 패스워드 일치 여부 검사
    if password != passwordconfirm:
        return Response({'error': '비밀번호가 일치하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

    # 아이디 일치여부 검사
    if User.objects.filter(username=request.data.get('username')).exists():
        return Response({'error': '이미 존재하는 아이디입니다.'}, status=status.HTTP_400_BAD_REQUEST)
    
    # 닉네임 일치여부 검사
    if User.objects.filter(nickname=request.data.get('nickname')).exists():
        return Response({'error': '이미 존재하는 닉네임입니다.'}, status=status.HTTP_400_BAD_REQUEST)

    # UserSerializer를 통해 사용자가 넘겨준 데이터 직렬화
    serializer = User_serializer(data=request.data)

    # validation (password도 같이 직렬화)
    if serializer.is_valid(raise_exception=True):
        user = serializer.save()
        # password 해싱 -> password -> 문자열 데이터로, set_password 메서드는 User 객체 저장 x 
        user.set_password(request.data.get('password'))
        # 유저 객체 저장
        user.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@swagger_auto_schema(
    methods=['GET'],
    responses={200: openapi.Response('조회 성공', User_mypage_serializer()),
               400: openapi.Response('조회 실패')
               })
@swagger_auto_schema(
    methods=['PUT'],
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'username': openapi.Schema(type=openapi.TYPE_STRING, description='아이디'),
            'nickname': openapi.Schema(type=openapi.TYPE_STRING, description='닉네임'),
            'photo': openapi.Schema(type=openapi.TYPE_FILE, description='프로필사진'),
        }
    ),
    responses={201: openapi.Response('수정 성공', User_mypage_serializer()),
               400: openapi.Response('수정 실패')
               })
@swagger_auto_schema(
    methods=['DELETE'],
    responses={200: openapi.Response('삭제 성공',),
               400: openapi.Response('삭제 실패')
               })
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes((IsAuthenticated,))
def mypage(request):
    '''
    GET: 마이페이지 조회
    PUT: 마이페이지 수정
    DELETE: 회원 탈퇴
    '''
    # mypage 조회
    if request.method == 'GET':
        serializer = User_mypage_serializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # mypage 수정
    elif request.method == 'PUT':

        # mypage 이미지 받기
        photo = request.data.get('photo')
        nickname = request.data["nickname"]
        # 별명 수정 시 일치여부 검사
        if request.user.nickname != nickname and User.objects.filter(nickname=nickname).exists():
            return Response({'error': '이미 존재하는 별명입니다.'}, status=status.HTTP_400_BAD_REQUEST)

        
        serializer = User_mypage_serializer(instance=request.user, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(photo=photo)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'error': '업로드한 파일에 문제가 있습니다.'}, status=status.HTTP_400_BAD_REQUEST)
    
    # 회원탈퇴
    elif request.method == 'DELETE':
        user_pk = request.user.pk
        request.user.delete()
        return Response({ 'delete': f'{user_pk}번 회원이 탈퇴했습니다.' }, status=status.HTTP_204_NO_CONTENT)

#비밀번호 변경
@swagger_auto_schema(
    methods=['PUT'],
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'password': openapi.Schema(type=openapi.TYPE_STRING, description='비밀번호'),
            'passwordconfirm': openapi.Schema(type=openapi.TYPE_STRING, description='비밀번호확인'),
        }
    ),
    responses={201: openapi.Response('변경 성공'),
               400: openapi.Response('변경 실패')
               })
@api_view(['PUT'])
@permission_classes((IsAuthenticated,))
def password(request):
    '''
    비밀번호 변경
    '''
    password = request.data['password']
    passwordconfirm = request.data['passwordconfirm']

    if password != passwordconfirm:
        return Response({'error': '비밀번호가 일치하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        serializer = User_password_serializer(instance=request.user, data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            user.set_password(password)
            user.save()
            return Response({'access': '비밀번호가 변경되었습니다.'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': '비정상적인 접근입니다.'}, status=status.HTTP_400_BAD_REQUEST)
