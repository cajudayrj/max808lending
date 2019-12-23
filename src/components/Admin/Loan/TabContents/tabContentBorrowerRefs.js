
import React, { useEffect, useState } from 'react';
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
        }
        return;
      })
  }, [userData.authToken, userId])
  if (loading) return <h1>Loading...</h1>

  return (
    <>
      <h3 className="title-info">Officemate Reference</h3>
      <div className="info-grid">
        <p className="title">Officemate Name:</p>
        <p className="value">{user.officemateName}</p>
      </div>
      <div className="info-grid">
        <p className="title">Officemate Department:</p>
        <p className="value">{user.officemateDepartment}</p>
      </div>
      <div className="info-grid">
        <p className="title">Officemate Position:</p>
        <p className="value">{user.officematePosition}</p>
      </div>
      <div className="info-grid">
        <p className="title">Officemate Email:</p>
        <p className="value">{user.officemateEmail}</p>
      </div>
      <div className="info-grid">
        <p className="title">Officemate Mobile Number:</p>
        <p className="value">{user.officemateMobileNum}</p>
      </div>

      <h3 className="title-info">Friend Reference</h3>
      <div className="info-grid">
        <p className="title">Friend Name:</p>
        <p className="value">{user.friendName}</p>
      </div>
      <div className="info-grid">
        <p className="title">Friend Mobile Number:</p>
        <p className="value">{user.friendMobileNum}</p>
      </div>
      <div className="info-grid">
        <p className="title">Friend Email:</p>
        <p className="value">{user.friendEmail}</p>
      </div>

      <h3 className="title-info">Family Reference</h3>
      <div className="info-grid">
        <p className="title">Family Name:</p>
        <p className="value">{user.familyName}</p>
      </div>
      <div className="info-grid">
        <p className="title">Family Mobile Number:</p>
        <p className="value">{user.familyMobileNum}</p>
      </div>
      <div className="info-grid">
        <p className="title">Family Email:</p>
        <p className="value">{user.familyEmail}</p>
      </div>
    </>
  )

}

export default TabContentBorrowerRefs;