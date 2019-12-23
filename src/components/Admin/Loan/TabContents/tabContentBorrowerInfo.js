
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import serverUrl from '../../../../serverUrl';

const TabContentBorrowerInfo = ({ userId }) => {
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    axios(`${serverUrl}/user/info/${userId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${userData.authToken}`
      }
    })
      .then(result => {
        const res = result.data;
        if (res.success) {
          setUser(res.user);
          setLoading(false);
        } else {
          console.log(res.message);
        }
      })
  }, [userData.authToken, userId])
  if (loading) return <h1>Loading...</h1>

  return (
    <>
      <h3 className="title-info">Main Information</h3>
      <div className="info-grid">
        <p className="title">First Name:</p>
        <p className="value">{user.firstName}</p>
      </div>
      <div className="info-grid">
        <p className="title">Middle Name:</p>
        <p className="value">{user.middleName ? user.middleName : '-'}</p>
      </div>
      <div className="info-grid">
        <p className="title">Last Name:</p>
        <p className="value">{user.lastName}</p>
      </div>
      <div className="info-grid">
        <p className="title">Username:</p>
        <p className="value">{user.username}</p>
      </div>
      <div className="info-grid">
        <p className="title">Email:</p>
        <p className="value">{user.email}</p>
      </div>
      <div className="info-grid">
        <p className="title">Address:</p>
        <p className="value">{user.address}</p>
      </div>
      <div className="info-grid">
        <p className="title">City / Municipality:</p>
        <p className="value">{user.town}</p>
      </div>
      <div className="info-grid">
        <p className="title">State / Province:</p>
        <p className="value">{user.cityProvince}</p>
      </div>
      <div className="info-grid">
        <p className="title">Birthday:</p>
        <p className="value">{moment(user.birthday).format('MMMM DD, YYYY')}</p>
      </div>
      <div className="info-grid">
        <p className="title">Gender:</p>
        <p className="value">{user.gender}</p>
      </div>
      <div className="info-grid">
        <p className="title">Mobile Number:</p>
        <p className="value">{user.mobileNum}</p>
      </div>
      <h3 className="title-info">Other Information</h3>
      <div className="info-grid">
        <p className="title">Office Name:</p>
        <p className="value">{user.officeName}</p>
      </div>
      <div className="info-grid">
        <p className="title">Office Position:</p>
        <p className="value">{user.officePosition}</p>
      </div>
      <div className="info-grid">
        <p className="title">Office Address:</p>
        <p className="value">{user.officeAddress}</p>
      </div>
      <div className="info-grid">
        <p className="title">Office Telephone:</p>
        <p className="value">{user.officeTelephone}</p>
      </div>
      <div className="info-grid">
        <p className="title">Date of Payout:</p>
        <p className="value">{user.dateOfPayout}</p>
      </div>
      <div className="info-grid">
        <p className="title">Office Payroll Account:</p>
        <p className="value">{user.officePayrollAccount}</p>
      </div>
      <div className="info-grid">
        <p className="title">Bank Checking Account:</p>
        <p className="value">{user.bankCheckingAccount}</p>
      </div>
      <div className="info-grid">
        <p className="title">Existing Loans:</p>
        <p className="value">{user.existingLoans ? user.existingLoans : 'None'}</p>
      </div>
    </>
  )

}

export default TabContentBorrowerInfo;