import React from 'react';
import { useParams, Link } from 'react-router-dom';

const Room = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>hello room</h1>

      <div className="hotelDetails">
        <div className="hotelDetailsPrice">
          {/* <h1>Ідеально підходить для {data.days} ночей.</h1> */}
          {/* days user select */}
          <span>
            Цей готель розташований у самому серці міста відмінне розташування
            оцінка 9,8!
          </span>
          <h2>
            {/* <b>${days * data.cheapestPrice * options.room}</b> ({days} ночей) */}
            your price form day and options
          </h2>
          <button className="btn btn-primary">Бронюйте зараз!</button>
        </div>
      </div>
    </div>
  );
};

export default Room;
