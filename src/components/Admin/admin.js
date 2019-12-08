import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Footer/footer';

import UserHeader from '../User/Header/userHeader';
import AdminRoutes from './Routes/adminRoutes';

const Admin = () => {
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const history = useHistory();
  const [logoutModal, setLogoutModal] = useState(false);

  const modal = useRef(null);

  const handleLogout = () => {
    setLogoutModal(!logoutModal);
    if (!logoutModal) {
      modal.current.classList.add('shown');
      setTimeout(() => {
        modal.current.classList.add('opened');
      }, 100)
    } else {
      modal.current.classList.remove('opened');
      setTimeout(() => {
        modal.current.classList.remove('shown');
      }, 200)
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('userData');
    history.push('/');
  }
  return (
    <div className="main-user-component-container">
      <UserHeader id={userData.id} token={userData.authToken} handleLogout={handleLogout} />
      <AdminRoutes handleLogout={handleLogout} />
      <Footer />
      <div className="logout-modal-container" ref={modal}>
        <div className="logout-bg-overlay" onClick={handleLogout}></div>
        <div className="logout-prompt">
          <p className="are-you-sure">Are you sure you want to logout?</p>
          <button className="logout" onClick={logOut}>Logout</button>
          <button className="cancel" onClick={handleLogout}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default Admin;