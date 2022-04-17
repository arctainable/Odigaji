import React, { useEffect, useState } from 'react';
import SearchMap from '../../components/Searchpage/SearchMap';
import SearchContent from '../../components/Searchpage/SearchContent';
import { provinceCities } from '../../components/Randompage/Randomaxios';
import { useNavigate } from 'react-router-dom';
import './Search.css';

function Search() {
  const defaultData = [
    { id: 54, name: '광주광역시' },
    { id: 55, name: '대구광역시' },
    { id: 56, name: '대전광역시' },
    { id: 57, name: '부산광역시' },
    { id: 58, name: '서울특별시' },
    { id: 59, name: '세종특별자치시' },
    { id: 60, name: '울산광역시' },
    { id: 61, name: '인천광역시' },
    { id: 85, name: '제주특별자치도' },
  ];
  const [cityData, setCityData] = useState(defaultData);
  const [cityShow, setCityShow] = useState(false);
  const [cityId, setCityId] = useState(-1);
  const navigate = useNavigate();

  function cityMap(id) {
    setCityId(id);
    provinceCities(id)
      .then((response) => {
        setCityData(response.data);
      })
      .catch((error) => {
        console.log('도시 정보 받아오기 실패', error);
      });
    if (id !== 100) {
      setCityShow(true);
    } else {
      setCityShow(false);
    }
  }

  function backWhole() {
    setCityShow(false);
    setCityData(defaultData);
    setCityId(-1);
  }

  function clickCity(id) {
    if (id === 0) {
      alert('도시를 선택해주세요');
      return;
    }
    navigate(`/local/${id}`);
  }

  useEffect(() => {}, []);

  return (
    <div className="Search">
      <SearchMap
        cityId={cityId}
        cityData={cityData}
        cityShow={cityShow}
        cityMap={cityMap}
        setCityShow={setCityShow}
        backWhole={backWhole}
        clickCity={clickCity}
      />
      <SearchContent
        cityId={cityId}
        cityData={cityData}
        cityMap={cityMap}
        setCityId={setCityId}
        backWhole={backWhole}
        clickCity={clickCity}
      />
    </div>
  );
}

export default Search;
