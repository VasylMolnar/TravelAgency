import React from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { selectAirLineById } from '../../features/airLine/airLineApiSlice';
import { useSelector } from 'react-redux';

const AirlinesPage = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  //selector
  const { address, city, country, description, imagesUrl, nameAirLine } = useSelector(
    state => selectAirLineById(state, id)
  );

  return (
    <main className="section hotel">
      <div className="container">
        <div className="hotelWrapper">
          <h1 className="hotelTitle">{nameAirLine}</h1>
          <div className="hotelAddress">
            <HomeIcon />
            <span>{country}</span>
            <span>{city}</span>
            <span>{address}</span>
          </div>

          <span className="hotelDistance">Чудове розташування – 100m від центру</span>
        </div>

        <div className="hotel__content">
          <div className="hotelImages">
            {imagesUrl.map((item, index) => {
              return (
                <img src={item} alt={nameAirLine} className="hotelImg" key={index} />
              );
            })}
          </div>

          <div className="hotelDetails">
            <div className="hotelDetailsPrice">
              <span>
                Цей {nameAirLine} розташований у самому серці міста відмінне розташування
                оцінка 9,8!
              </span>

              <p style={{ marginTop: '10px' }}>{description}</p>

              <Link to={`${pathname}/aircraft`}>
                <button className="btn btn-primary">Переглянути літаки</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AirlinesPage;
