import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';
import serverUrl from '../../../serverUrl';
import handleRedirects from '../../../assets/helpers/handleRedirects';

// SVG
import { ReactComponent as Loan } from '../../../assets/svg/loan.svg';
import { ReactComponent as Dashboard } from '../../../assets/svg/dashboard.svg';
import { ReactComponent as UserIcon } from '../../../assets/svg/user.svg';
import { ReactComponent as Logout } from '../../../assets/svg/logout.svg';
import UserDashboardRoutes from '../Routes/userDashboardRoutes';

const UserDashboard = ({ handleLogout }) => {
  // const userData = JSON.parse(window.localStorage.getItem('userData'));
  const history = useHistory();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [user, setUser] = useState({});

  useEffect(() => {
    if (userData.userLevel !== 2) {
      handleRedirects(history);
    }
    axios(`${serverUrl}/user/${userData.id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${userData.authToken}`
      }
    })
      .then(response => {
        const { user } = response.data
        setUser(user);
      });
  }, []) // eslint-disable-line

  return (
    <div className="user-dashboard max808-container">
      <div className="user-dashboard-container">
        <div className="container">
          <div className="dashboard-sidebar">
            <div className="dashboard-sidebar-header">
              <p className="greetings">Hi!</p>
              <p className="borrower-name">{user.firstName} {user.lastName}</p>
            </div>
            <div className="dashboard-sidebar-links">
              <NavLink exact activeClassName="current-page" to="/dashboard"><Dashboard /> Dashboard</NavLink>
              <NavLink exact activeClassName="current-page" to="/dashboard/my-loans"><Loan /> My Loans</NavLink>
              <NavLink exact activeClassName="current-page" to="/dashboard/my-account"><UserIcon /> My Account</NavLink>
              <button className="sidebar-logout" onClick={handleLogout}><Logout /> Logout</button>
            </div>
          </div>
          <div className="dashboard-content">
            <UserDashboardRoutes />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;