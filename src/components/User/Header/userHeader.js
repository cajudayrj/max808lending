import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';

import serverUrl from '../../../serverUrl';

const UserHeader = ({ id, token, handleLogout }) => {
  const history = useHistory();
  const [user, setUser] = useState({});

  useEffect(() => {
    axios(`${serverUrl}/user/${id}`, {
      method: "GET",
      headers: {
        "auth_token": token
      }
    })
      .then(res => {
        if (res.data.success) {
          setUser(res.data.user)
        } else {
          // window.localStorage.removeItem('userData');
          history.push('/');
        }
      })
      .catch(err => { throw new Error(err) });
  }, []) // eslint-disable-line

  return (
    <header className="header">
      <nav className="header-nav max808-container">
        <div className="header-nav__content">
          <NavLink to={`/${user.userLevel === 1 ? 'admin' : 'dashboard'}`}><img className="max808logo-img" src={require('../../../assets/images/max808logo.png')} alt="max808-logo" /></NavLink>
          <div className="header-actions">
            <p>Welcome, <NavLink to={`/${user.userLevel === 1 ? 'admin' : 'dashboard'}/my-account`}>{user.username}!</NavLink></p>
            <button type="button" className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default UserHeader;