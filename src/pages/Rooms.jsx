import React from 'react';
import SearchBooking from '../components/SearchBooking/SearchBooking';
import RoomCards from '../components/RoomCards/RoomCards';

const Rooms = () => {
  return (
    <main className="section hotels">
      <div className="container">
        <SearchBooking />
        <div className="content">
          <RoomCards />
        </div>
      </div>
    </main>
  );
};

export default Rooms;
