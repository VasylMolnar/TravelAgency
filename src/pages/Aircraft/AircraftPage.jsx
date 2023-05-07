import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetAirCraftMutation } from '../../features/airCraft/airCraftApiSlice';
import { Loading } from 'notiflix';
import BookingModal from '../../components/BookingModal/BookingModal';
import AirCraftBookingModal from '../../components/AirCraftBookingModal/AirCraftBookingModal';

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
                    Літаки мають багато переваг порівняно з іншими видами транспорту,
                    особливо для довгих відстаней і пересування між країнами.
                  </span>

                  <p>
                    Швидкість: літаки можуть рухатися з великою швидкістю, що дозволяє
                    значно скоротити час подорожі. Наприклад, переліт з одного кінця світу
                    до іншого може зайняти всього декілька годин.
                  </p>

                  <p>
                    Комфорт: багато авіакомпаній пропонують комфортабельні місця для
                    пасажирів, зручні крісла, системи розваг та харчування.
                  </p>

                  <p>
                    Безпека: літаки мають високий рівень безпеки. Авіакомпанії та льотні
                    служби докладають багато зусиль, щоб забезпечити безпеку пасажирів під
                    час польоту.
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

      {isBooking && (
        <AirCraftBookingModal isBooking={isBooking} setIsBooking={setIsBooking} />
      )}
    </>
  );
};

export default AircraftPage;
