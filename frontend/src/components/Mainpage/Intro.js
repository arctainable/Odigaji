import React from 'react';
import { Link } from 'react-router-dom';
import './Intro.css';
import Swal from 'sweetalert2';
// import server from '../../API/server';

function Intro({ randomData, moveCity }) {
  const Odi = () => {
    Swal.fire({
      text: '안녕하세요! 오디가지예요',
      imageUrl: '../../../img/오디가지.png',
      imageWidth: 150,
      imageHeight: 150,
      width: '300px',
      imageAlt: 'Custom image',
      timer: 1000,
      showConfirmButton: false,
    });
  };
  return (
    <div className="Intro">
      <div className="Intro-bg-item"></div>
      <div className="Intro-text">
        <div className="Intro-text-blur">
          <div className="Intro-text-header">
            <div>오디가지에게 당신을 소개하면</div>
            <div>새로운 여행지를 추천해줄 거에요</div>
          </div>
          <div className="Intro-text-content">
            <div>나와 취향이 비슷한 사람들이</div>
            <div>많이 갔던 여행지를 추천해요</div>
            <div>여행지의 인기명소를 추천해요</div>
            <div>생생한 관광지 리뷰도 공유해요</div>
          </div>
        </div>
        {/* <button className="Intro-button">추천받기</button> */}
        <Link className="Intro-button" to="/survey">
          추천받기
        </Link>
      </div>
      {/* <img
        className="Intro-image"
        alt="대표이미지"
        src="../../../img/오디가지.png"
        loading="lazy"
      /> */}
      <img
        className="Intro-image"
        alt="대표이미지"
        src="../../../img/오디가지.png"
        onClick={Odi}
        loading="lazy"
      />
    </div>
  );
}

export default Intro;
