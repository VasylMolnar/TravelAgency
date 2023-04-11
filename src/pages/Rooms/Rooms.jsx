import React from 'react';
import SearchBooking from '../../components/SearchBooking/SearchBooking';
import Card from '../../components/Card/Card';

const Rooms = () => {
  //select Hotel id from url and fetch data in rooms folder (in server)
  //find rooms by Hotel id
  //const { id } = useParams();
  // console.log('Hotel:', id);
  //fetch(id)

  const data = [
    {
      id: 1,
      name: 'Room 1',
      price: '100',
      cheapestPrice: '100',
      days: '5', //days user select
      description:
        'A Room is a commercial establishment that provides lodging, meals, and other services to guests, travelers, and tourists. Rooms can range from small family-run businesses to large international chains. Most Rooms list a variety of services, such as room service, laundry, and concierge. Some Rooms also offer meeting and conference facilities, fitness centers, and spas.',
    },
    {
      id: 2,
      name: 'Room 2',
      price: '100',
      description:
        'A Room is a commercial establishment that provides lodging, meals, and other services to guests, travelers, and tourists. Rooms can range from small family-run businesses to large international chains. Most Rooms list a variety of services, such as room service, laundry, and concierge. Some Rooms also offer meeting and conference facilities, fitness centers, and spas.',
    },
    {
      id: 3,
      name: 'Room 3',
      price: '100',
      description:
        'A Room is a commercial establishment that provides lodging, meals, and other services to guests, travelers, and tourists. Rooms can range from small family-run businesses to large international chains. Most Rooms list a variety of services, such as room service, laundry, and concierge. Some Rooms also offer meeting and conference facilities, fitness centers, and spas.',
    },
    {
      id: 4,
      name: 'Room 4',
      price: '100',
      description:
        'A Room is a commercial establishment that provides lodging, meals, and other services to guests, travelers, and tourists. Rooms can range from small family-run businesses to large international chains. Most Rooms list a variety of services, such as room service, laundry, and concierge. Some Rooms also offer meeting and conference facilities, fitness centers, and spas.',
    },
    {
      id: 5,
      name: 'Room 5',
      price: '100',
      description:
        'A Room is a commercial establishment that provides lodging, meals, and other services to guests, travelers, and tourists. Rooms can range from small family-run businesses to large international chains. Most Rooms list a variety of services, such as room service, laundry, and concierge. Some Rooms also offer meeting and conference facilities, fitness centers, and spas.',
    },
  ];

  return (
    <main className="section hotels">
      <div className="container">
        <SearchBooking />
        <div className="content">
          {data.map(room => (
            <Card element={room} key={room.id} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Rooms;
