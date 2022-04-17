import React, { useEffect } from 'react';
import './ModalRating.css';
import { AddSelCity } from '../Travelcomponents/SurveyAxios'; // selcity에서 api저장해놓음
function ModalRating({ cityId, rating, setRating }) {
  const stars = [1, 2, 3, 4, 5];
  //idx는 별점인듯,,
  // console.log('rating: ', rating);
  function chooseStar(idx) {
    const TourData = {
      id: cityId,
      rate: idx,
    };
    //지역과 레이팅값을 넣어주고

    AddSelCity(TourData)
      .then((response) => {
        // console.log('지역 데이터 전송', response.data);
        setRating(TourData.rate);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function isFill(idx) {
    if (idx <= rating) {
      return true;
    } else {
      return false;
    }
  }
  useEffect(() => {
    // console.log('rerenderting 되었습니다.', rating);
  }, [rating]);

  return (
    <div className="ModalRating">
      {stars.map((idx) => {
        return (
          <div key={idx} onClick={() => chooseStar(idx)}>
            {isFill(idx) ? (
              <span className="fillgold">★</span>
            ) : (
              <span className="ungold">★</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ModalRating;
