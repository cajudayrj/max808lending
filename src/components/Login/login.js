import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Header from '../Header/header';
import Footer from '../Footer/footer';

import serverUrl from '../../serverUrl';
import handleRedirects from '../../assets/helpers/handleRedirects';

import axios from 'axios';

const Login = () => {

  const history = useHistory();
  const userData = JSON.parse(window.localStorage.getItem('userData'));

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [button, setButton] = useState('Login');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (userData && userData.userLevel === 1) {
      history.push('/admin');
    }
    else if (userData && userData.userLevel === 2) {
      history.push('/dashboard');
    }
  }, []) // eslint-disable-line

  const handleUsername = (e) => {
    setUsername(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setButton('Logging in...')

    const data = {
      username,
      password
    }

    axios(`${serverUrl}/account/login`, {
      method: 'POST',
      data
    })
      .then(res => {
        const { data } = res;
        setButton('Login');
        if (data.error) {
          setMessage(data.error.details[0].message);
          setSuccess(false);
        }
        if (data.success) {
          setSuccess(true);
          setUsername('');
          setPassword('');
          setMessage(data.message);
          const authenticated = {
            id: data.userId,
            authToken: data.userAuth,
            userLevel: data.userLevel,
            userStatus: data.accountStatus,
          }
          window.localStorage.setItem('userData', JSON.stringify(authenticated));
          handleRedirects(history);
        }
      })
  }

  return (
    <>
      <Header />
      <div className="login">
        <div className="login-container max808-container">
          <div className="login-container-content">
            <div className="login-content">
              <div className="login-form-container d-grid">
                <div className="login-form">
                  <p className="form-headline">Login</p>
                  <form className="form" onSubmit={handleLogin}>
                    <input type="text" placeholder="Username" value={username} onChange={handleUsername} />
                    <input type="password" placeholder="Password" value={password} onChange={handlePassword} />
                    <button type="submit" className="login-btn" onClick={handleLogin}>{button}</button>
                    <p className="notyet-borrower">Not yet a borrower? <Link to="/borrow">Register here.</Link></p>
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
                <div className="login-information">
                  <p className="login-headline">Max808 Lending</p>
                  <p className="login-tagline">Personal Loans made easy.</p>
                  <ul className="login-benefits">
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

export default Login;