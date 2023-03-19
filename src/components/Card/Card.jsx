import React from 'react';

let Card = ({ hotel }) => {
  return (
    <div className="card">
      <div className="card_photo">{hotel.img}</div>

      <div className="card_info">
        <h1>{hotel.name}</h1>
        <p>{hotel.description}</p>
        <button className="btn btn-outline-primary">Відкрити</button>
      </div>
    </div>
  );
};

Card = React.memo(Card);
export default Card;
