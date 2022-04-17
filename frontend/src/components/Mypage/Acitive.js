import React from 'react';

function Active({ selCityLength, reviewCommentLength, reviewLength }) {
  return (
    <div className="ActivityContainer">
      <div className="item">
        <div className="number">다녀온 도시수</div>
        <div>{selCityLength}</div>
      </div>
      <div className="item">
        <div className="number">작성한 리뷰수</div>
        <div>{reviewLength}</div>
      </div>
      <div className="item">
        <div className="number">작성한 댓글수</div>
        <div>{reviewCommentLength}</div>
      </div>
    </div>
  );
}
export default Active;
