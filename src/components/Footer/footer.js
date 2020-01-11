import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// svg
import { ReactComponent as Facebook } from '../../assets/svg/facebook.svg';
import { ReactComponent as Twitter } from '../../assets/svg/twitter.svg';
import { ReactComponent as Google } from '../../assets/svg/google-plus.svg';

// server
import serverUrl from '../../serverUrl';

const Footer = () => {

  const [fullName, setFullName] = useState('');
  const [contactNum, setContactNum] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [success, setSuccess] = useState(false);
  const [inputError, setInputError] = useState('');
  const [buttonLabel, setButtonLabel] = useState('SEND');
  const [sending, setSending] = useState(false);

  const handleFullName = (e) => {
    setFullName(e.target.value);
  }

  const handleContactNum = (e) => {
    setContactNum(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleMessage = (e) => {
    setMessage(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInputError('');
    setResponse('');
    setButtonLabel('SENDING...')
    setSending(true)

    const data = {
      fullName,
      contactNum,
      email,
      message,
    }

    await axios(`${serverUrl}/contact-us`, {
      method: 'POST',
      data,
    })
      .then(res => {
        const response = res.data;
        if (response.error) {
          const errorMessage = response.error.details ? response.error.details[0].message : 'Please check fields and try again.';
          setInputError(errorMessage);
        } else {
          const successRes = res.data.success;
          setSuccess(successRes);
          setResponse(res.data.message);

          if (successRes) {
            setFullName('');
            setContactNum('');
            setEmail('');
            setMessage('');
            setInputError('')
            setTimeout(() => { setResponse('') }, 10000)
          }
        }
        setButtonLabel('SEND');
        setSending(false)
      });
  }

  return (
    <footer className="footer">
      <div className="footer-container max808-container">
        <div className="contact-us-container">
          <p className="have-question">Have a question?</p>
          <p className="send-us-message">Send us a message!</p>
          <p className="we-are-here">We are here to answer any questions you may have. Reach out to us and our customer representative will attend to your query the soonest.</p>
          <div className="contact-form-container">
            <form className="contact-form">
              <input type="text" name="fullName" className="contact-inputs" value={fullName} placeholder="Full Name" onChange={handleFullName} />
              <input type="text" name="contactNum" className="contact-inputs" value={contactNum} placeholder="Contact Number" onChange={handleContactNum} />
              <input type="email" name="email" className="contact-inputs" value={email} placeholder="Email" onChange={handleEmail} />
              <textarea name="message" onChange={handleMessage} rows="6" className="contact-inputs" value={message} placeholder="Message"></textarea>
              <button type="submit" disabled={sending} className="contact-submit" onClick={handleSubmit}>{buttonLabel}</button>
            </form>
          </div>
          {
            response !== '' ?
              <div className={`response-message ${success ? '' : 'warning'}`}>
                <p>{response}</p>
              </div>
              :
              null
          }
          {
            inputError !== '' ?
              <div className='response-message error'>
                <p>{inputError}</p>
              </div>
              :
              null
          }
        </div>
        <div className="contact-info">
          <Link to="/"><img src={require('../../assets/images/max808logo-footer.png')} alt="max808logo-footer" className="logo-footer" /></Link>
          <p className="other-info-label">Email Address</p>
          <a href="mailto:contactus@max808lending.com" className="other-info-detail">contactus@max808lending.com</a>
          <a href="mailto:admin@max808lending.com" className="other-info-detail">admin@max808lending.com</a>
          <p className="other-info-label social-media-label">Social Media</p>
          <div className="social-media-svg">
            <a href="https://web.facebook.com/Max-808-Lending-Corp-103467941193071"><Facebook /></a>
            <a href="https://twitter.com/max808lending"><Twitter /></a>
            <a href="mailto:max808lending@gmail.com"><Google /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>ALL RIGHTS RESERVED. &copy; {new Date().getFullYear()} MAX808 LENDING CORPORATION.</p>
      </div>
    </footer>
  )
};

export default Footer;