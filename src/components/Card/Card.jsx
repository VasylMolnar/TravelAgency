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
          <div className="card_photo">
            {/* {element.img} */}
            <img src={element.imagesUrl[0]} alt="test" className="card_img" />
          </div>

          <figcaption className="figcaption">
            <h1 className="hotelName">
              {element.name ||
                element.nameAirLine ||
                `Номер кімнати: ${element.roomNumber}`}
            </h1>
            <span>
              {element.address
                ? `Адрес: ${element.address}`
                : `Поверх: ${element.roomFloor}`}
            </span>

            <p>
              <StarOutlineIcon />
              <StarOutlineIcon />
              <StarOutlineIcon />
              <StarOutlineIcon />
            </p>
            <p> {element.description.split('').slice(0, 431)}</p>

            <h3 className="price">
              {/* {element.address
                ? `Найдешевший номер: ${element.price} $`
                : `Ціна: ${element.price} $`} */}

              {!element.address
                ? `Ціна: ${element.price} $`
                : element.address && element.nameAirLine
                ? ''
                : `Найдешевший номер: ${element.price} $`}
            </h3>
          </figcaption>
        </div>
      </figure>
    </Link>
  );
};

Card = React.memo(Card);
export default Card;
