import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './index.css';
const Nav = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-xl">
        <Link to="#" class="logo">
          Travel<span>Agency</span>
        </Link>
        <div class="collapse navbar-collapse">
          <NavLink to="posts" className="navbar-brand">
            Головна
          </NavLink>
          <NavLink to="newPost" className="navbar-brand">
            Готелі
          </NavLink>
          <NavLink to="users" className="navbar-brand">
            Галерея
          </NavLink>
          <NavLink to="/about" className="navbar-brand">
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
