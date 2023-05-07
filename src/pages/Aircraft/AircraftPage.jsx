import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetAirCraftMutation } from '../../features/airCraft/airCraftApiSlice';
import { Loading } from 'notiflix';
import BookingModal from '../../components/BookingModal/BookingModal';

const AircraftPage = () => {
  const { pathname } = useLocation();
  const ids = pathname.split('/');
  const airLineId = ids[2];
  const airCraftId = ids[4];
  const [loading, setLoading] = useState(false);
  const [airCraftData, setAirCraftData] = useState({});
  const [isBooking, setIsBooking] = useState(false);

  //fetch Rooms data
  const [dataRoom] = useGetAirCraftMutation();

  useEffect(() => {
    const selectCurrentAirCraft = async () => {
      Loading.dots('Завантаження');

      await dataRoom({ airLineId, airCraftId })
        .then(result => {
          Loading.dots('Заватнаження');
          Loading.remove();

          setAirCraftData({ ...airCraftData, ...result.data });
          setLoading(false);
        })
        .catch(error => {
          Loading.remove();
        });
    };

    setLoading(true);
    selectCurrentAirCraft();
  }, []);

  return (
    <>
      {!loading && (
        <main className="section hotel">
          <div className="container">
            <div className="hotelWrapper">
              <h1 className="hotelTitle"> Відліт: {airCraftData.departure}</h1>

              <span className="hotelDistance"> Приліт: {airCraftData.arrival}</span>
              <p>Ціна: {airCraftData.price}</p>
            </div>

            <div className="hotel__content">
              <div className="hotelImages">
                {airCraftData?.imagesUrl?.map((item, index) => {
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
              <p
                className="hotelTitle"
                style={{
                  fontSize: '20px',
                  fontFamily: 'sans-serif',
                  fontWeight: 'bold',
                  marginTop: '90px',
                }}
              >
                {airCraftData.description}
              </p>
            </div>
          </div>
        </main>
      )}

      {isBooking && <BookingModal isBooking={isBooking} setIsBooking={setIsBooking} />}
    </>
  );
};

export default AircraftPage;
