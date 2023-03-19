import React from 'react';
import SearchBooking from '../components/SearchBooking/SearchBooking';
import HotelCards from '../components/HotelCards/HotelCards';

const Hotels = () => {
  return (
    <main className="section hotels">
      <SearchBooking />
      <div className="content">
        <HotelCards />
      </div>
    </main>
  );
};

export default Hotels;
