import React from 'react';
import { useParams, Link } from 'react-router-dom';

const RoomPage = () => {
  const { id } = useParams();
  //search data in redux or fetch room data by id

  const data = {
    id: 1,
    name: 'Room 1',
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

          <span className="hotelDistance">
            Чудове розташування – {data.distance}m від центру
          </span>
        </div>

        <span className="hotelPriceHighlight">
          Забронюйте проживання ${data.cheapestPrice} у цій кімнаті та отримайте
          безкоштовний тур по місту.
        </span>

        <div className="hotel__content">
          <div className="hotelImages">
            <img src={require('../../img/2.jpg')} alt="" className="hotelImg" />
            <img src={require('../../img/2.jpg')} alt="" className="hotelImg" />
            <img src={require('../../img/2.jpg')} alt="" className="hotelImg" />
            <img src={require('../../img/2.jpg')} alt="" className="hotelImg" />
            <img src={require('../../img/2.jpg')} alt="" className="hotelImg" />
            <img src={require('../../img/2.jpg')} alt="" className="hotelImg" />
            <img src={require('../../img/2.jpg')} alt="" className="hotelImg" />
            <img src={require('../../img/2.jpg')} alt="" className="hotelImg" />
            <img src={require('../../img/2.jpg')} alt="" className="hotelImg" />
          </div>

          <div className="hotelDetails">
            <div className="hotelDetailsPrice">
              <h1 style={{ fontSize: '24px' }}>
                Ідеально підходить для {data.days} ночей.
              </h1>
              {/* days user select */}
              <span>
                Цей готель розташований у самому серці міста відмінне розташування оцінка
                9,8!
              </span>

              <h2>
                {/* <b>${days * data.cheapestPrice * options.room}</b> ({days} ночей) */}
                your price form day and options
              </h2>
              <button className="btn btn-primary">Бронюйте зараз!</button>
            </div>
          </div>
        </div>

        <div className="description" style={{ marginTop: '70px' }}>
          <h3 className="hotelTitle" style={{ fontSize: '20px' }}>
            КІМНАТА ОДНОМІСНА СТАНДАРТ
          </h3>

          <ul className="hotelTitle" style={{ fontSize: '20px' }}>
            <li>Є Інтернет</li>
            <li>Супутникове телебачення</li>
            <li>Письмовий стіл</li>
            <li>Гардероб</li>
            <li>Халати</li>
            <li>Міні-бар</li>
            <li>Холодильник</li>
            <li>Кондиціонер</li>
            <li>Ванна кімната з душем</li>
            <li>Телевізор</li>
          </ul>
          <p
            className="hotelTitle"
            style={{
              fontSize: '20px',
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
              marginTop: '90px',
            }}
          >
            {data.description}
          </p>
        </div>
      </div>
    </main>
  );
};

export default RoomPage;
