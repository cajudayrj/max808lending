
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import serverUrl from '../../../../serverUrl';

const TabContentBorrowerRefs = ({ userId }) => {
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    axios(`${serverUrl}/user/references/${userId}`, {
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
      {/* {
        userData.id === userId ?
          <div className="edit-account">
            <Link to="/dashboard/edit-info">Update References</Link>
          </div> : null
      } */}
      <h3 className={`title-info`}>Officemate Reference</h3>
      <div className="info-grid">
        <p className="title">Officemate Name:</p>
        <p className="value">{ifExists(user.officemateName)}</p>
      </div>
      <div className="info-grid">
        <p className="title">Officemate Department:</p>
        <p className="value">{ifExists(user.officemateDepartment)}</p>
      </div>
      <div className="info-grid">
        <p className="title">Officemate Position:</p>
        <p className="value">{ifExists(user.officematePosition)}</p>
      </div>
      <div className="info-grid">
        <p className="title">Officemate Email:</p>
        <p className="value">{ifExists(user.officemateEmail)}</p>
      </div>
      <div className="info-grid">
        <p className="title">Officemate Mobile Number:</p>
        <p className="value">{ifExists(user.officemateMobileNum)}</p>
      </div>

      <h3 className="title-info">Friend Reference</h3>
      <div className="info-grid">
        <p className="title">Friend Name:</p>
        <p className="value">{ifExists(user.friendName)}</p>
      </div>
      <div className="info-grid">
        <p className="title">Friend Mobile Number:</p>
        <p className="value">{ifExists(user.friendMobileNum)}</p>
      </div>
      <div className="info-grid">
        <p className="title">Friend Email:</p>
        <p className="value">{ifExists(user.friendEmail)}</p>
      </div>

      <h3 className="title-info">Family Reference</h3>
      <div className="info-grid">
        <p className="title">Family Name:</p>
        <p className="value">{ifExists(user.familyName)}</p>
      </div>
      <div className="info-grid">
        <p className="title">Family Mobile Number:</p>
        <p className="value">{ifExists(user.familyMobileNum)}</p>
      </div>
      <div className="info-grid">
        <p className="title">Family Email:</p>
        <p className="value">{ifExists(user.familyEmail)}</p>
      </div>
    </>
  )

}

export default TabContentBorrowerRefs;