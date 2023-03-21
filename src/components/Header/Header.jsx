import { React, useState } from 'react';
import Nav from '../UI/Nav/Nav';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AuthModal from '../AuthModal/AuthModal';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          Travel<span>Agency</span>
        </Link>

        <Nav isOpen={isOpen} setIsLogIn={setIsLogIn} />

        <button
          type="button"
          className="menu-button"
          aria-expanded="false"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuIcon />
        </button>

        {/* AuthModal */}
        <AuthModal isLogIn={isLogIn} setIsLogIn={setIsLogIn} />
      </div>
    </header>
  );
};

export default Header;
