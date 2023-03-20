import React from 'react';
import Card from '../Card/Card';
import { useParams, Link } from 'react-router-dom';

const RoomCards = () => {
  //select Room id from url and fetch data in rooms folder (in server)
  //find rooms by Room id
  const { id } = useParams();
  console.log('Hotel:', id);

  const data = [
    {
      id: 1,
      name: 'Room 1',
      price: '100',
      distance: '500',
      address: 'Ukraine',
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
    <div className="RoomCards">
      {data.map(room => (
        <Card element={room} key={room.id} />
      ))}
    </div>
  );
};

export default RoomCards;
