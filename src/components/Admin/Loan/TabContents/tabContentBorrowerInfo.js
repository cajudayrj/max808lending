
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  const renameFbUrl = fb => {
    if (!fb) return '#';
    const link = fb.split('facebook.com/')[1];
    return `https://fb.com/${link}`;
  }

  if (loading) return <h1 className="title-info loading">Loading...</h1>

  return (
    <>
      {
        userData.id === userId ?
          <div className="edit-account">
            <Link to="/dashboard/edit-info">Update Information</Link>
          </div> : null
      }
      <h3 className={`title-info ${userData.id === userId ? 'top' : ''}`}>Main Information</h3>
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
      <div className="info-grid">
        <p className="title">Facebook Account Link:</p>
        <a href={renameFbUrl(user.fbLink)} rel="noopener noreferrer" target="_blank" className="value">{renameFbUrl(user.fbLink)}</a>
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
        <p className="title">Date of Payout 2:</p>
        <p className="value">{user.dateOfPayoutTwo === 0 ? 'N/A' : user.dateOfPayoutTwo}</p>
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