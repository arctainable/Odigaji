import React from 'react';
import './PopularItem.css';
import server from '../../API/server';

function PopularItem({ data, moveCity }) {
  return (
    <div className="PopularItem-wrap">
      <img
        className="PopularItem"
        alt={data.name}
        src={server.BASE_URL + data.background_photo}
        loading="lazy"
        onClick={() => moveCity(data.id)}
      />
      <div className="PopularItem-title">
        <h2>{data.name}</h2>
      </div>
    </div>
  );
}

export default PopularItem;
