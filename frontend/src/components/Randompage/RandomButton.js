import React from 'react';
import './RandomButton.css';

function RandomButton({
  provinceSpin,
  citySpin,
  cityShow,
  textShow,
  provinceStart,
}) {
  if (!provinceSpin && !cityShow && !textShow) {
    return (
      <button className="RandomButton" onClick={() => provinceStart()}>
        랜덤 뽑기 시작
      </button>
    );
  } else if (provinceSpin || citySpin || textShow) {
    return (
      <div className="RandomButton" style={{ visibility: 'hidden' }}></div>
    );
  } else {
    return (
      <button className="RandomButton" onClick={() => provinceStart()}>
        다시뽑기
      </button>
    );
  }
}

export default RandomButton;
