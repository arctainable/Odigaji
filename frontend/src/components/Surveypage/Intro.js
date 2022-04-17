import React from 'react';
import './Intro.css';
import { Spinner } from 'react-bootstrap';

function Intro({ nextPage, tourData }) {
  return (
    <div className="Survey-intro">
      <div className="Survey-intro-header">오디가지</div>
      {tourData.length === 0 ? (
        <Spinner
          className="Survey-spinner"
          animation="border"
          variant="light"
        />
      ) : (
        <button className="Survey-intro-button" onClick={nextPage}>
          추천 시작
        </button>
      )}
    </div>
  );
}

export default Intro;
