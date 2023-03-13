import { React, useState } from 'react';
import Nav from '../UI/Nav/Nav';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          Travel<span>Agency</span>
        </Link>

        <Nav isOpen={isOpen} />

        <button
          type="button"
          className="menu-button"
          aria-expanded="false"
          data-menu-button
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
