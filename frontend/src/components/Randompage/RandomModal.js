import React, { useEffect, useRef, useState } from 'react';
import './RandomModal.css';

function RandomModal({ textShow, randomResult }) {
  const timer = useRef();
  const count = useRef(0);
  const [left, setLeft] = useState(0);
  const text = `${randomResult[0]} 돌림판 채우는 중`;

  useEffect(() => {
    if (textShow) {
      timer.current = setInterval(() => {
        setLeft(count.current);
        count.current += 1;
      }, 10);
    } else {
      clearInterval(timer.current);
      count.current = 0;
    }
    return () => {
      clearInterval(timer.current);
      count.current = 0;
    };
  }, [textShow]);

  return (
    <div
      className="RandomModal"
      style={{ visibility: textShow ? 'visible' : 'hidden' }}
    >
      <div className="RandomModal-header">{text}</div>
      <div className="RandomModal-progress">
        <img
          className="RandomModal-icon"
          alt="오디가지"
          src={process.env.PUBLIC_URL + 'img/오디가지.png'}
          style={{ left: `${left * 0.6}%` }}
        />
        <div
          className="RandomModal-progress-bg"
          style={{ width: `${left * 0.6 + 1}%` }}
        ></div>
      </div>
    </div>
  );
}

export default RandomModal;
