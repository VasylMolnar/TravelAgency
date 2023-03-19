import React from 'react';
import { useParams } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
const Hotel = () => {
  const { id } = useParams();
  //search and fetch hotel data by id

  const data = {
    id: 1,
    name: 'Hotel 1',
    price: '100',
    distance: '500',
    address: 'Ukraine',
    cheapestPrice: '100',
    days: '5', //days user select
    description:
      'A hotel is a commercial establishment that provides lodging, meals, and other services to guests, travelers, and tourists. Hotels can range from small family-run businesses to large international chains. Most hotels list a variety of services, such as room service, laundry, and concierge. Some hotels also offer meeting and conference facilities, fitness centers, and spas.',
  };

  return (
    <main className="section hotel">
      <div className="container">
        <div className="hotelWrapper">
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <HomeIcon />
            <span>{data.address}</span>
          </div>

          <span className="hotelDistance">
            Чудове розташування – {data.distance}m від центру
          </span>
        </div>

        <span className="hotelPriceHighlight">
          Забронюйте проживання ${data.cheapestPrice} у цій власності та
          отримайте безкоштовне таксі в аеропорт
        </span>

        <div className="hotelImages">
          <img src={require('../img/1.jpg')} alt="" className="hotelImg" />
          <img src={require('../img/1.jpg')} alt="" className="hotelImg" />
          <img src={require('../img/1.jpg')} alt="" className="hotelImg" />
          <img src={require('../img/1.jpg')} alt="" className="hotelImg" />
          <img src={require('../img/1.jpg')} alt="" className="hotelImg" />
          <img src={require('../img/1.jpg')} alt="" className="hotelImg" />
          <img src={require('../img/1.jpg')} alt="" className="hotelImg" />
          <img src={require('../img/1.jpg')} alt="" className="hotelImg" />
          <img src={require('../img/1.jpg')} alt="" className="hotelImg" />
        </div>

        <div className="hotelDetails">
          <div className="hotelDetailsTexts">
            <h1 className="hotelTitle">{data.title}</h1>
            <p className="hotelDesc">{data.desc}</p>
          </div>
          <div className="hotelDetailsPrice">
            <h1>Ідеально підходить для {data.days} ночей.</h1>
            {/* days user select */}
            <span>
              Цей готель розташований у самому серці міста відмінне розташування
              оцінка 9,8!
            </span>
            <h2>
              {/* <b>${days * data.cheapestPrice * options.room}</b> ({days} ночей) */}
            </h2>
            <button>Бронюйте зараз!</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hotel;
