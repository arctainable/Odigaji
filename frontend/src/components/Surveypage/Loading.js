import React, { useEffect } from 'react';
import './Loading.css';

function Loading({ setLoading, time, idx, setIdx }) {
  const imgList = [
    {
      id: 1,
      imgSrc: '/img/당황오디.jpg',
      title: '취향 설문을 읽어보는 중',
    },
    {
      id: 2,
      imgSrc: '/img/놀란가지.jpg',
      title: '살펴볼 데이터들을 모아보는 중',
    },
    {
      id: 3,
      imgSrc: '/img/계산가지.jpg',
      title: '추천 알고리즘을 적용해보는 중',
    },
    {
      id: 4,
      imgSrc: '/img/신난가지.png',
      title: '추천 결과를 페이지에 옮기는 중',
    },
  ];
  useEffect(() => {
    function startLoading() {
      return setTimeout(() => {
        setIdx(idx + 1);
      }, time);
    }
    if (idx >= 4) {
      setLoading(false);
      return () => clearTimeout(startLoading);
    }
    startLoading();
    return () => clearTimeout(startLoading);
  }, [idx, setIdx, setLoading, time]);

  return (
    <div className="Loading">
      {idx <= 3 && <div className="Loading-title">{imgList[idx].title}</div>}
      {imgList.map((imgItem) => {
        return (
          <img
            className={'Loading-img-' + (idx + 1 === imgItem.id ? 'on' : 'off')}
            key={imgItem.id}
            alt="사진"
            src={process.env.PUBLIC_URL + imgItem.imgSrc}
          />
        );
      })}
    </div>
  );
}

export default Loading;
