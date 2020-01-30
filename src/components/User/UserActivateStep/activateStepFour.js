import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import handleRedirects from '../../../assets/helpers/handleRedirects';
import axios from 'axios';
import serverUrl from '../../../serverUrl';

const ActivateStepFour = () => {
  const history = useHistory();
  const userData = JSON.parse(localStorage.getItem('userData'));

  /**
   * USER REFERENCE STATES
   */
  const [officemateName, setOfficemateName] = useState('');
  const [officemateDepartment, setOfficemateDepartment] = useState('');
  const [officematePosition, setOfficematePosition] = useState('');
  const [officemateMobileNum, setOfficemateMobileNum] = useState('');
  const [officemateEmail, setOfficemateEmail] = useState('');
  const [friendName, setFriendName] = useState('');
  const [friendMobileNum, setFriendMobileNum] = useState('');
  const [friendEmail, setFriendEmail] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [familyMobileNum, setFamilyMobileNum] = useState('');
  const [familyEmail, setFamilyEmail] = useState('');

  const [resMessage, setResMessage] = useState('');

  useEffect(() => {
    handleRedirects(history);
  }, []); // eslint-disable-line

  const handleSubmit = e => {
    e.preventDefault();
    setResMessage('');

    const data = {
      officemateName,
      officemateDepartment,
      officematePosition,
      officemateMobileNum,
      officemateEmail,
      friendName,
      friendMobileNum,
      friendEmail,
      familyName,
      familyMobileNum,
      familyEmail,
    }

    axios(`${serverUrl}/account/activate/step-four`, {
      method: 'POST',
      data,
      headers: {
        "Authorization": `Bearer ${userData.authToken}`
      }
    })
      .then(response => {
        const { data } = response;
        if (data.success) {
          setResMessage('');
          const newUserData = { ...userData };
          newUserData.userStatus = 'active';
          window.localStorage.setItem('userData', JSON.stringify(newUserData));
          history.push('/dashboard')
        } else {
          setResMessage(data.message);
        }
        if (data.error) {
          setResMessage(data.error.details[0].message);
          return;
        }
      })
      .catch(err => setResMessage('There\'s an error in submitting your data. Please try again.'))
  }

  return (
    <div className="user-activate max808-container">
      <div className="steps-container user-activate-stepone-container">
        <h3 className="step-header">Step 4 - User References</h3>
        {
          /**
           * OFFICEMATE REFERENCES
           */
        }
        <div className="form-container d-grid">
          <p className="form-title">Officemate Reference</p>
          <div className="form-inputs form-pi-ofcmname">
            <p className="input-label">Officemate Name</p>
            <input type="text" value={officemateName} onChange={e => setOfficemateName(e.target.value)} />
          </div>
          <div className="form-inputs form-pi-ofcmdept">
            <p className="input-label">Officemate Department</p>
            <input type="text" value={officemateDepartment} onChange={e => setOfficemateDepartment(e.target.value)} />
          </div>
          <div className="form-inputs form-pi-ofcmpos">
            <p className="input-label">Officemate Position</p>
            <input type="text" value={officematePosition} onChange={e => setOfficematePosition(e.target.value)} />
          </div>
          <div className="form-inputs form-pi-ofcmemail">
            <p className="input-label">Officemate Email</p>
            <input type="email" value={officemateEmail} onChange={e => setOfficemateEmail(e.target.value)} />
          </div>
          <div className="form-inputs form-pi-ofcmmobnum">
            <p className="input-label">Officemate Mobile Number</p>
            <input type="text" value={officemateMobileNum} onChange={e => setOfficemateMobileNum(e.target.value)} />
          </div>
        </div>
        {
          /**
           *  FRIEND REFERENCE
           */
        }
        <div className="form-container d-grid">
          <p className="form-title">Friend Reference</p>
          <div className="form-inputs form-pi-ofcmname">
            <p className="input-label">Friend Name</p>
            <input type="text" value={friendName} onChange={e => setFriendName(e.target.value)} />
          </div>
          <div className="form-inputs form-pi-ofcmdept">
            <p className="input-label">Friend Mobile Number</p>
            <input type="text" value={friendMobileNum} onChange={e => setFriendMobileNum(e.target.value)} />
          </div>
          <div className="form-inputs form-pi-ofcmpos">
            <p className="input-label">Friend Email</p>
            <input type="email" value={friendEmail} onChange={e => setFriendEmail(e.target.value)} />
          </div>
        </div>
        {
          /**
           *  FAMILY REFERENCE
           */
        }
        <div className="form-container d-grid">
          <p className="form-title">Family Reference</p>
          <div className="form-inputs form-pi-ofcmname">
            <p className="input-label">Family Name</p>
            <input type="text" value={familyName} onChange={e => setFamilyName(e.target.value)} />
          </div>
          <div className="form-inputs form-pi-ofcmdept">
            <p className="input-label">Family Mobile Number</p>
            <input type="text" value={familyMobileNum} onChange={e => setFamilyMobileNum(e.target.value)} />
          </div>
          <div className="form-inputs form-pi-ofcmpos">
            <p className="input-label">Family Email</p>
            <input type="email" value={familyEmail} onChange={e => setFamilyEmail(e.target.value)} />
          </div>
        </div>
        <button className="submit-btn" type="button" onClick={handleSubmit}>Submit</button>
        {
          resMessage !== '' ?
            <div className="response-message warning">
              {resMessage}
            </div>
            :
            null
        }
      </div>
    </div>
  )
}

export default ActivateStepFour;