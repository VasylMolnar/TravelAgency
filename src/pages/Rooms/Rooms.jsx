import React from 'react';
import SearchBooking from '../../components/SearchBooking/SearchBooking';
import Card from '../../components/Card/Card';
import { useParams } from 'react-router-dom';
import { useGetAllRoomsQuery } from '../../features/room/roomApiSlice';
import { Report, Loading } from 'notiflix';

const Rooms = () => {
  //select Hotel id from url and fetch data in rooms folder (in server)
  //for User other style
  const { id } = useParams();

  //fetch Rooms data
  const { data, isLoading, isSuccess, isError, error } = useGetAllRoomsQuery({
    id,
  });

  // if (isSuccess) {
  //   console.log('data', data);
  // }

  return (
    <main className="section hotels">
      <div className="container">
        <SearchBooking />
        {isLoading ? Loading.dots('Завантаження') : Loading.remove(300)}
        {error && (Report.failure('Error', `${error.data}`), Loading.remove())}

        {isSuccess && data.length > 0 ? (
          <div>
            <h1 className="title" style={{ marginTop: '10px', paddingBottom: '10px' }}>
              Список Кімнат
            </h1>

            <div className="userList_cards">
              {isSuccess &&
                !isError &&
                data.map(item => <Card element={item} key={item.id} />)}
            </div>
          </div>
        ) : (
          <div style={{ width: '100%' }}>
            <p className="title" style={{ color: 'red' }}>
              Список порожній
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Rooms;
