import React from 'react';
import Nav from '../UI/Nav/Nav';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          Travel<span>Agency</span>
        </Link>

        <Nav />
      </div>
    </header>
  );
};

export default Header;
