/*global kakao*/
import { Table } from 'react-bootstrap';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import server from '../../API/server';
import { useParams } from 'react-router-dom';
import TravelRating from '../../components/Travelcomponents/TravelRating';
import './Local.css';
import LocalModal from '../../components/Travelpage/LocalModal';
import Board from './Board';
function MovetravelPage(id) {
  window.location.href = 'travelDetail/' + id + '/';
}

function MoveBoardPage(id) {
  window.location.href = 'travelDetail/board/' + id + '/';
}

let cityId;
function Local() {
  let params = useParams();
  cityId = params.cityId; // 시 아이디를 url에서 받아옴
  // const [id, setId] = useState(null); //시 아이디
  const [info, setInfo] = useState(null); // 시 정보
  const [name, setName] = useState(null); // 시 명
  const [papulation, setPapulation] = useState(null); // 시 인구
  const [province, setProvince] = useState(null); // 도 명
  const [area, setArea] = useState(null); // 시 넓이
  const [travelList, setTravelList] = useState(null); // 시 내 관광지목록
  const [localLogo, setLocalLogo] = useState(null); // 시 로고 이미지
  const [localImg, setLocalImg] = useState(null); // 시 로고 이미지
  const [avg_rate, setAvg_rate] = useState(null);
  const [rating, setRating] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  // console.log(travelList);
  //////////////////// URL //////////////////////////////////////
  const cityUrl =
    server.BASE_URL + server.ROUTES.allCities + cityId + '/' + 'get-city/';
  const visitedUrl =
    server.BASE_URL + server.ROUTES.allCities + cityId + '/is-visited/';
  let isLogin = sessionStorage.getItem('jwt');
  const MakeMarker = (positions, map) => {
    let bounds = new kakao.maps.LatLngBounds();

    for (var i = 0; i < positions.length; i++) {
      // console.log(positions);
      // 마커 이미지의 이미지 크기 입니다
      let marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      });
      bounds.extend(new kakao.maps.LatLng(positions[i].latlng));
    }
    // console.log(bounds);
    return map.setBounds(bounds);
  };
  const getCities = () => {
    const jwt = sessionStorage.getItem('jwt');
    axios.defaults.headers.common['Authorization'] = jwt ? `Bearer ${jwt}` : '';
    //도시정보 가져오기!!!
    axios.get(cityUrl).then((res) => {
      // console.log(cityUrl, res);

      setInfo(res.data.info);
      setPapulation(res.data.population);
      setName(res.data.name);
      setProvince(res.data.province_data.name);
      setArea(res.data.area);
      setTravelList(res.data.att_data);

      setLocalLogo(res.data.photo);
      setLocalImg(res.data.background_photo);
      setAvg_rate(res.data.avg_rate);
    });
  };
  const getStarRating = (isLogin) => {
    const jwt = sessionStorage.getItem('jwt');
    axios.defaults.headers.common['Authorization'] = jwt ? `Bearer ${jwt}` : '';
    axios
      .get(visitedUrl)
      .then((res) => {
        // console.log(visitedUrl, res);
        setRating(res.data.rate);
        if (res.status === 200) {
          isLogin = true;
        }
      })
      .catch((err) => {
        isLogin = false;
      });
  };
  useEffect(() => {
    isLogin = sessionStorage.getItem('jwt');
    getCities();
    getStarRating(isLogin);
    //내 별점 가져오기
  }, [isLogin]);
  // console.log('여행지목록', travelList);
  return (
    <div className="LocalContainer">
      <div className="DetailContent">
        <div className="LocalInfoBox">
          <div className="LocalWrap">
            <img className="localImage" src={server.BASE_URL + localImg} />
            <div className="LocalInfo">
              <div className="LocalTitle">
                {(province === '자치 시도' ? '' : province) + '\n' + name}
                {rating != null ? (
                  <img className="visitedMedal" src="\img\메달.png"></img>
                ) : (
                  ''
                )}
                <img
                  className="LocalLogoImg"
                  src={server.BASE_URL + localLogo}
                ></img>
              </div>
              <div className="spaceArea"></div>
              <div className="LocalText">{info}</div>
              <div className="spaceArea"></div>
              <div>인구수 : 약 {papulation} 명 </div>
              <div>면적 : {area} km²</div>
            </div>
          </div>

          <div className="RatingArea">
            <div className="RatingTitle">
              <span className="avg">평균 평점</span>
              <TravelRating
                cityId={cityId}
                rating={avg_rate}
                setRating={setRating}
              />
            </div>
            {isLogin != null ? (
              rating != null ? (
                <div className="RatingTitle2">
                  <span className="avg">나의 평점</span>
                  <TravelRating
                    cityId={cityId}
                    rating={rating}
                    setRating={setRating}
                  />
                </div>
              ) : (
                <button className="MyRatingTitle2" onClick={openModal}>
                  다녀온 곳 등록
                </button>
              )
            ) : (
              ''
            )}
          </div>
        </div>
        <LocalModal
          open={modalOpen}
          close={closeModal}
          cityId={cityId}
          rating={rating}
          setRating={setRating}
          province={province}
          name={name}
        ></LocalModal>
        <div className="LocalInfoBox2">
          <div className="LocalAttraction">{name} 추천 여행지</div>
          <div className="IntoReview">
            {/* <button
              className="reviewButton"
              onClick={() => MoveBoardPage(params.cityId)}
            >
              리뷰 게시판
            </button> */}
          </div>
          {/* <div id="map2" style={{ width: '100%', height: '350px' }}></div> */}
          <div className="TableContainer">
            <Table bordered hover>
              <tbody>
                {/* &&양옆에 2개쓰면  */}
                {travelList &&
                  travelList.map((data, idx) => {
                    return (
                      //무명함수 호출안하면 강제로 이동한다....
                      <tr
                        key={idx}
                        className="LocalTableItems"
                        onClick={() => MovetravelPage(data.id)}
                      >
                        <th>{data.name}</th>
                        <td>{data.address}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="LocalInfoBox3">
          <div className="LocalBoardInfo">{name} 관광 후기</div>
          <Board></Board>
        </div>
      </div>
    </div>
  );
}

export default Local;
