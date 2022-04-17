const server = {
  BASE_URL: 'http://localhost:8000',

  ROUTES: {
    login: '/api/token/',
    signup: '/api/accounts/signup/',
    random: '/api/recommends/random/',
    mypage: '/api/accounts/mypage/',
    password: '/api/accounts/mypage/password/',
    allCities: '/api/cities/',
    attraction: '/get-attraction/',
    writeReview: '/api/reviews/',
    getReview: '/api/reviews/',
    reviewInfo: 'review-info/',
    comment: '/api/reviews/comment/',
    popular: '/api/recommends/popular/',
    review: '/api/reviews/',
    userReview: '/api/reviews/user-reviews/',
    selCity: '/api/recommends/sel-city/',
    tastes: '/api/recommends/taste/',
    city: '/api/cities/',
    result: '/api/recommends/result/',
  },
};

if (process.env.REACT_APP_ENV === 'production') {
  server.BASE_URL = 'https://j6b103.p.ssafy.io:8000';
}
export default server;
