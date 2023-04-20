import React from 'react';
import SearchBooking from '../../components/SearchBooking/SearchBooking';
import Card from '../../components/Card/Card';
import { useParams } from 'react-router-dom';
import { useGetAllRoomsQuery } from '../../features/room/roomApiSlice';
import { Report, Loading } from 'notiflix';

const Rooms = () => {
  //select Hotel id from url and fetch data in rooms folder (in server)
  const { id } = useParams();

  //fetch Rooms data by Hotels id  used RTK Query
  const { isLoading, isSuccess, isError, error } = useGetAllRoomsQuery();

  //select All Hotels
  const dataAllRooms = {};

  // const data = [
  //   {
  //     id: 1,
  //     name: 'Room 1',
  //     price: '100',
  //     cheapestPrice: '100',
  //     days: '5', //days user select
  //     description:
  //       'A Room is a commercial establishment that provides lodging, meals, and other services to guests, travelers, and tourists. Rooms can range from small family-run businesses to large international chains. Most Rooms list a variety of services, such as room service, laundry, and concierge. Some Rooms also offer meeting and conference facilities, fitness centers, and spas.',
  //   },
  //   {
  //     id: 2,
  //     name: 'Room 2',
  //     price: '100',
  //     description:
  //       'A Room is a commercial establishment that provides lodging, meals, and other services to guests, travelers, and tourists. Rooms can range from small family-run businesses to large international chains. Most Rooms list a variety of services, such as room service, laundry, and concierge. Some Rooms also offer meeting and conference facilities, fitness centers, and spas.',
  //   },
  //   {
  //     id: 3,
  //     name: 'Room 3',
  //     price: '100',
  //     description:
  //       'A Room is a commercial establishment that provides lodging, meals, and other services to guests, travelers, and tourists. Rooms can range from small family-run businesses to large international chains. Most Rooms list a variety of services, such as room service, laundry, and concierge. Some Rooms also offer meeting and conference facilities, fitness centers, and spas.',
  //   },
  //   {
  //     id: 4,
  //     name: 'Room 4',
  //     price: '100',
  //     description:
  //       'A Room is a commercial establishment that provides lodging, meals, and other services to guests, travelers, and tourists. Rooms can range from small family-run businesses to large international chains. Most Rooms list a variety of services, such as room service, laundry, and concierge. Some Rooms also offer meeting and conference facilities, fitness centers, and spas.',
  //   },
  //   {
  //     id: 5,
  //     name: 'Room 5',
  //     price: '100',
  //     description:
  //       'A Room is a commercial establishment that provides lodging, meals, and other services to guests, travelers, and tourists. Rooms can range from small family-run businesses to large international chains. Most Rooms list a variety of services, such as room service, laundry, and concierge. Some Rooms also offer meeting and conference facilities, fitness centers, and spas.',
  //   },
  // ];

  return (
    <main className="section hotels">
      <div className="container">
        <SearchBooking />
        {isLoading ? Loading.dots('Завантаження') : Loading.remove(300)}

        {dataAllRooms.length === 0 ? (
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
                {dataAllRooms.map(hotel => (
                  <Card element={hotel} key={hotel.id} />
                ))}
              </div>
            )}
          </>
        )}

        <div className="content">
          {/* {data.map(room => (
            <Card element={room} key={room.id} />
          ))} */}
        </div>
      </div>
    </main>
  );
};

export default Rooms;
