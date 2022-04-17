import React from 'react';
import server from '../../API/server';
import { Link } from 'react-router-dom';
function visitedCity({ selCityData }) {
  const starRating = (num) => {
    let result = [];
    for (let i = 0; i < num; i++) {
      result.push(<span className="star-ratings-fill">★</span>);
    }
    return result;
  };
  const starNoneRating = (num) => {
    let result = [];
    for (let i = num; i < 5; i++) {
      result.push(<span>★</span>);
    }
    return result;
  };
  return (
    <div className="VisitedCityContainer">
      <div className="title">방문한 도시</div>
      <div className="VisitedCardWrap">
        <div className="status">
          {selCityData.map((data, key) => {
            return (
              <div key={key} className="item">
                <div className="CardItem">
                  <Link to={{ pathname: `/local/${data.city}` }}>
                    <div className="InnerItems">
                      <img
                        className="Imagenumber"
                        src={server.BASE_URL + data.city_data.photo}
                      />
                      <div className="text">{data.city_data.name}</div>
                      <div className="star-ratings">
                        <div className="starLine">
                          {starRating(data.rate)}
                          {starNoneRating(data.rate)}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="space"></div>
              </div>
            );
          })}
        </div>
        {Array.isArray(selCityData) && selCityData.length === 0 ? (
          <div className="VisitedNoneItems">방문한 도시가 없습니다.</div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
export default visitedCity;
