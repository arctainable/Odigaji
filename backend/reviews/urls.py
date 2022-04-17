from django.urls import path
from . import views

app_name = 'reviews'
urlpatterns = [
    # 리뷰 전체목록
    path('', views.all_reviews, name='all_reviews'),

    # GET: 해당도시의 리뷰 전체 / POST: 리뷰 작성
    # path('<int:city_id>/<int:page_number>/', views.city_reviews, name='city_reviews'),
    path('<int:city_id>/', views.city_reviews, name='city_reviews'),

    # 유저가 작성한 리뷰 전체
    path('user-reviews/', views.user_reviews, name='user_reviews'),
    
    # GET: 리뷰 상세내용/PUT: 리뷰수정 /DELETE: 리뷰삭제
    path('<int:review_id>/review-info/', views.review_info, name='review_info'),

    # GET: 특정 유저가 쓴 댓글 전체 목록 (마이페이지에서 사용됨)
    path('comment/', views.all_comment, name='all_comment'),

    # GET: 특정 리뷰의 댓글 전체 / POST: 특정 리뷰의 댓글 작성
    path('comment/<int:review_id>/', views.comment_list, name='comment_list'),

    # PUT: 특정 댓글 수정 / DELETE: 특정 댓글 삭제
    path('comment/edit/<int:comment_id>/', views.comment_detail, name='comment_detail'),
    
]