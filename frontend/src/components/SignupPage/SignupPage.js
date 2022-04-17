import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';
import server from '../../API/server';
import axios from 'axios';
import Swal from 'sweetalert2';
function SignupPage() {
  const [name, setName] = useState('');
  const [id, setid] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fileImage, setFileImage] = useState('');
  const [idErrors, setidErrors] = useState('');
  const [NicknameErrors, setNicknameErrors] = useState('');
  const [PasswordErrors, setPasswordErrors] = useState('');
  const [PasswordConErrors, setPasswordConErrors] = useState('');
  // 파일 저장
  const saveFileImage = (event) => {
    setFileImage(event.target.files[0]);
  };

  const onNameHandler = (event) => {
    setNicknameErrors(NicknameVaildation(event.target.value));
    setName(event.currentTarget.value);
  };
  const idVaildation = (id) => {
    let idError = '';
    const regex = /^[A-Za-z]{1}[A-Za-z0-9_-]{3,19}$/;

    if (!id) {
      idError = '아이디는 필수입니다.';
    } else if (!regex.test(id)) {
      idError = '반드시 영문으로 시작 숫자+언더바/하이픈 허용 4~20자리';
    }

    return idError;
  };
  const NicknameVaildation = (name) => {
    let NicknameError = '';
    const regex = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/;

    if (!name) {
      NicknameError = '닉네임은 필수입니다.';
    } else if (!regex.test(name)) {
      NicknameError =
        '닉네임은 한글, 영문, 숫자만 가능하며 2-10자리 가능합니다.';
    }

    return NicknameError;
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

  const onidHandler = (event) => {
    setidErrors(idVaildation(event.target.value));

    setid(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPasswordErrors(PasswordValidation(event.target.value));
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setPasswordConErrors(ConPasswordValidation(password, event.target.value));
    setConfirmPassword(event.currentTarget.value);
  };

  let navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('username', id);
    formData.append('nickname', name);
    formData.append('password', password);
    formData.append('passwordconfirm', confirmPassword);
    formData.append('photo', fileImage);

    if (!idErrors && !PasswordErrors && !PasswordConErrors && !NicknameErrors) {
      await axios
        .post(server.BASE_URL + server.ROUTES.signup, formData)
        .then((res) => {
          Swal.fire({
            icon: 'success',
            title: '회원가입 성공',
            // eslint-disable-next-line prettier/prettier
            text: '회원가입을 축하합니다.'
            
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/');
            }
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: '회원가입 실패',
            // eslint-disable-next-line prettier/prettier
            text: error.response.data.error
            
          });
        });
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('jwt')) {
      navigate('/');
      return;
    }
  }, [navigate]);

  return (
    <div className="wrap">
      <div className="signup">
        <img
          className="TitleImage2"
          src={process.env.PUBLIC_URL + 'img/오디가지main.png'}
        />
        <form onSubmit={onSubmit}>
          <div className="id">
            <input
              name="id"
              placeholder="아이디"
              value={id}
              onChange={onidHandler}
              autoComplete="off"
            />
          </div>
          <div style={{ color: 'red', fontSize: '12px' }}>{idErrors}</div>
          <div className="name">
            <input
              name="name"
              type="text"
              placeholder="닉네임"
              value={name}
              onChange={onNameHandler}
              autoComplete="off"
            />
          </div>
          <div style={{ color: 'red', fontSize: '12px' }}>{NicknameErrors}</div>
          <div className="password">
            <input
              name="password"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={onPasswordHandler}
              autoComplete="off"
            />
          </div>
          <div style={{ color: 'red', fontSize: '12px' }}>{PasswordErrors}</div>
          <div className="confirm-password">
            <input
              name="confirmPassword"
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={onConfirmPasswordHandler}
              autoComplete="off"
            />
          </div>
          <div style={{ color: 'red', fontSize: '12px' }}>
            {PasswordConErrors}
          </div>

          <div className="img-upload">
            {/* {fileImage && <img alt="sample" src={fileImage} />} */}
            <div>
              <input
                name="imgUpload"
                type="file"
                accept="image/*"
                onChange={saveFileImage}
                autoComplete="off"
              />
            </div>
          </div>
          <div className="btnSignup">
            <button type="submit">가입하기</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default SignupPage;
