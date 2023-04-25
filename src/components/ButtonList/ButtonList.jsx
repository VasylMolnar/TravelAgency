import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ButtonList = () => {
  const { pathname } = useLocation();

  return (
    <div className="ButtonList">
      <Link to={`${pathname}/userList`} className="btn_item">
        <button className="btn btn-outline-primary">Користувачі</button>
      </Link>
      <Link to={`${pathname}/hotelList`} className="btn_item">
        <button className="btn btn-outline-primary">Готелі</button>
      </Link>

      <Link to={`${pathname}/userList`} className="btn_item">
        <button className="btn btn-outline-primary">Авіакомпанії</button>
      </Link>
    </div>
  );
};

export default ButtonList;
