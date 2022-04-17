// import { Row, Table, Col, Button } from 'react-bootstrap';

import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './write.css';
import axios from 'axios';
import server from '../../API/server';
import { useParams } from 'react-router-dom';
// import ReactHtmlParser from 'react-html-parser';

let cityId;
function Write() {
  const [reviewContent, setReviewContent] = useState({
    // 입력한 내용 userState에 저장하기위한 변수
    title: '',
    content: '',
  });
  let params = useParams();

  function setDate() {
    // 글 작성 완료 버튼을 눌렀을때 동작
    cityId = params.cityId;
    let data = {
      title: reviewContent.title,
      content: reviewContent.content,
    };

    // console.log(data);
    if (reviewContent.title) {
      const jwt = sessionStorage.getItem('jwt');
      axios.defaults.headers.common['Authorization'] = jwt
        ? `Bearer ${jwt}`
        : '';

      axios
        .post(server.BASE_URL + server.ROUTES.writeReview + cityId + '/', data)
        .then(() => {
          // console.log('then active');
        });
      alert('게시글이 작성되었습니다.');
      window.location.href = '/local/' + cityId;
    } else {
      alert('제목은 필수입니다.');
    }
  }

  // 입력내용 누르면 저장 시키는 변수 현재는 화면 위에 띄어주기만함,,
  const [viewContent, setViewContent] = useState([]);

  const getValue = (e) => {
    const { name, value } = e.target;
    setReviewContent({
      ...reviewContent,
      [name]: value,
    });
    // console.log(reviewContent);
  };

  return (
    <div className="WriteContainer">
      <div className="ContentWriter">
        <div className="WriteBoxInner">
          <div className="WriteTitle">관광지 후기 작성</div>
          <div className="review-container mt-5">
            {viewContent.map((element) => (
              <div>
                <h2>{element.title}</h2>
                <div>{element.content}</div>
              </div>
            ))}
          </div>
          <div className="form-wrapper">
            <input
              className="title-input"
              type="text"
              placeholder="제목"
              onChange={getValue}
              name="title"
            />
            <CKEditor
              editor={ClassicEditor}
              data=""
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                // console.log('Editor is ready to use!', editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                // console.log({ event, editor, data });
                setReviewContent({
                  ...reviewContent,
                  content: data,
                });
                // console.log(reviewContent);
              }}
              onBlur={(event, editor) => {
                // console.log('Blur.', editor);
              }}
              onFocus={(event, editor) => {
                // console.log('Focus.', editor);
              }}
            />
            <div className="SendButtonWrap">
              <button
                className="submit-button"
                onClick={() => {
                  // setViewContent(viewContent.concat({ ...reviewContent }));
                  setDate();
                }}
              >
                입력
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Write;
