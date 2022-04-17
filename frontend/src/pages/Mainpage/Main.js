import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Intro from '../../components/Mainpage/Intro';
import Popular from '../../components/Mainpage/Popular';
import Point from '../../components/Mainpage/Point';
import { RandomCity, PopularCity } from '../../components/Mainpage/Mainaxios';
import './Main.css';

function Main() {
  // 아래 두 개의 데이터는 나중에 DB에서 받아오게 수정해야 함
  // 지역의 이름과 해당 지역의 사진을 같이 받아와야 함
  const [randomData, setRandomData] = useState({});
  const [popularData, setPopularData] = useState([]);
  const mainRef = useRef();
  const [pageIndex, setPageIndex] = useState(1);
  const navigate = useNavigate();

  function resizeHandler() {
    if (
      mainRef.current.scrollTop > 0 &&
      mainRef.current.scrollTop < window.innerHeight
    ) {
      console.log('2페이지에서 페이지가 커졌습니다');
      mainRef.current.scrollTo({
        top: window.innerHeight + 5,
        left: 0,
      });
      setPageIndex(2);
    }
  }

  function wheelHandler(event) {
    event.preventDefault(); // wheel 이벤트에 의해 새로고침 되는 것을 막아준다
    const { deltaY } = event; // wheel 이벤트 중 deltaY(휠 방향과 정도) 를 이용한다
    const { scrollTop } = mainRef.current;
    const pageH = window.innerHeight;

    if (deltaY > 0 && scrollTop === 0) {
      // 스크롤을 내릴 때
      // scrollTop === 0 조건을 걸지 않으면 휠을 연속으로 돌릴 때 버벅거린다
      if (scrollTop >= 0 && scrollTop < pageH) {
        mainRef.current.scrollTo({
          top: pageH + 5,
          left: 0,
          behavior: 'smooth',
        });
        setPageIndex(2);
      }
    } else if (deltaY < 0 && scrollTop > pageH) {
      // 스크롤을 올릴 때
      // scrollTop > pageH 조건을 걸지 않으면 휠을 연속으로 위로 돌릴 때 버벅거린다
      if (scrollTop >= 0 && scrollTop > pageH) {
        mainRef.current.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
        setPageIndex(1);
      }
    }
  }

  function moveCity(cityId) {
    const moveUrl = '/local/' + String(cityId);
    navigate(moveUrl);
  }

  useEffect(() => {
    RandomCity()
      .then((response) => {
        setRandomData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    PopularCity(6)
      .then((response) => {
        setPopularData(response.data);
      })
      .catch((error) => {
        console.log('인기 여행지 6곳 불러오기 실패', error);
      });

    const mainRefCurrent = mainRef.current;
    mainRefCurrent.addEventListener('wheel', wheelHandler);
    window.addEventListener('resize', resizeHandler);
    // mainRef를 포함하는 DOM을 할당한 뒤, 해당 DOM에 wheel 이벤트를 부여해준다
    // window DOM에 resize 이벤트를 부여해준다 => 화면의 크기 변화를 감지해준다
    return function () {
      mainRefCurrent.removeEventListener('wheel', wheelHandler);
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <div ref={mainRef} className="Main">
      <Point pageIndex={pageIndex} />
      {randomData.name && <Intro randomData={randomData} moveCity={moveCity} />}
      <div className="Divider"></div>
      {popularData.length === 6 && (
        <Popular popularData={popularData} moveCity={moveCity} />
      )}
    </div>
  );
}

export default Main;
