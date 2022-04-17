import React from 'react';
import PopularItem from './PopularItem';
import './Popular.css';

function Popular({ popularData, moveCity }) {
  return (
    <div className="Popular">
      <div className="Popular-header">인기있는 여행지</div>
      <div className="Popular-bg-item-1"></div>
      <div className="Popular-bg-item-2"></div>
      <div className="Popular-content">
        {popularData.map((data) => {
          return <PopularItem key={data.id} data={data} moveCity={moveCity} />;
        })}
      </div>
    </div>
  );
}
export default Popular;
