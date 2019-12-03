import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as ToggleMenu } from '../../assets/svg/menu.svg';

const Header = () => {
  const [toggled, setToggled] = useState(false);

  const toggleMenu = (e) => {
    e.preventDefault();
    setToggled(!toggled);
  }

  return (
    <header className="header">
      <nav className="header-nav max808-container">
        <div className="header-nav__content">
          <NavLink to="/"><img className="max808logo-img" src={require('../../assets/images/max808logo.png')} alt="max808-logo" /></NavLink>
          <ul className="nav-links">
            <li><NavLink exact activeClassName="current-page" to="/">Home</NavLink></li>
            <li><NavLink exact activeClassName="current-page" to="/faq">FAQ</NavLink></li>
            <li><NavLink exact activeClassName="current-page" to="/borrow">Borrow</NavLink></li>
            <li><NavLink exact activeClassName="current-page" to="/login">Login</NavLink></li>
          </ul>
          <button className="toggle-menu" onClick={toggleMenu}>
            <ToggleMenu />
          </button>
        </div>
      </nav>
    </header>
  )
};

export default Header;