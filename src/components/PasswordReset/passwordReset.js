import React, { useState } from 'react';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import axios from 'axios';
import serverUrl from '../../serverUrl';

const SendPasswordReset = () => {
  const [email, setEmail] = useState('');
  const [resendError, setResendError] = useState('');
  const [responseSuccess, setResponseSuccess] = useState(false);

  const handleResend = e => {
    e.preventDefault();
    setResendError('');
    setResponseSuccess(false);

    if (
      email.length > 0
    ) {
      axios(`${serverUrl}/account/reset-password-link/${email}`)
        .then(res => {
          setResendError(res.data.message)
          setResponseSuccess(res.data.success)
        })
        .catch(err => {
          setResendError('There\'s an error on your request.');
          setResponseSuccess(false);
          console.log(err);
        })
    } else {
      setResendError('Please input your registered email.');
      setResponseSuccess(false);
    }
  }

  return (
    <>
      <Header />
      <div className="resend-verification">
        <div className="resend-verification-container max808-container">
          <h1>Get Password Reset Link</h1>
          <div className="input-email">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Input your email here" />
            <button onClick={handleResend}>SUBMIT</button>
          </div>
          {
            resendError !== '' ?
              <p className={`resend-response ${responseSuccess ? 'success' : 'error'}`}>{resendError}</p>
              : null
          }
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SendPasswordReset;