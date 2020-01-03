
import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';
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
          setUser({});
          setLoading(false);
        }

        return;
      })
  }, [userData.authToken, userId])

  const ifExists = item => item ? item : '';

  if (loading) return <h1 className="title-info loading">Loading...</h1>

  return (
    <>
      <h3 className="title-info">Main Information</h3>
      <div className="info-grid">
        <p className="title">First Name:</p>
        <p className="value">{ifExists(user.firstName)}</p>
      </div>
      <div className="info-grid">
        <p className="title">Middle Name:</p>
        <p className="value">{user.middleName ? user.middleName : '-'}</p>
      </div>
      <div className="info-grid">
        <p className="title">Last Name:</p>
        <p className="value">{ifExists(user.lastName)}</p>
      </div>
      <div className="info-grid">
        <p className="title">Username:</p>
        <p className="value">{ifExists(user.username)}</p>
      </div>
      <div className="info-grid">
        <p className="title">Email:</p>
        <p className="value">{ifExists(user.email)}</p>
      </div>
      <div className="info-grid">
        <p className="title">Mobile Number:</p>
        <p className="value">{ifExists(user.mobileNum)}</p>
      </div>
      <div className="info-grid">
        <p className="title">Address:</p>
        <p className="value">{ifExists(user.address)}</p>
      </div>
      <div className="info-grid">
        <p className="title">City / Municipality:</p>
        <p className="value">{ifExists(user.town)}</p>
      </div>
      <div className="info-grid">
        <p className="title">State / Province:</p>
        <p className="value">{ifExists(user.cityProvince)}</p>
      </div>
      <div className="info-grid">
        <p className="title">Birthday:</p>
        <p className="value">{ifExists(moment(user.birthday).tz('Asia/Manila').format('MMMM DD, YYYY'))}</p>
      </div>
      <div className="info-grid">
        <p className="title">Gender:</p>
        <p className="value">{ifExists(user.gender)}</p>
      </div>
      <h3 className="title-info">Other Information</h3>
      <div className="info-grid">
        <p className="title">Office Name:</p>
        <p className="value">{ifExists(user.officeName)}</p>
      </div>
      <div className="info-grid">
        <p className="title">Office Position:</p>
        <p className="value">{ifExists(user.officePosition)}</p>
      </div>
      <div className="info-grid">
        <p className="title">Office Address:</p>
        <p className="value">{ifExists(user.officeAddress)}</p>
      </div>
      <div className="info-grid">
        <p className="title">Office Telephone:</p>
        <p className="value">{ifExists(user.officeTelephone)}</p>
      </div>
      <div className="info-grid">
        <p className="title">Date of Payout:</p>
        <p className="value">{ifExists(user.dateOfPayout)}</p>
      </div>
      <div className="info-grid">
        <p className="title">Office Payroll Account:</p>
        <p className="value">{ifExists(user.officePayrollAccount)}</p>
      </div>
      <div className="info-grid">
        <p className="title">Bank Checking Account:</p>
        <p className="value">{ifExists(user.bankCheckingAccount)}</p>
      </div>
      <div className="info-grid">
        <p className="title">Existing Loans:</p>
        <p className="value">{user.existingLoans ? user.existingLoans : 'None'}</p>
      </div>
    </>
  )

}

export default TabContentBorrowerInfo;