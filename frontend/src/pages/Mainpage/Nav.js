import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Nav.css';
import Swal from 'sweetalert2';

function Nav() {
  let navigate = useNavigate();
  const isLogin = sessionStorage.getItem('jwt') ? true : false;
  function logout(event) {
    if (window.confirm('정말로 로그아웃하실 건가요?')) {
      event.preventDefault();
      Swal.fire({
        icon: 'success',
        title: '로그아웃 완료',
        // eslint-disable-next-line prettier/prettier
        text: '또 오세요!'
        
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/');
        }
      });
      sessionStorage.removeItem('jwt');
      navigate('/');
    }
  }
  return (
    <div className="Nav">
      <NavLink className="Nav-odi-wrap" to="/">
        <img className="Nav-odi" alt="메인로고" src={'/img/오디가지main.png'} />
      </NavLink>
      {/* <NavLink
        className={({ isActive }) => (isActive ? 'Nav-item-on' : 'Nav-item')}
        to="/"
      >
        메인페이지
      </NavLink> */}
      <div className="Nav-list">
        <NavLink
          className={({ isActive }) => (isActive ? 'Nav-item-on' : 'Nav-item')}
          to="/search"
        >
          직접찾기
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'Nav-item-on' : 'Nav-item')}
          to="/random"
        >
          랜덤여행지
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'Nav-item-on' : 'Nav-item')}
          to="/survey"
        >
          맞춤여행지
        </NavLink>
        {isLogin ? (
          <NavLink
            className={({ isActive }) =>
              isActive ? 'Nav-item-on' : 'Nav-item'
            }
            to="/mypage"
          >
            마이페이지
          </NavLink>
        ) : (
          <NavLink
            className={({ isActive }) =>
              isActive ? 'Nav-item-on' : 'Nav-item'
            }
            to="/signup"
          >
            회원가입
          </NavLink>
        )}
      </div>
      {isLogin ? (
        <button className="Nav-item" onClick={(event) => logout(event)}>
          로그아웃
        </button>
      ) : (
        <NavLink
          className={({ isActive }) => (isActive ? 'Nav-item-on' : 'Nav-item')}
          to="/login"
        >
          로그인
        </NavLink>
      )}
    </div>
  );
}

export default Nav;
