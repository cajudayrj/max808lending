import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment-timezone';
import citiesData from '../../../assets/helpers/cities';
import serverUrl from '../../../serverUrl';
import handleRedirects from '../../../assets/helpers/handleRedirects';
import axios from 'axios';

const ActivateStepOne = () => {
  const history = useHistory();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [towns, setTowns] = useState([]);

  /**
   * USER INFO STATES
   */
  const [loanAmount, setLoanAmount] = useState('5000');
  const [loanTerms, setLoanTerms] = useState('15');

  const [fname, setFname] = useState('');
  const [mname, setMname] = useState('');
  const [lname, setLname] = useState('');

  const [birthday, setBirthday] = useState(moment().tz('Asia/Manila').format('YYYY-MM-DD'));
  const [gender, setGender] = useState('Male');
  const [maritalStatus, setMaritalStatus] = useState('Single');
  const [address, setAddress] = useState('');
  const [mobileNum, setMobileNum] = useState('');
  const [townMunicipality, setTownMunicipality] = useState(null);
  const [cityProvince, setCityProvince] = useState('Abra');

  const [resMessage, setResMessage] = useState('');

  useEffect(() => {
    handleRedirects(history);
    setTowns(citiesData['Abra']);
    setTownMunicipality(citiesData['Abra'][0]);
  }, []); // eslint-disable-line

  const handleLoanAmount = (e) => {
    setLoanAmount(e.target.value);
  }

  const handleLoanTerms = (e) => {
    setLoanTerms(e.target.value);
  }

  const handleFname = (e) => {
    setFname(e.target.value);
  }

  const handleMname = (e) => {
    setMname(e.target.value);
  }

  const handleLname = (e) => {
    setLname(e.target.value);
  }

  const handleAddress = (e) => {
    setAddress(e.target.value);
  }

  const handleCityProvince = (e) => {
    setCityProvince(e.target.value);
    setTowns(citiesData[e.target.value])
    setTownMunicipality(citiesData[e.target.value][0]);
  }

  const handleTownMunicipality = (e) => {
    setTownMunicipality(e.target.value);
  }

  const handleBirthday = (e) => {
    setBirthday(e.target.value);
  }

  const handleGender = (e) => {
    setGender(e.target.value);
  }

  const handleMaritalStatus = (e) => {
    setMaritalStatus(e.target.value);
  }

  const handleMobileNum = (e) => {
    setMobileNum(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      loanAmount,
      loanTerms,
      loanDate: moment(new Date()).tz('Asia/Manila').format('YYYY-MM-DD'),
      fname,
      mname,
      lname,
      birthday,
      gender,
      maritalStatus,
      mobileNum,
      address,
      townMunicipality,
      cityProvince,
    }

    axios(`${serverUrl}/account/activate/step-one`, {
      method: 'PUT',
      data,
      headers: {
        "Authorization": `Bearer ${userData.authToken}`
      }
    })
      .then(response => {
        const res = response.data;
        if (res.error) {
          setResMessage(res.error.details[0].message);
          return;
        }
        if (res.success) {
          setResMessage('');
          const newUserData = { ...userData };
          newUserData.userStatus = 'verified-step-one';
          window.localStorage.setItem('userData', JSON.stringify(newUserData));
          history.push('/activate-account/step-two')
        } else {
          setResMessage(res.message);
        }
      })
  }

  return (
    <div className="user-activate max808-container">
      <div className="steps-container user-activate-stepone-container">
        <h3 className="step-header">Step 1 - Loan and Borrower Information</h3>
        <div className="form-container form-loans d-grid">
          <p className="form-title">Loan</p>
          <div className="form-inputs form-loan-amount">
            <p className="input-label">Loan Amount</p>
            <input
              type="range"
              min="5000"
              max="200000"
              step="100"
              defaultValue={loanAmount}
              onChange={handleLoanAmount}
            />
            <p className="loan-label">&#x20b1;{loanAmount}</p>
          </div>
          <div className="form-inputs form-loan-terms">
            <p className="input-label">Loan Terms</p>
            <input
              type="range"
              min="15"
              max="180"
              step="15"
              defaultValue={loanTerms}
              onChange={handleLoanTerms}
            />
            <p className="loan-label">{loanTerms} Days</p>
          </div>
        </div>
        {
          /**
           * User Information
           */
        }
        <div className="form-container d-grid">
          <p className="form-title">Personal Information</p>
          <div className="form-inputs form-pi-fn">
            <p className="input-label">First Name</p>
            <input type="text" value={fname} onChange={handleFname} />
          </div>
          <div className="form-inputs form-pi-mn">
            <p className="input-label">Middle Name</p>
            <input type="text" value={mname} onChange={handleMname} />
          </div>
          <div className="form-inputs form-pi-ln">
            <p className="input-label">Last Name</p>
            <input type="text" value={lname} onChange={handleLname} />
          </div>
          <div className="form-inputs form-pi-dob">
            <p className="input-label">Date of Birth</p>
            <input
              type="date"
              max={moment().tz('Asia/Manila').format('YYYY-MM-DD')}
              defaultValue={birthday}
              onKeyDown={e => e.preventDefault()}
              onChange={handleBirthday}
            />
          </div>
          <div className="form-inputs form-pi-g">
            <p className="input-label">Gender</p>
            <select defaultValue={gender} onChange={handleGender}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form-inputs form-pi-ms">
            <p className="input-label">Marital Status</p>
            <select defaultValue={maritalStatus} onChange={handleMaritalStatus}>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Widowed">Widowed</option>
              <option value="Separated">Separated</option>
              <option value="Divorced">Divorced</option>
            </select>
          </div>
          <div className="form-inputs form-pi-mobn">
            <p className="input-label">Mobile Number</p>
            <input type="text" value={mobileNum} onChange={handleMobileNum} />
          </div>
          <div className="form-inputs form-pi-add">
            <p className="input-label">Address</p>
            <input type="text" value={address} onChange={handleAddress} />
          </div>
          <div className="form-inputs form-pi-tm">
            <p className="input-label">City / Municipality</p>
            <select defaultValue={townMunicipality} onChange={handleTownMunicipality}>
              {
                towns.map((town, i) => <option key={i} value={town}>{town}</option>)
              }
            </select>
          </div>
          <div className="form-inputs form-pi-cp">
            <p className="input-label">State / Province</p>
            <select defaultValue={cityProvince} onChange={handleCityProvince}>
              {
                Object.keys(citiesData).map((city, i) => <option key={i} value={city}>{city}</option>)
              }
            </select>
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
    </div >
  )
}

export default ActivateStepOne;