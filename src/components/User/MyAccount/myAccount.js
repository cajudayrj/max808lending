import React, { useEffect } from 'react';
import handleVerifiedRedirect from '../../../assets/helpers/handleVerifiedRedirect';
import { useHistory } from 'react-router-dom';

const MyAccount = () => {
  const history = useHistory();

  useEffect(() => {
    handleVerifiedRedirect(history);
  }, []); // eslint-disable-line

  return (
    <div className="user-account max808-container">
      <div className="user-account-container">
        <h1>My Account</h1>
      </div>
    </div>
  )
}

export default MyAccount;