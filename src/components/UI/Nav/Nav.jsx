import React from 'react';
import { NavLink } from 'react-router-dom';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Nav = ({ isOpen, setIsLogIn }) => {
  //Auth form Redux
  const isAuth = false;

  return (
    <div className={isOpen ? 'nav-menu isOpen' : 'nav-menu'}>
      <nav className="nav__bar">
        <ul className="nav__list">
          <li className="item">
            <NavLink to="/" className="nav__link">
              Головна
            </NavLink>
          </li>

          <li className="item">
            <NavLink to="/hotels" className="nav__link" href="/#hotels">
              Готелі
            </NavLink>
          </li>
          <li className="item">
            <NavLink to="/gallery" className="nav__link" href="/#gallery">
              Галерея
            </NavLink>
          </li>
        </ul>
      </nav>

      <ul className="nav__info">
        <li className="item">
          <a href="mailto:travelagency.com" className="nav__link mail">
            <MarkAsUnreadIcon className="icon-contact" />
            travelagency.com
          </a>
        </li>
        <li className="item">
          <a href="tell:+380961111111" className="nav__link tell">
            <PhoneIphoneIcon className="icon-contact" />
            +38 096 111 11 11
          </a>
        </li>

        {isAuth ? (
          <li className="item">
            <NavLink to="/auth" className="nav__link">
              <AccountBoxIcon className="icon-contact" />
              Профіль
              {/* user Name */}
            </NavLink>
          </li>
        ) : (
          <li className="item">
            <button
              className="nav__link"
              style={{
                border: 'none',
                backgroundColor: 'white',
              }}
              onClick={() => setIsLogIn(true)}
            >
              <AccountBoxIcon className="icon-contact" />
              LogIn
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Nav;
