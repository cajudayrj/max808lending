import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as ToggleMenu } from '../../assets/svg/menu.svg';
import { ReactComponent as Close } from '../../assets/svg/close.svg';

const Header = () => {

  const sidebarRef = useRef(null);

  const toggleSidebarOpen = (e) => {
    e.preventDefault();

    sidebarRef.current.classList.add('visible');
    setTimeout(() => {
      sidebarRef.current.classList.add('shown')
    }, 300)
  }

  const toggleSidebarClose = (e) => {
    e.preventDefault();

    sidebarRef.current.classList.remove('shown');
    setTimeout(() => {
      sidebarRef.current.classList.remove('visible')
    }, 300)
  }

  return (
    <>
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
            <button className="toggle-menu" onClick={toggleSidebarOpen}>
              <ToggleMenu />
            </button>
          </div>
        </nav>
      </header>
      <div className="header-sidebar" ref={sidebarRef}>
        <div className="bg-overlay" onClick={toggleSidebarClose}></div>
        <div className="mobile-sidebar">
          <button type="button" className="close" onClick={toggleSidebarClose}><Close /></button>
          <div className="links-content">
            <ul className="nav-links">
              <li><NavLink exact activeClassName="current-page" to="/">Home</NavLink></li>
              <li><NavLink exact activeClassName="current-page" to="/faq">FAQ</NavLink></li>
              <li><NavLink exact activeClassName="current-page" to="/borrow">Borrow</NavLink></li>
              <li><NavLink exact activeClassName="current-page" to="/login">Login</NavLink></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
};

export default Header;