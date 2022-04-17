/*global kakao*/
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './TravelDetail.css';
import server from '../../API/server';

function TravelDetail() {
  let params = useParams();
  const attractionId = params.attractionId;
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [facilities, setFacilities] = useState();
  const [parking_lot, setParking_lot] = useState();
  const [tel, setTel] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [city, setCity] = useState();
  const [search_image, setSearch_image] = useState();
  const [cityId, setCityId] = useState();
  const [cityLogo, setCityLogo] = useState();
  let attractionDetail;
  // console.log(attractionId);
  // console.log(latitude);
  // console.log(longitude);
  //랜더링 이후 실행되는 함수

  let navigate = useNavigate();
  function goback(id) {
    navigate('/local/' + id);
  }
  useEffect(() => {
    axios
      .get(
        server.BASE_URL +
          server.ROUTES.allCities +
          attractionId +
          server.ROUTES.attraction
      )
      .then((res) => {
        setName(res.data.name);
        setAddress(res.data.address);
        setFacilities(res.data.facilities);
        setParking_lot(res.data.parking_lot);
        setTel(res.data.tel);
        setLatitude(res.data.latitude);
        setLongitude(res.data.longitude);
        setCity(res.data.city);
        setCityId(city);
        setSearch_image(res.data.search_image);
        attractionDetail = res.data;
        var container = document.getElementById('map');
        var options = {
          center: new kakao.maps.LatLng(res.data.latitude, res.data.longitude),
          level: 3,
        };
        var map = new kakao.maps.Map(container, options);
        var markerPosition = new kakao.maps.LatLng(
          res.data.latitude,
          res.data.longitude
        );
        var marker = new kakao.maps.Marker({ position: markerPosition });
        marker.setMap(map);
        var iwContent = '<div style="padding:5px;">' + res.data.name + '</div>';
        var infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
        });
        kakao.maps.event.addListener(marker, 'mouseover', function () {
          infowindow.open(map, marker);
        });
        kakao.maps.event.addListener(marker, 'mouseout', function () {
          infowindow.close();
        });
      });
    const cityUrl =
      server.BASE_URL + server.ROUTES.allCities + cityId + '/' + 'get-city/';
    axios.get(cityUrl).then((res) => {
      setCityLogo(res.data.photo);
      // console.log(cityLogo);
    });
  }, [cityId]);

  return (
    <div className="TravelDetailContainer">
      <div className="ContentTravelBox">
        <div className="TravelDetailInfoBox">
          <div className="TravelDetailTitleName">
            <div className="DetailTitleWrap">
              <div className="DetailTitle">{name} </div>

              <button className="TravelBackButton" onClick={() => goback(city)}>
                이전 목록
              </button>
            </div>
          </div>
          <div className="TravelDetailWrap">
            <img
              className="DetailImage"
              src={server.BASE_URL + '/' + search_image}
            />

            <div className="TableContent">
              <Table borderless size="md">
                <tbody>
                  <tr>
                    <th width="100" height="50">
                      주소
                    </th>
                    <td width="300">{address}</td>
                  </tr>

                  <tr>
                    <th width="100" height="50">
                      편의시설
                    </th>
                    <td>{facilities}</td>
                  </tr>

                  <tr>
                    <th width="100" height="50">
                      주차가능수
                    </th>
                    <td>{parking_lot}</td>
                  </tr>

                  <tr>
                    <th width="100" height="50">
                      전화번호
                    </th>
                    <td>{tel}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
        <div className="TravelDetailInfoBox2">
          <div className="TravelDetaiLocationTitle">
            <div className="MapTitle">위치 상세보기</div>
          </div>
          <div className="TravelDetailMapWrap">
            <div id="map"></div>
          </div>
        </div>
      </div>
    </div>
    // <div className="TravelDetail m-5 p-5">
    //   <Row id="row">
    //     <div>
    //       <Image
    //         className="travel-img"
    //         src={server.BASE_URL + '/' + search_image}
    //       />
    //       <div id="map"></div>
    //     </div>
    //   </Row>
    //   <Container className="travel-table-container">
    //     <Table striped bordered hover className="travel-info-table">
    //       <tbody>
    //         <tr>
    //           <th>관광지명</th>
    //           <td>{name}</td>
    //         </tr>
    //         <tr>
    //           <th>주소</th>
    //           <td>{address}</td>
    //         </tr>
    //         <tr>
    //           <th>편의시설</th>
    //           <td>{facilities}</td>
    //         </tr>
    //         <tr>
    //           <th>주차가능수</th>
    //           <td>{parking_lot}</td>
    //         </tr>
    //         <tr>
    //           <th>전화번호</th>
    //           <td>{tel}</td>
    //         </tr>
    //       </tbody>
    //     </Table>
    //   </Container>
    //   <Container>
    //     <Button id="button" variant="secondary" onClick={() => goback()}>
    //       관광지 목록으로
    //     </Button>{' '}
    //   </Container>
    // </div>
    // end TravelDetail div
  );
}
export default TravelDetail;
