import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import handleRedirects from '../../../assets/helpers/handleRedirects';

const AllLoans = () => {
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const history = useHistory();
  useEffect(() => {
    if (userData.userLevel !== 1) {
      handleRedirects(history);
      return;
    }
  })
  return (
    <div className="admin-loans-dashboard all-loan-dashboard">
      <h1 className="header-title">All Loans</h1>
      <div className="loans-table">

      </div>
    </div>
  )
}

export default AllLoans;