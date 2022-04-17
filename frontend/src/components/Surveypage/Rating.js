import React from 'react';
import './Rating.css';
import { AddSelCity } from './SurveyAxios';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

function Rating({ tour, tours, setTours }) {
  const stars = [1, 2, 3, 4, 5];

  function chooseStar(idx) {
    const tempTours = [...tours];
    const findIdx = tours.findIndex(
      (ele) => ele.name === tour.name && ele.province === tour.province
    );
    tempTours[findIdx] = { ...tempTours[findIdx], rate: idx };
    setTours(tempTours);
    AddSelCity(tempTours[findIdx])
      .then(() => {
        // console.log('지역-평점 정보 서버 연동 성공');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function isFill(idx) {
    if (idx <= tour.rate) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="Rating">
      {stars.map((idx) => {
        return (
          <div
            className="Rating-star"
            key={idx}
            onClick={() => chooseStar(idx)}
          >
            {isFill(idx) ? (
              <AiFillStar className="Rating-star-icon" />
            ) : (
              <AiOutlineStar className="Rating-star-icon" />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Rating;
