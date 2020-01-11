import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';
import { ReactComponent as Close } from '../../../assets/svg/close.svg';
import { ReactComponent as ToggleMenu } from '../../../assets/svg/menu.svg';

import serverUrl from '../../../serverUrl';

const UserHeader = ({ id, token, handleLogout }) => {
  const history = useHistory();
  const [user, setUser] = useState({});

  const sidebarRef = useRef(null);

  useEffect(() => {
    axios(`${serverUrl}/user/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.data.success) {
          setUser(res.data.user)
          return;
        } else {
          window.localStorage.removeItem('userData');
          history.push('/');
        }
      })
      .catch(err => { throw new Error(err) });
  }, []) // eslint-disable-line

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
            <NavLink to={`/${user.userLevel === 1 ? 'admin' : 'dashboard'}`}><img className="max808logo-img" src={require('../../../assets/images/max808logo.png')} alt="max808-logo" /></NavLink>
            <div className="header-actions">
              <p>Welcome, <NavLink to={`/${user.userLevel === 1 ? 'admin' : 'dashboard'}/my-account`}>{user.username}!</NavLink></p>
              <button type="button" className="logout-btn" onClick={handleLogout}>Logout</button>
              <button className="toggle-menu" onClick={toggleSidebarOpen}>
                <ToggleMenu />
              </button>
            </div>
          </div>
        </nav>
      </header>
      <div className="header-sidebar" ref={sidebarRef}>
        <div className="bg-overlay" onClick={toggleSidebarClose}></div>
        <div className="mobile-sidebar">
          <button type="button" class="close" onClick={toggleSidebarClose}><Close /></button>
          <div className="links-content user-side">
            <ul className="nav-links">
              <li><NavLink exact activeClassName="current-page" to="/dashboard">Dashboard</NavLink></li>
              <li><NavLink exact activeClassName="current-page" to="/dashboard/transaction-history">Transaction History</NavLink></li>
              <li><NavLink exact activeClassName="current-page" to="/dashboard/my-account">My Account</NavLink></li>
              <li><button className="sidebar-logout" onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserHeader;