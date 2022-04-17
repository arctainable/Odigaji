import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import server from '../../API/server';
import './ChangeInfo.css';
import React from 'react';
import axios from 'axios';
function ChangeInfo() {
  const [Userdata, setUserData] = useState({});
  const [fileImage, setFileImage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [Image, setImage] = useState('/img/오디가지.png');
  let navigate = useNavigate();
  const fileInput = useRef(null);
  const [PasswordErrors, setPasswordErrors] = useState('');
  const [PasswordConErrors, setPasswordConErrors] = useState('');

  const onChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
    setFileImage(event.target.files[0]);
  };
  const changePassword = (event) => {
    setPasswordErrors(PasswordValidation(event.target.value));
    setPassword(event.target.value);
  };
  const changeConfirmPassword = (event) => {
    setPasswordConErrors(ConPasswordValidation(password, event.target.value));
    setConfirmPassword(event.target.value);
  };
  const ChangeInfoData = async () => {
    const jwt = sessionStorage.getItem('jwt');
    axios.defaults.headers.common['Authorization'] = jwt ? `Bearer ${jwt}` : '';

    const formData = new FormData();
    const passwordData = new FormData();
    formData.append('username', Userdata.username);
    formData.append('nickname', Userdata.nickname);
    formData.append('photo', fileImage);
    passwordData.append('password', password);
    passwordData.append('passwordconfirm', confirmPassword);
    if (!PasswordErrors && !PasswordConErrors) {
      await axios
        .put(server.BASE_URL + server.ROUTES.mypage, formData)
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });

      await axios
        .put(server.BASE_URL + server.ROUTES.password, passwordData)
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
      sessionStorage.removeItem('jwt');
      alert('다시 로그인 해주세요');
      navigate('/');
    } else {
      alert('비밀번호가 다릅니다.');
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
    ChangeInfoData();
  };
  const PasswordValidation = (password) => {
    let passwordError = '';
    if (!password) {
      passwordError = '비밀번호는 필수입니다.';
    } else if (password.length < 6) {
      passwordError = '비밀번호가 너무 짧습니다.';
    }
    return passwordError;
  };
  const ConPasswordValidation = (password, value) => {
    let confirmPasswordError = '';
    if (password !== value) {
      confirmPasswordError = '비밀번호가 다릅니다.';
    }

    return confirmPasswordError;
  };
  const location = useLocation();
  useEffect(() => {
    setUserData(location.state);
    setImage(server.BASE_URL + location.state.photo);
  }, []);

  return (
    <div className="InfoChange">
      <div className="InfoPageContainer">
        <div>
          <div className="InfoPageProfileBox">
            <img className="InfoProfileImg" src={Image} />

            <input
              type="file"
              style={{ display: 'none' }}
              accept="image/*"
              name="profile_img"
              onChange={onChange}
              ref={fileInput}
            />
          </div>
        </div>
      </div>
      <div className="InfouserContainer">
        <div className="InfoUserTitle">
          <button
            className="InfoProfileChange"
            onClick={() => fileInput.current.click()}
          >
            Edit
          </button>
          <div className="InfoUserName">{Userdata.username}</div>
          <div className="InfoNickName">{Userdata.nickname}</div>{' '}
        </div>
      </div>

      <div className="InputInfoContainer">
        <div className="changeInfoWrap">
          <div className="InfoContainertitle">
            <h5>회원정보</h5>
          </div>
          <div className="InfoSpace"></div>
          <form className="ChangeInputForm" onSubmit={onSubmit}>
            <div className="InfoEmail">
              <span className="InputItem">아이디</span>
              <div></div>
              <input
                name="email"
                type="email"
                placeholder="이메일"
                defaultValue={Userdata.username}
                required
                autoComplete="off"
                disabled
              />
            </div>

            <div className="InfoName">
              <span className="InputItem">닉네임</span>
              <div></div>
              <input
                name="name"
                type="text"
                placeholder="닉네임"
                defaultValue={Userdata.nickname}
                required
                autoComplete="off"
              />
            </div>

            <div className="InfoPassword">
              <span className="InputItem">비밀번호</span>
              <div></div>
              <input
                name="password"
                type="password"
                placeholder="비밀번호"
                value={password || ''}
                required
                onChange={changePassword}
                autoComplete="off"
              />
            </div>
            <div style={{ color: 'red', fontSize: '12px' }}>
              {PasswordErrors}
            </div>

            <div className="Info-confirm-password">
              <span className="InputItem">비밀번호 변경확인</span>
              <div></div>
              <input
                name="confirmPassword"
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword || ''}
                onChange={changeConfirmPassword}
                required
                autoComplete="off"
              />
            </div>
            <div style={{ color: 'red', fontSize: '12px' }}>
              {PasswordConErrors}
            </div>
            <div className="InfoChangebtn">
              <button type="submit">회원정보 변경</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ChangeInfo;
