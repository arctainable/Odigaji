import React, { useState } from 'react';
import './Random.css';
import RouletteDo from '../../components/Randompage/RouletteDo';
import RouletteSi from '../../components/Randompage/RouletteSi';
import RandomButton from '../../components/Randompage/RandomButton';
import RandomModal from '../../components/Randompage/RandomModal';
import { provinceCities } from '../../components/Randompage/Randomaxios';
import { useNavigate } from 'react-router-dom';

function Random() {
  const [randomResult, setRandomResult] = useState([]);
  const [cities, setCities] = useState([]);
  const [provinceSpin, setProvinceSpin] = useState(false);
  const [citySpin, setCitySpin] = useState(false);
  const [provinceNumber, setProvinceNumber] = useState(0);
  const [cityNumber, setCityNumber] = useState(0);
  const [textShow, setTextShow] = useState(false);
  const [cityShow, setCityShow] = useState(false);
  const navigate = useNavigate();
  const provinceData = [
    { option: '강원도', id: 1 },
    { option: '경기도', id: 2 },
    { option: '경상남도', id: 3 },
    { option: '경상북도', id: 4 },
    { option: '전라남도', id: 5 },
    { option: '전라북도', id: 6 },
    { option: '충청남도', id: 7 },
    { option: '충청북도', id: 8 },
    { option: '자치시도', id: 100 },
  ];

  function moveCity(cityId) {
    const moveUrl = `/local/${cityId}`;
    navigate(moveUrl);
  }

  function selectProvince(provinceId) {
    provinceCities(provinceId)
      .then((response) => {
        setCities(response.data);
        const newCityNumber = Math.floor(Math.random() * response.data.length);
        setCityNumber(newCityNumber);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function provinceStart() {
    setCityShow(false);
    const newProvinceNumber = Math.floor(Math.random() * provinceData.length);
    setRandomResult([]);
    setProvinceNumber(newProvinceNumber);
    selectProvince(provinceData[newProvinceNumber].id);
    setProvinceSpin(true);
  }

  function stopProvinceSpin() {
    setProvinceSpin(false);
    const newRandomResult = provinceData[provinceNumber].option;
    setRandomResult(randomResult.concat(newRandomResult));
    setTextShow(true);
    setTimeout(() => {
      setTextShow(false);
      setTimeout(() => {
        setCitySpin(true);
      }, 10);
      setCityShow(true);
    }, 1500);
  }

  return (
    <div className="Random">
      <div className="Random-header">
        <img
          className="Random-header-odi"
          alt="메인로고"
          src={'/img/오디가지.png'}
        />
        오디가지 마음대로 랜덤 추천
        <img
          className="Random-header-odi"
          alt="메인로고"
          src={'/img/오디가지_rev.png'}
        />
      </div>
      <div className="Random-content">
        {!cityShow && (
          <RouletteDo
            cityShow={cityShow}
            textShow={textShow}
            provinceData={provinceData}
            provinceNumber={provinceNumber}
            provinceSpin={provinceSpin}
            stopProvinceSpin={stopProvinceSpin}
          />
        )}
        {cityShow && (
          <RouletteSi
            cities={cities}
            citySpin={citySpin}
            cityNumber={cityNumber}
            setCitySpin={setCitySpin}
            randomResult={randomResult}
            setRandomResult={setRandomResult}
          />
        )}
        <RandomModal textShow={textShow} randomResult={randomResult} />
      </div>
      <button
        className="Random-result"
        style={{ visibility: randomResult.length >= 2 ? 'visible' : 'hidden' }}
        onClick={() => moveCity(randomResult[2])}
      >
        {randomResult[1]} 알아보기!
      </button>
      <RandomButton
        provinceSpin={provinceSpin}
        citySpin={citySpin}
        cityShow={cityShow}
        textShow={textShow}
        provinceStart={provinceStart}
      />
    </div>
  );
}

export default Random;
