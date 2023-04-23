import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useGetRoomMutation } from '../../features/room/roomApiSlice';
import { Loading, Report } from 'notiflix';

const RoomPage = () => {
  const { pathname } = useLocation();
  const ids = pathname.split('/');
  const hotelId = ids[2];
  const roomId = ids[4];
  const [loading, setLoading] = useState(false);
  const [roomData, setRoomData] = useState({});

  //fetch Rooms data
  const [dataRoom] = useGetRoomMutation();

  useEffect(() => {
    const selectCurrentRoom = async () => {
      Loading.dots('Завантаження');

      await dataRoom({ hotelId, roomId })
        .then(result => {
          Loading.dots('Заватнаження');
          Loading.remove();

          setRoomData({ ...roomData, ...result.data });
          setLoading(false);
        })
        .catch(error => {
          Loading.remove();
        });
    };

    setLoading(true);
    selectCurrentRoom();
  }, []);

  //booking

  return (
    <>
      {!loading && (
        <main className="section hotel">
          <div className="container">
            <div className="hotelWrapper">
              <h1 className="hotelTitle"> Номер кімнати: {roomData.roomNumber}</h1>

              <span className="hotelDistance"> Поверх: {roomData.roomFloor}</span>
            </div>

            <span className="hotelPriceHighlight">
              Забронюйте проживання ${roomData.price} у цій кімнаті та отримайте
              безкоштовний тур по місту.
            </span>

            <div className="hotel__content">
              <div className="hotelImages">
                {roomData?.imagesUrl?.map((item, index) => {
                  return <img src={item} alt="" className="hotelImg" key={index} />;
                })}
              </div>

              <div className="hotelDetails">
                <div className="hotelDetailsPrice">
                  {/* <h1 style={{ fontSize: '24px' }}>
                    Ідеально підходить для {roomData.days} ночей.
                  </h1> */}

                  <span>
                    Цей готель розташований у самому серці міста відмінне розташування
                    оцінка 9,8!
                  </span>

                  <h2>your price form day and options</h2>
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
                {roomData.description}
              </p>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default RoomPage;
