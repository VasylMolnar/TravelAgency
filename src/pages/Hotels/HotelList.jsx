import React from 'react';
import { useSelector } from 'react-redux';
import {
  useGetAllHotelsQuery,
  selectHotelsIds,
} from '../../features/hotel/hotelApiSlice';
import { Report, Loading } from 'notiflix';
import HotelCard from '../../components/HotelCard/HotelCard';
import HotelModal from '../../components/HotelModal/HotelModal';

const HotelList = () => {
  //fetch Hotels data
  const { isLoading, isSuccess, isError, error } = useGetAllHotelsQuery();

  //select Users IDS
  const orderedHotelsIds = useSelector(selectHotelsIds);

  return (
    <main className="hotelList section">
      <div className="container">
        <h1 className="title" style={{ marginTop: '10px', paddingBottom: '10px' }}>
          Список Готелів
        </h1>

        {isLoading ? Loading.dots('Завантаження') : Loading.remove(300)}
        {error && (Report.failure('Error', `${error.data}`), Loading.remove())}

        <div className="userList_cards">
          {isSuccess &&
            !isError &&
            orderedHotelsIds.map(id => <HotelCard id={id} key={id} />)}
        </div>
      </div>

      <HotelModal />
    </main>
  );
};

export default HotelList;
