import React from 'react';
import './Point.css';

function Point({ pageIndex }) {
  return (
    <div className="Point">
      <div
        className={pageIndex === 1 ? 'Point-item-on' : 'Point-item-off'}
      ></div>
      <div
        className={pageIndex === 2 ? 'Point-item-on' : 'Point-item-off'}
      ></div>
    </div>
  );
}

export default Point;
