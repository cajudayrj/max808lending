import React, { useState, useEffect } from 'react';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import axios from 'axios';
import serverUrl from '../../serverUrl';

const ResetPassword = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resendError, setResendError] = useState('');
  const [responseSuccess, setResponseSuccess] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const passwordToken = props.match.params.passwordToken;
    axios(`${serverUrl}/account/verify-reset`, {
      method: "POST",
      data: {
        resetToken: passwordToken
      }
    })
      .then(res => {
        const { success, caseType } = res.data;
        if (!success) {
          if (caseType === 'expired') {
            setIsExpired(true)
          } else {
            setIsInvalid(true)
          }
        }
        setIsLoading(false);
      })
      .catch(err => {
        setResendError('There\'s an error on your request. Please try again / refresh page.')
      })
  }, []); //eslint-disable-line

  const handleResend = e => {
    e.preventDefault();
    setResendError('');
    setResponseSuccess(false);

    if (
      email.length > 0 && password !== '' && confirmPassword !== '' && password === confirmPassword
    ) {
      axios(`${serverUrl}/account/reset-password`, {
        method: "POST",
        data: {
          email,
          password,
          confirmPassword,
          token: props.match.params.passwordToken
        }
      })
        .then(res => {
          setResendError(res.data.message)
          setResponseSuccess(res.data.success)
          if (res.data.success) {
            setPassword('');
            setConfirmPassword('');
          }
        })
        .catch(err => {
          setResendError('There\'s an error on your request.');
          setResponseSuccess(false);
        })
    } else {
      setResendError('There\'s an error on your input fields. Please try again');
      setResponseSuccess(false);
    }
  }

  return (
    <>
      <Header />
      <div className="resend-verification">
        <div className="resend-verification-container max808-container">
          {
            isLoading ?
              <h1>Loading</h1>
              :
              isInvalid ?
                <h1>Invalid password reset link.</h1>
                :
                isExpired ?
                  <h1>Password reset link expired.</h1>
                  :
                  (
                    <>
                      <h1>Reset Password</h1>
                      <div className="input-email">
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="New Password" />
                        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
                        <button onClick={handleResend}>SUBMIT</button>
                      </div>
                      {
                        resendError !== '' ?
                          <p className={`resend-response ${responseSuccess ? 'success' : 'error'}`}>{resendError}</p>
                          : null
                      }
                    </>
                  )
          }
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ResetPassword;