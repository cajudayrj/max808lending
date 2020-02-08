import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import serverUrl from '../../../serverUrl';

// SVG
import { ReactComponent as UserIcon } from '../../../assets/svg/user.svg';
import { ReactComponent as PendingLoan } from '../../../assets/svg/pending-loan.svg';
import { ReactComponent as ActiveLoan } from '../../../assets/svg/active-loan.svg';
import { ReactComponent as ApprovedLoan } from '../../../assets/svg/approved-loan.svg';
import { ReactComponent as AcceptedLoan } from '../../../assets/svg/accepted-loan.svg';
import { ReactComponent as RejectedLoan } from '../../../assets/svg/rejected-loan.svg';
import { ReactComponent as AllLoans } from '../../../assets/svg/all-loan.svg';
import { ReactComponent as FullyPaid } from '../../../assets/svg/fullpaid-loan.svg';

const MainAdminDashboard = () => {
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const [counts, setCounts] = useState({});
  useEffect(() => {
    axios(`${serverUrl}/admin/admin-dashboard-count`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${userData.authToken}`
      }
    })
      .then(({ data }) => {
        setCounts(data);
      })
      .catch(err => console.log(err));
  }, [userData.authToken])
  return (
    <div className="main-admin-dashboard">
      <h1 className="header-title">Admin Dashboard</h1>
      <div className="dashboard-items-container d-grid">
        <NavLink className="user-count" to="/admin/user-list">
          <div className="items">
            <UserIcon />
            <div className="count-desc">
              <p className="count">{counts.userCount}</p>
              <p className="label">Users</p>
            </div>
          </div>
        </NavLink>
        <NavLink className="user-count" to="/admin/banned-user-list">
          <div className="items">
            <UserIcon />
            <div className="count-desc">
              <p className="count">{counts.bannedUserCount}</p>
              <p className="label">Banned Users</p>
            </div>
          </div>
        </NavLink>
        <NavLink className="all-loans-count" to="/admin/loans">
          <div className="items">
            <AllLoans />
            <div className="count-desc">
              <p className="count">{counts.allLoanCount}</p>
              <p className="label">All Loans</p>
            </div>
          </div>
        </NavLink>
        <NavLink className="active-loans-count" to="/admin/active-loans">
          <div className="items">
            <ActiveLoan />
            <div className="count-desc">
              <p className="count">{counts.activeLoanCount}</p>
              <p className="label">Active Loans</p>
            </div>
          </div>
        </NavLink>
        <NavLink className="active-loans-count" to="/admin/fully-paid-loans">
          <div className="items">
            <FullyPaid />
            <div className="count-desc">
              <p className="count">{counts.fullpaidLoanCount}</p>
              <p className="label">Fully Paid Loans</p>
            </div>
          </div>
        </NavLink>
        <NavLink className="pending-loans-count" to="/admin/pending-loans">
          <div className="items">
            <PendingLoan />
            <div className="count-desc">
              <p className="count">{counts.pendingLoanCount}</p>
              <p className="label">Pending Loans</p>
            </div>
          </div>
        </NavLink>
        <NavLink className="approved-loans-count" to="/admin/approved-loans">
          <div className="items">
            <ApprovedLoan />
            <div className="count-desc">
              <p className="count">{counts.approvedLoanCount}</p>
              <p className="label">Approved Loans</p>
            </div>
          </div>
        </NavLink>
        <NavLink className="accepted-loans-count" to="/admin/accepted-loans">
          <div className="items">
            <AcceptedLoan />
            <div className="count-desc">
              <p className="count">{counts.acceptedLoanCount}</p>
              <p className="label">User Accepted Loans</p>
            </div>
          </div>
        </NavLink>
        <NavLink className="rejected-loans-count" to="/admin/rejected-loans">
          <div className="items">
            <RejectedLoan />
            <div className="count-desc">
              <p className="count">{counts.rejectedLoanCount}</p>
              <p className="label">Rejected / User Refused Loans</p>
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  )
}

export default MainAdminDashboard;