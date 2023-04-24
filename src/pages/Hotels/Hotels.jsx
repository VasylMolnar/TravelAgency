import { useState, React } from 'react';
import SearchBooking from '../../components/SearchBooking/SearchBooking';
import Card from '../../components/Card/Card';
import { useSelector } from 'react-redux';
import {
  useGetAllHotelsQuery,
  selectAllHotels,
} from '../../features/hotel/hotelApiSlice';
import { Report, Loading } from 'notiflix';
import useSort from '../../hooks/useSort';

const Hotels = () => {
  //select name and min max price for search hotel (props)

  const [options, setOptions] = useState({
    //save to localStorage
    searchValue: '',
    dataEnd: '',
    dataOff: '',
    min: '',
    max: '',
    adult: '',
    children: '',
    room: '',
  });

  //fetch Hotels data used RTK Query
  const { isLoading, isSuccess, isError, error } = useGetAllHotelsQuery();

  //select All Hotels
  const dataAllHotels = useSelector(selectAllHotels);

  //sort by SearchValue, Min, Max
  const sorterData = useSort(options, dataAllHotels);

  return (
    <main className="section hotels">
      <div className="container">
        <SearchBooking options={options} setOptions={setOptions} />
        {isLoading ? Loading.dots('Завантаження') : Loading.remove(300)}

        {sorterData.length === 0 ? (
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
                {sorterData.map(hotel => (
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
