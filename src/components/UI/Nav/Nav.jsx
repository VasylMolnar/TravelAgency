import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="nav_menu">
      <nav className="nav_bar">
        <ul className="nav_list">
          <li className="item">
            <NavLink to="posts" className="nav_link">
              Головна
            </NavLink>
          </li>
          <li className="item">
            <NavLink to="newPost" className="nav_link">
              Готелі
            </NavLink>
          </li>

          <li className="item">
            <NavLink to="users" className="nav_link">
              Галерея
            </NavLink>
          </li>
        </ul>
      </nav>

      <ul className="nav_info">
        <li className="item">
          <a href="mailto:info@touragency.com" className="nav__link">
            info@touragency.com
          </a>
        </li>
        <li className="item tell">
          <a href="tell:+380961111111" className="nav__link">
            +38 096 111 11 11
          </a>
        </li>
        <li className="item">
          <a>Профіль</a>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
