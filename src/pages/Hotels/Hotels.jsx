import React from 'react';
import SearchBooking from '../../components/SearchBooking/SearchBooking';
import Card from '../../components/Card/Card';
import { useSelector } from 'react-redux';
import {
  useGetAllHotelsQuery,
  selectAllHotels,
} from '../../features/hotel/hotelApiSlice';
import { Report, Loading } from 'notiflix';

const Hotels = () => {
  //select name and min max price for search hotel (props)

  //fetch Hotels data used RTK Query
  const { isLoading, isSuccess, isError, error } = useGetAllHotelsQuery();

  //select All Hotels
  const dataAllHotels = useSelector(selectAllHotels);

  return (
    <main className="section hotels">
      <div className="container">
        <SearchBooking />
        {isLoading ? Loading.dots('Завантаження') : Loading.remove(300)}

        {dataAllHotels.length === 0 ? (
          <div className="missing">
            <section className="section">
              <p className="title" style={{ color: 'red' }}>
                Список порожній
              </p>
            </section>
          </div>
        ) : (
          <>
            {error && (Report.failure('Error', `${error.data}`), Loading.remove())}

            {isSuccess && !isError && (
              <div className="content">
                {dataAllHotels.map(hotel => (
                  <Card element={hotel} key={hotel.id} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Hotels;
