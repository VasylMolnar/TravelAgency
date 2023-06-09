import React from 'react';
import { TbBrandBooking } from 'react-icons/tb';
import { FaAirbnb, FaTripadvisor } from 'react-icons/fa';
import { SiRyanair, SiHotelsdotcom } from 'react-icons/si';
import { GiPagoda } from 'react-icons/gi';

const Partners = () => {
  return (
    <section className="section partners">
      <div className="container">
        <h2 className="title">Наші партнери</h2>

        <ul className="partners__ul">
          <li className="partners__li">
            <a href="/" className="item">
              <TbBrandBooking className="iconBook" />
            </a>
          </li>

          <li className="partners__li">
            <a href="/" className="item">
              <FaAirbnb className="icon" />
            </a>
          </li>

          <li className="partners__li">
            <a href="/" className="item">
              <SiRyanair className="icon" />
            </a>
          </li>

          <li className="partners__li">
            <a href="/" className="item">
              <SiHotelsdotcom className="icon" />
            </a>
          </li>

          <li className="partners__li">
            <a href="/" className="item">
              <GiPagoda className="icon" />
            </a>
          </li>
          <li className="partners__li">
            <a href="/" className="item">
              <FaTripadvisor className="icon" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Partners;
