import React from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { selectHotelById } from '../../features/hotel/hotelApiSlice';
import { useSelector } from 'react-redux';

const HotelPage = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  //room

  //selector
  const { address, city, country, description, imagesUrl, name, price } = useSelector(
    state => selectHotelById(state, id)
  );

  return (
    <main className="section hotel">
      <div className="container">
        <div className="hotelWrapper">
          <h1 className="hotelTitle">{name}</h1>
          <div className="hotelAddress">
            <HomeIcon />
            <span>{country}</span>
            <span>{city}</span>
            <span>{address}</span>
          </div>

          <span className="hotelDistance">Чудове розташування – 100m від центру</span>
        </div>

        <span className="hotelPriceHighlight">
          Забронюйте проживання ${price} у цій власності та отримайте безкоштовне таксі в
          аеропорт
        </span>

        <div className="hotel__content">
          <div className="hotelImages">
            {imagesUrl.map(item => {
              return <img src={item} alt={name} className="hotelImg" />;
            })}
          </div>

          <div className="hotelDetails">
            <div className="hotelDetailsPrice">
              <span>
                Цей готель розташований у самому серці міста відмінне розташування оцінка
                9,8!
              </span>

              <p style={{ marginTop: '10px' }}>{description}</p>

              <Link to={`${pathname}/rooms`}>
                <button className="btn btn-primary">Переглянути кімнати</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HotelPage;
