import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import server from '../../API/server';
import './Board.css';

function Board() {
  let navigate = useNavigate();
  let params = useParams();
  let count = 1;
  const [totalLength, setTotalLength] = useState();
  const [cntLength, setCntLength] = useState();
  const [totalPage, setTotalPage] = useState([]);
  const [reviewData, setReviewdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isClick, setIsClick] = useState(true);
  const [color, setColor] = useState('white');

  const writeReview = () => {
    const jwt = sessionStorage.getItem('jwt');
    if (jwt) {
      navigate('/local/travelDetail/board/write/' + params.cityId);
    } else {
      alert('로그인이 필요합니다.');
    }
  };
  const movePost = (Postid) => {
    navigate('/local/travelDetail/board/post/' + Postid);
  };

  const makePageArray = () => {
    let pageArray = [];
    for (let i = 1; i <= totalLength; i++) {
      pageArray.push(i);
    }
    setTotalPage(pageArray);
  };

  // const getCityName = async (cityId) => {
  //   await axios
  //     .get(server.BASE_URL + server.ROUTES.allCities + cityId + 'get-city/')
  //     .then((res) => {
  //       console.log(res);
  //     });
  // };
  const getLoadReviews = async (cityId) => {
    await axios
      .get(server.BASE_URL + server.ROUTES.review + cityId + '/')
      .then((response) => {
        setTotalLength(response.data.total_pages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getLoadReviews(params.cityId);
    if (isClick) {
      axios
        .get(
          server.BASE_URL +
            server.ROUTES.review +
            params.cityId +
            '/?page_num=' +
            currentPage
        )
        .then((response) => {
          // console.log(response.data.data);
          let data = response.data.data;
          data.slice(-1, 1);

          setReviewdata(data);
        })
        .catch((error) => {});
      setIsClick(!isClick);
      setColor('white');
    }
    setCntLength(totalLength);

    makePageArray();
  }, [totalLength, isClick, count]);

  return (
    <div className="Board">
      <div className="BoardWrap">
        <div className="WriteButtonWrap">
          <button className="writeButton" onClick={writeReview}>
            글쓰기
          </button>
        </div>

        <table className="board-table">
          <thead className="tableHead">
            <tr>
              <th className="th-num">No</th>
              <th className="th-title">제목</th>
              <th className="th-date">작성일</th>
              <th className="th-user">작성자</th>
            </tr>
          </thead>
          <tbody>
            {reviewData &&
              reviewData.map((data, key) => {
                return (
                  <tr
                    key={key}
                    onClick={() => {
                      movePost(data.id);
                    }}
                    className="tablebody"
                  >
                    <td>{data.id}</td>
                    <td>{data.title}</td>
                    <td>{data.updated}</td>
                    <td>{data.user.nickname}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {Array.isArray(reviewData) && reviewData.length === 0 ? (
          <div className="NoneItems">
            해당 지역의 관광 후기 게시물이 없습니다.
          </div>
        ) : (
          ''
        )}

        <div className="pageNation">
          <ul className="pageItems">
            <li
              onClick={(e) => {
                e.preventDefault();

                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                  setIsClick(true);
                }
              }}
            >
              <button className="PrevButton">Prev</button>
            </li>
            {totalPage.map((num) => (
              <li
                key={num}
                onClick={(e) => {
                  e.preventDefault();
                  setIsClick(true);
                  // currentPage == num ? setColor('red') : setColor('white')
                  // if (!isClick) {
                  // console.log(e.view);
                  // e.target.style.backgroundColor = 'red';
                  // }

                  setCurrentPage(num);
                }}
              >
                <button className="ItemButton">{num}</button>
              </li>
            ))}
            <li
              onClick={(e) => {
                e.preventDefault();

                if (currentPage < totalLength) {
                  setCurrentPage(currentPage + 1);
                  setIsClick(true);
                }
              }}
            >
              <button className="NextButton">Next</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Board;
