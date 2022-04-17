import React from 'react';
import { NavLink } from 'react-router-dom';
import './Notfound.css';

function Notfound() {
  return (
    <div className="Notfound">
      <div className="Notfound-header">여긴 오디....?</div>
      <img
        alt="오디가지"
        src={process.env.PUBLIC_URL + 'img/오디가지.png'}
        style={{ width: '40%', height: 'auto' }}
      ></img>
      <h1>저희 서비스에서 제공하지 않는 url 주소입니다!!</h1>
      <NavLink className="Notfound-button" to="/">
        메인 페이지로 가기
      </NavLink>
    </div>
  );
}

export default Notfound;
