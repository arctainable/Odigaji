# 오디가지 BACKEND

## 개요

- 오디가지 서비스를 위한 백 서버입니다. 
- `Django`프레임워크 4.0.3 버전으로 개발하였으며, `djangorestframework` 3.13.1 버전으로 API 서버로 개발했습니다.
- `djangorestframework-simplejwt` 5.1.0 버전을 통해 유저 인증을 구현했습니다.
- `numpy`, `pandas`, `scipy` 등을 활용한 빅데이터 추천을 메인 기능으로, 관광도시 소개, 도시의 세부 관광지 정보, 커뮤니티 기능등을 지원합니다 .
- `drf-yasg`라이브러리를 활용해 swagger 화면을 제공합니다.

## 실행

- python 3.9.x 버전 기준으로 개발됐습니다.
- `pip(혹은 pip3) install -r requirements.txt` 명령어를 통해 필요한 프레임워크와 라이브러리를 설치합니다
  - 파이썬 가상환경 사용을 권장합니다.
- `python manage.py runserver`를 통해 실행합니다.
  - https상태로 실행할 경우에는 `python manage.py runsslserver --certificate ./fullchain.pem --key ./privkey.pem`로 실행해야하지만, 인증키가 배포된 ec2서버에서 발급되었기에 로컬에서는 https로 실행해도 인증서가 유효하지 않습니다.
  - 또한 깃에는 pem 인증키들이 등록되어있지 않습니다. 필요하시면 따로 연락 부탁드리겠습니다.
- 따로 설정하지 않았다면 로컬호스트의 8000번 서버로 실행됩니다.



## 프로젝트 구조

![image-20220407111055688](README.assets/image-20220407111055688.png)

- venv는 개발에 사용한 가상환경, db.sqlite3는 초기에 테스트 용으로 사용한 db, ~.pem은 배포시 https 인증을 위한 인증서와 키

## App

- 프로젝트에는 `accounts`, `cities`,`recommends`,`reviews`의 4가지 앱이 존재합니다.
  - `accounts`는 회원관리, 마이페이지 등의 기능을 담당합니다.
  - `cities`는 관광 도시와 세부 관광지에 관련된 기능을 담당합니다.
  - `recommends`는 빅데이터 추천을 포함하여, 관광지 추천에 관련된 기능들을 담당합니다.
  - `reviews`는 관광지 리뷰와 댓글 관련 기능을 담당합니다.

- 각 앱에서 제공하는 API에 대한 자세한 정보는 프로젝트를 실행하신 뒤 `http://localhost:8000/swagger`에 접속하셔서 확인할 수 있습니다.



## Requirements

```txt
APScheduler==3.9.1
asgiref==3.5.0
certifi==2021.10.8
charset-normalizer==2.0.12
coreapi==2.3.3
coreschema==0.0.4
Django==4.0.3
django-appconf==1.0.5
django-cors-headers==3.11.0
django-extensions==3.1.5
django-imagekit==4.1.0
django-sslserver==0.22
djangorestframework==3.13.1
djangorestframework-simplejwt==5.1.0
drf-yasg==1.20.0
idna==3.3
inflection==0.5.1
itypes==1.2.0
Jinja2==3.1.1
MarkupSafe==2.1.1
numpy==1.22.3
packaging==21.3
pandas==1.4.1
pilkit==2.0
Pillow==9.0.1
PyJWT==1.7.1
PyMySQL==1.0.2
pyparsing==3.0.7
python-dateutil==2.8.2
pytz==2022.1
pytz-deprecation-shim==0.1.0.post0
requests==2.27.1
ruamel.yaml==0.17.21
ruamel.yaml.clib==0.2.6
scipy==1.8.0
six==1.16.0
sqlparse==0.4.2
tzdata==2022.1
tzlocal==4.1
uritemplate==4.1.1
urllib3==1.26.9
```

- 위와 같은 라이브러리들을 활용하고 있습니다.

## 외부 API

목록

 - 네이버 이미지 검색 API : 세부 관광지의 사진을 가져오기 위해 사용 (cities/views.py)
   - 필요한 정보는 코드 상에 포함되어 있어 활용 시 추가로 필요한 정보는 없습니다.
