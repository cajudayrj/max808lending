import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';
import serverUrl from '../../../serverUrl';
import handleRedirects from '../../../assets/helpers/handleRedirects';

//SVG
import { ReactComponent as Loan } from '../../../assets/svg/all-loan.svg';
import { ReactComponent as ActiveLoan } from '../../../assets/svg/active-loan.svg';
import { ReactComponent as FullPaid } from '../../../assets/svg/fullpaid-loan.svg';
import { ReactComponent as PendingLoan } from '../../../assets/svg/pending-loan.svg';
import { ReactComponent as ApprovedLoan } from '../../../assets/svg/approved-loan.svg';
import { ReactComponent as AcceptedLoan } from '../../../assets/svg/accepted-loan.svg';
import { ReactComponent as RejectedLoan } from '../../../assets/svg/rejected-loan.svg';
import { ReactComponent as Dashboard } from '../../../assets/svg/dashboard.svg';
import { ReactComponent as Logout } from '../../../assets/svg/logout.svg';
import AdminDashboardRoutes from '../Routes/adminDashboardRoutes';

const AdminDashboard = ({ handleLogout }) => {
  const history = useHistory();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [user, setUser] = useState({});

  useEffect(() => {
    if (userData.userLevel !== 1) {
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
              <NavLink exact activeClassName="current-page" to="/admin"><Dashboard /> Dashboard</NavLink>
              <NavLink exact activeClassName="current-page" to="/admin/loans"><Loan /> All Loans</NavLink>
              <NavLink exact activeClassName="current-page" to="/admin/active-loans"><ActiveLoan /> Active Loans</NavLink>
              <NavLink exact activeClassName="current-page" to="/admin/fully-paid-loans"><FullPaid /> Fully Paid Loans</NavLink>
              <NavLink exact activeClassName="current-page" to="/admin/pending-loans"><PendingLoan /> Pending Loans</NavLink>
              <NavLink exact activeClassName="current-page" to="/admin/approved-loans"><ApprovedLoan /> Approved Loans</NavLink>
              <NavLink exact activeClassName="current-page" to="/admin/accepted-loans"><AcceptedLoan /> User Accepted Loans</NavLink>
              <NavLink exact activeClassName="current-page" to="/admin/rejected-loans"><RejectedLoan /> Rejected Loans</NavLink>
              <button className="sidebar-logout" onClick={handleLogout}><Logout /> Logout</button>
            </div>
          </div>
          <div className="dashboard-content">
            <AdminDashboardRoutes />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard;