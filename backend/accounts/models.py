from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill

class UserManager(BaseUserManager):
    # 일반 user 생성
    def create_user(self, username, nickname, password=None):
        if not username:
            raise ValueError('must have username')
        if not nickname:
            raise ValueError('must have user nickname')
        user = self.model(
            username = username,
            nickname = nickname,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    # 관리자 user 생성
    def create_superuser(self, username, nickname, password=None):
        user = self.create_user(
            password = password,
            username = username,
            nickname = nickname,
        )
        user.is_admin = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=20, null=False, default='', unique=True)
    nickname = models.CharField(max_length=100, unique=True)
    
    # 유저의 리뷰 및 댓글에 따른 점수 필드
    point = models.BigIntegerField(default=0)

    photo = ProcessedImageField(
        blank=True,
        upload_to='mypage_images/%Y/%m/%d/',
        processors=[ResizeToFill(200,200)],
        format='JPEG',
        options={'quality':100 }
    )

    # 헬퍼 클래스 사용
    objects = UserManager()

    # User 모델의 필수 field
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    # 사용자의 username field는 username으로 설정
    USERNAME_FIELD = 'username'
    # 필수로 작성해야하는 field
    REQUIRED_FIELDS = ['nickname']

    def __str__(self):
        return self.username

    def get_full_name(self):
        pass

    def get_short_name(self):
        pass

    @property
    def is_superuser(self):
        return self.is_admin

    @property
    def is_staff(self):
        return self.is_admin

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return self.is_admin

    @is_staff.setter
    def is_staff(self, value):
        self._is_staff = value
