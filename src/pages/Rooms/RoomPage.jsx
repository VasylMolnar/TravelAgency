import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetRoomMutation } from '../../features/room/roomApiSlice';
import { Loading, Report } from 'notiflix';
import BookingModal from '../../components/BookingModal/BookingModal';

const RoomPage = () => {
  const { pathname } = useLocation();
  const ids = pathname.split('/');
  const hotelId = ids[2];
  const roomId = ids[4];
  const [loading, setLoading] = useState(false);
  const [roomData, setRoomData] = useState({});
  const [isBooking, setIsBooking] = useState(false);

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
                  <span>
                    Цей готель розташований у самому серці міста відмінне розташування
                    оцінка 9,8!
                  </span>

                  <p>
                    Бронювання: Кімнату в готелі можна забронювати заздалегідь, що
                    забезпечує впевненість в наявності проживання під час поїздки.
                  </p>

                  <p>
                    Безпека: Готельна кімната забезпечує безпеку для туристів, особливо
                    якщо вона знаходиться в закритій будівлі з контрольованим доступом.
                  </p>

                  <p>
                    Зручності: Кімната в готелі зазвичай має зручності, такі як ванна
                    кімната, кондиціонер, телевізор, холодильник, безкоштовний Wi-Fi тощо,
                    що робить перебування більш комфортним.
                  </p>
                  <button className="btn btn-primary" onClick={() => setIsBooking(true)}>
                    Бронюйте зараз!
                  </button>
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

      {isBooking && <BookingModal isBooking={isBooking} setIsBooking={setIsBooking} />}
    </>
  );
};

export default RoomPage;
