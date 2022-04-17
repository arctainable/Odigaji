import React, { useState } from 'react';
import './TourList.css';
import Rating from './Rating';
import Map from './Map';
import { AddSelCity } from './SurveyAxios';
import {
  AiFillDelete,
  AiFillPlusCircle,
  AiOutlinePlusCircle,
} from 'react-icons/ai';

function TourList({ tourData, tours, setTours }) {
  const provinceData = [
    { id: 1, name: '강원도' },
    { id: 2, name: '경기도' },
    { id: 3, name: '경상남도' },
    { id: 4, name: '경상북도' },
    { id: 5, name: '전라남도' },
    { id: 6, name: '전라북도' },
    { id: 7, name: '충청남도' },
    { id: 8, name: '충청북도' },
    { id: 100, name: '자치시도' },
  ];
  const [cities, setCities] = useState([]);
  const [selectCityId, setSelectCityId] = useState(0);
  const [selectCity, setSelectCity] = useState(null);

  function changeProvince(event) {
    const provinceId = Number(event.target.value);
    const tempCities = tourData.filter(
      (data) => data.province_data.id === provinceId
    );
    setCities(tempCities);
    setSelectCity(null);
    setSelectCityId(0);
  }

  function changeCity(event) {
    const tempSelctCity = cities.find(
      (data) => data.id === Number(event.target.value)
    );
    setSelectCity(tempSelctCity);
    setSelectCityId(Number(event.target.value));
  }

  function addCity() {
    const newTour = {
      id: selectCity.id,
      name: selectCity.name,
      provinceName: selectCity.province_data.name,
      rate: 1,
    };
    setSelectCity(null);
    setSelectCityId(0);
    setTours(tours.concat(newTour));
    AddSelCity(newTour)
      .then(() => {
        // console.log('지역-평점 정보 서버 연동 성공');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function isVisit(id) {
    // 이미 방문했다고 추가한 지역인지 판단하는 함수
    return tours.find((tour) => tour.id === id);
  }

  function deleteTour(target) {
    const newTours = tours.filter((tour) => !(tour.id === target.id));
    setTours(newTours);
  }

  return (
    <div className="Tourlist">
      <div className="Tourlist-header">
        다녀온 지역을 등록하고 평점을 입력해주세요
      </div>
      <div className="Tourlist-content">
        <Map tours={tours} />
        <div className="Tourlist-text-content">
          <h4>빈칸을 클릭해서 선택해주세요</h4>
          <div className="Tourlist-select-list">
            <select
              className="Tourlist-select-content"
              onChange={(event) => changeProvince(event)}
            >
              <option value={0}>--도 선택--</option>;
              {provinceData.map((data) => {
                return (
                  <option key={data.id} value={data.id}>
                    {data.name}
                  </option>
                );
              })}
            </select>
            <select
              className="Tourlist-select-content"
              value={selectCityId}
              onChange={(event) => changeCity(event)}
            >
              <option value={0}>--시,군 선택--</option>;
              {cities.map((data) => {
                return (
                  <option
                    key={data.id}
                    value={data.id}
                    disabled={isVisit(data.id)}
                  >
                    {data.name}
                  </option>
                );
              })}
            </select>
            {selectCityId !== 0 ? (
              <AiFillPlusCircle
                className="Tourlist-content-button"
                size="40px"
                onClick={() => addCity()}
              />
            ) : (
              <AiOutlinePlusCircle size="40px" />
            )}
          </div>
          <div className="Tourlist-content-items">
            {tours.map((tour, idx) => {
              return (
                <div className="Tourlist-content-item" key={idx}>
                  <div>
                    {tour.name}({[tour.provinceName]})
                  </div>
                  <div className="Tourlist-content-item-rate">
                    <Rating tour={tour} tours={tours} setTours={setTours} />
                    <AiFillDelete
                      onClick={() => deleteTour(tour)}
                      className="Tourlist-content-item-delete"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourList;
