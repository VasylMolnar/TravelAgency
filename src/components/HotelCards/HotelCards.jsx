import React from 'react';
import Card from '../Card/Card';

const HotelCards = () => {
  //select name and min max price for search hotel (props)
  //fetch data form server
  const data = [
    {
      id: 1, //id hotel === id rooms folder in server{[room1; room2;room3]}
      name: 'Hotel 1',
      price: '100',
      distance: '500',
      address: 'Ukraine',
      cheapestPrice: '100',
      days: '5', //days user select
      description:
        'A hotel is a commercial establishment that provides lodging, meals, and other services to guests, travelers, and tourists. Hotels can range from small family-run businesses to large international chains. Most hotels list a variety of services, such as room service, laundry, and concierge. Some hotels also offer meeting and conference facilities, fitness centers, and spas.',
    },
    {
      id: 2,
      name: 'Hotel 2',
      price: '100',
      description:
        'A hotel is a commercial establishment that provides lodging, meals, and other services to guests, travelers, and tourists. Hotels can range from small family-run businesses to large international chains. Most hotels list a variety of services, such as room service, laundry, and concierge. Some hotels also offer meeting and conference facilities, fitness centers, and spas.',
    },
    {
      id: 3,
      name: 'Hotel 3',
      price: '100',
      description:
        'A hotel is a commercial establishment that provides lodging, meals, and other services to guests, travelers, and tourists. Hotels can range from small family-run businesses to large international chains. Most hotels list a variety of services, such as room service, laundry, and concierge. Some hotels also offer meeting and conference facilities, fitness centers, and spas.',
    },
    {
      id: 4,
      name: 'Hotel 4',
      price: '100',
      description:
        'A hotel is a commercial establishment that provides lodging, meals, and other services to guests, travelers, and tourists. Hotels can range from small family-run businesses to large international chains. Most hotels list a variety of services, such as room service, laundry, and concierge. Some hotels also offer meeting and conference facilities, fitness centers, and spas.',
    },
    {
      id: 5,
      name: 'Hotel 5',
      price: '100',
      description:
        'A hotel is a commercial establishment that provides lodging, meals, and other services to guests, travelers, and tourists. Hotels can range from small family-run businesses to large international chains. Most hotels list a variety of services, such as room service, laundry, and concierge. Some hotels also offer meeting and conference facilities, fitness centers, and spas.',
    },
  ];

  return (
    <div className="hotelCards">
      {data.map(hotel => (
        <Card element={hotel} key={hotel.id} />
      ))}
    </div>
  );
};

export default HotelCards;
