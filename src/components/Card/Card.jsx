import React from 'react';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Link } from 'react-router-dom';

let Card = ({ hotel }) => {
  return (
    <Link to={`/hotels/${hotel.id}`} style={{ textDecoration: 'none' }}>
      <figure className="card">
        <div className="card_content">
          <div className="card_photo" style={{ maxWidth: '250px' }}>
            {/* {hotel.img} */}
            <img
              src={require('../../img/1.jpg')}
              alt="test"
              className="card_img"
            />
          </div>

          <figcaption className="figcaption">
            <h1 className="hotelName">{hotel.name}</h1>
            <p>
              {/* {hotel.reactions} */}
              <StarOutlineIcon />
              <StarOutlineIcon />
              <StarOutlineIcon />
              <StarOutlineIcon />
            </p>
            <p>{hotel.description}</p>

            <h3 className="price">Price: {hotel.price}</h3>
          </figcaption>
        </div>
      </figure>
    </Link>
  );
};

Card = React.memo(Card);
export default Card;
