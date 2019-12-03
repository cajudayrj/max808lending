import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../Header/header';
import Footer from '../Footer/footer';

import serverUrl from '../../serverUrl';

import axios from 'axios';

const Borrow = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [button, setButton] = useState('Submit');
  const [success, setSuccess] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleUsername = (e) => {
    setUsername(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  }

  const handleRegister = (e) => {
    e.preventDefault();
    setButton('Submitting...')
    const data = {
      email,
      username,
      password,
      confirmPassword,
    }

    axios(`${serverUrl}/account/register`, {
      method: 'POST',
      data,
    })
      .then(res => {
        const { data } = res;
        setMessage('');
        setButton('Submit');
        if (data.error) {
          setMessage(data.error.details[0].message);
          setSuccess(false);
        }
        if (data.success) {
          setSuccess(true);
          setEmail('');
          setUsername('');
          setPassword('');
          setConfirmPassword('');
          setMessage(data.message);
        }
      });
  }

  return (
    <>
      <Header />
      <div className="borrow">
        <div className="borrow-container max808-container">
          <div className="borrow-container-content">
            <div className="borrow-content">
              <div className="borrow-form-container d-grid">
                <div className="borrow-form">
                  <p className="form-headline">Register</p>
                  <form className="form" onSubmit={handleRegister}>
                    <input type="email" placeholder="Email Address" value={email} onChange={handleEmail} />
                    <input type="text" placeholder="Username" value={username} onChange={handleUsername} />
                    <input type="password" placeholder="Password" value={password} onChange={handlePassword} />
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPassword} />
                    <button type="submit" className="borrow-btn" onClick={handleRegister}>{button}</button>
                    <p className="already-borrower">Already a borrower? <Link to="/login">Login here.</Link></p>
                    {
                      message !== '' ?
                        <div className={`response-message ${!success ? 'warning' : ''}`}>
                          <p>{message}</p>
                        </div>
                        :
                        null
                    }
                  </form>
                </div>
                <div className="borrow-information">
                  <p className="borrow-headline">Max808 Lending</p>
                  <p className="borrow-tagline">Personal Loans made easy.</p>
                  <ul className="borrow-benefits">
                    <li>Online application</li>
                    <li>Borrow from P5,000 up to P200,000</li>
                    <li>Low interest rate</li>
                    <li>Fast approval</li>
                    <li>100% Secure and Confidential</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Borrow;