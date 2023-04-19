import React from 'react';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Link, useLocation } from 'react-router-dom';

let Card = ({ element }) => {
  const { pathname } = useLocation();

  //change for room (address)

  return (
    <Link to={`${pathname}/${element.id}`} style={{ textDecoration: 'none' }}>
      <figure className="card">
        <div className="card_content">
          <div className="card_photo" style={{ maxWidth: '250px' }}>
            {/* {element.img} */}
            <img src={element.imagesUrl[0]} alt="test" className="card_img" />
          </div>

          <figcaption className="figcaption">
            <h1 className="hotelName">{element.name}</h1>
            <span>Адрес: {element.address}</span>

            <p>
              <StarOutlineIcon />
              <StarOutlineIcon />
              <StarOutlineIcon />
              <StarOutlineIcon />
            </p>
            <p>{element.description}</p>

            <h3 className="price">Ціна: {element.price}</h3>
          </figcaption>
        </div>
      </figure>
    </Link>
  );
};

Card = React.memo(Card);
export default Card;
