import React, { useState, useEffect } from 'react';
import axios from 'axios';

import serverUrl from '../../serverUrl';
import Header from '../Header/header';
import Footer from '../Footer/footer';

const Verify = (props) => {
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const token = props.match.params.verifyToken || 'not-found'

  useEffect(() => {
    axios(`${serverUrl}/account/verify`, {
      method: 'PUT',
      data: {
        token
      }
    })
      .then(res => {
        setSuccess(res.data.success);
        setMessage(res.data.message);
      })
  }, []); // eslint-disable-line

  return (
    <>
      <Header />
      <div className="max808-container verify">
        <div className="verify-message-container">
          <h4>{success ? "Success!" : "There's an error."}</h4>
          <p>{message}</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Verify;