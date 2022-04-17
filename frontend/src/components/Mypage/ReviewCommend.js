import React from 'react';
import { Link } from 'react-router-dom';

function ReviewCommend({ reviewCommentData }) {
  return (
    <div className="ReviewListContainer">
      <div className="Reviewtitle">작성한 댓글 목록</div>
      <div className="ReviewWrap">
        <div className="ListTitle">
          <div className="headRegion">댓글내용</div>
          <div className="headtitle">작성자</div>
          <div className="headtime">작성일자</div>
        </div>
        {reviewCommentData.map((data, key) => {
          var content = data.content.substr(0, 20);
          if (data.content.length > 20) {
            return (
              <>
                <Link
                  to={{
                    pathname: `/local/travelDetail/board/post/${data.review_id}`,
                  }}
                >
                  <div key={key} className="item">
                    <div className="region">{content} ...</div>
                    <div className="textTitle">{data.user.username}</div>
                    <div className="time">{data.created}</div>
                  </div>
                </Link>
              </>
            );
          }
          return (
            <Link
              to={{
                pathname: `/local/travelDetail/board/post/${data.review_id}`,
              }}
            >
              <div key={key} className="item">
                <div className="region">{content}</div>
                <div className="textTitle">{data.user.username}</div>
                <div className="time">{data.created}</div>
              </div>
            </Link>
          );
        })}
        {Array.isArray(reviewCommentData) && reviewCommentData.length === 0 ? (
          <div className="VisitedNoneItems">작성한 댓글 게시물이 없습니다.</div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
export default ReviewCommend;
