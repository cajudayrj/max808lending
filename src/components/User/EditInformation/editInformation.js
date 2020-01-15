import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import handleRedirects from '../../../assets/helpers/handleRedirects';
import citiesData from '../../../assets/helpers/cities';
import serverUrl from '../../../serverUrl';
import moment from 'moment-timezone';

const EditInformation = () => {
  const history = useHistory();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [towns, setTowns] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * MAIN INFO STATES
   */

  const [maritalStatus, setMaritalStatus] = useState('Single');
  const [address, setAddress] = useState('');
  const [mobileNum, setMobileNum] = useState('');
  const [townMunicipality, setTownMunicipality] = useState('Bangued');
  const [cityProvince, setCityProvince] = useState('Abra');

  /**
   * OTHER INFO STATES
   */
  const [userInformation, setUserInformation] = useState({});
  const [company, setCompany] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyTelNo, setCompanyTelNo] = useState('');
  const [position, setPosition] = useState('');
  const [dop, setDop] = useState(1);
  const [payrollAcc, setPayrollAcc] = useState('');
  const [bankCheckAcc, setBankCheckAcc] = useState('');
  const [existingLoans, setExistingLoans] = useState('');
  const [fbLink, setFbLink] = useState('');

  const [resMessage, setResMessage] = useState('');

  const dopDates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

  useEffect(() => {
    if (userData.userLevel === 2 && userData.userStatus !== 'active') {
      handleRedirects(history);
    }
    axios(`${serverUrl}/user/info/${userData.id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${userData.authToken}`
      }
    })
      .then(result => {
        const res = result.data;
        if (res.success) {
          const { user } = res;
          setUserInformation(user);
          setMaritalStatus(user.maritalStatus);
          setAddress(user.address);
          setMobileNum(user.mobileNum);
          setCityProvince(user.cityProvince);
          setTowns(citiesData[user.cityProvince]);
          setTownMunicipality(user.town);
          setFbLink(user.fbLink);
          setCompany(user.officeName);
          setCompanyAddress(user.officeAddress);
          setCompanyTelNo(user.officeTelephone);
          setPosition(user.officePosition);
          setDop(user.dateOfPayout);
          setPayrollAcc(user.officePayrollAccount);
          setBankCheckAcc(user.bankCheckingAccount)
          setExistingLoans(user.existingLoan);
          setLoading(false);
        } else {
          setUserInformation({});
          setLoading(false);
        }

        return;
      })
  }, []); // eslint-disable-line

  const handleCityProvince = (e) => {
    setCityProvince(e.target.value);
    setTowns(citiesData[e.target.value])
    setTownMunicipality(citiesData[e.target.value][0]);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      maritalStatus,
      address,
      mobileNum,
      townMunicipality,
      cityProvince,
      company,
      companyAddress,
      companyTelNo,
      position,
      dop,
      payrollAcc,
      bankCheckAcc,
      existingLoans,
      fbLink,
    }

    setResMessage('');

    axios(`${serverUrl}/user/update-info/${userData.id}`, {
      method: 'PUT',
      data,
      headers: {
        "Authorization": `Bearer ${userData.authToken}`
      }
    })
      .then(result => {
        const res = result.data;

        if (res.error) {
          setResMessage(res.error.details[0].message);
          return;
        }
        if (res.success) {
          setResMessage('');
          history.push('/dashboard/my-account')
        } else {
          setResMessage(res.message);
        }
      })
  }

  const resetData = (e) => {
    e.preventDefault();
    const user = userInformation;
    setMaritalStatus(user.maritalStatus);
    setAddress(user.address);
    setMobileNum(user.mobileNum);
    setCityProvince(user.cityProvince);
    setTowns(citiesData[user.cityProvince]);
    setTownMunicipality(user.town);
    setFbLink(user.fbLink);
    setCompany(user.officeName);
    setCompanyAddress(user.officeAddress);
    setCompanyTelNo(user.officeTelephone);
    setPosition(user.officePosition);
    setDop(user.dateOfPayout);
    setPayrollAcc(user.officePayrollAccount);
    setBankCheckAcc(user.bankCheckingAccount)
    setExistingLoans(user.existingLoan);
  }

  if (loading) return <h1 className="title-info loading">Loading...</h1>
  return (
    <div className="user-activate max808-container">
      <div className="steps-container user-activate-stepone-container edit-acc-details">
        <h3 className="step-header">Edit Information</h3>
        <div className="form-container m-top-40 d-grid">
          <p className="form-title">Main Information</p>
          <div className="form-inputs form-pi-fn">
            <p className="input-label">First Name</p>
            <input type="text" value={userInformation.firstName} readOnly />
          </div>
          <div className="form-inputs form-pi-mn">
            <p className="input-label">Middle Name</p>
            <input type="text" value={userInformation.middleName} readOnly />
          </div>
          <div className="form-inputs form-pi-ln">
            <p className="input-label">Last Name</p>
            <input type="text" value={userInformation.lastName} readOnly />
          </div>
          <div className="form-inputs form-pi-dob">
            <p className="input-label">Date of Birth</p>
            <input
              type="date"
              value={moment(userInformation.birthday).tz('Asia/Manila').format('YYYY-MM-DD')}
              readOnly
            />
          </div>
          <div className="form-inputs form-pi-g">
            <p className="input-label">Gender</p>
            <select defaultValue={userInformation.gender} readOnly>
              <option disabled value="Male">Male</option>
              <option disabled value="Female">Female</option>
            </select>
          </div>
          <div className="form-inputs form-pi-ms">
            <p className="input-label">Marital Status</p>
            <select value={maritalStatus} onChange={e => setMaritalStatus(e.target.value)}>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Widowed">Widowed</option>
              <option value="Separated">Separated</option>
              <option value="Divorced">Divorced</option>
            </select>
          </div>
          <div className="form-inputs form-pi-mobn">
            <p className="input-label">Mobile Number</p>
            <input type="text" value={mobileNum} onChange={e => setMobileNum(e.target.value)} />
          </div>
          <div className="form-inputs form-pi-add">
            <p className="input-label">Address</p>
            <input type="text" value={address} onChange={e => setAddress(e.target.value)} />
          </div>
          <div className="form-inputs form-pi-tm">
            <p className="input-label">City / Municipality</p>
            <select value={townMunicipality} onChange={e => setTownMunicipality(e.target.value)}>
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
          <div className="form-inputs form-pi-fbacc">
            <p className="input-label">Facebook Account Link</p>
            <input type="text" value={fbLink} onChange={e => setFbLink(e.target.value)} />
          </div>
        </div>
        {
          /**
           * OTHER INFORMATION
           */
        }
        <div className="form-container m-top-40 d-grid">
          <p className="form-title">Employer / Company Information</p>
          <div className="form-inputs form-pi-compn">
            <p className="input-label">Company Name</p>
            <input type="text" value={company} onChange={e => setCompany(e.target.value)} />
          </div>
          <div className="form-inputs form-pi-compadd">
            <p className="input-label">Company Address</p>
            <input type="text" value={companyAddress} onChange={e => setCompanyAddress(e.target.value)} />
          </div>
          <div className="form-inputs form-pi-comptel">
            <p className="input-label">Company Tel No.</p>
            <input type="text" value={companyTelNo} onChange={e => setCompanyTelNo(e.target.value)} />
          </div>
          <div className="form-inputs form-pi-pos">
            <p className="input-label">Position</p>
            <input type="text" value={position} onChange={e => setPosition(e.target.value)} />
          </div>
          <div className="form-inputs form-pi-dop">
            <p className="input-label">Date of Payout</p>
            <select value={dop} onChange={e => setDop(e.target.value)}>
              {
                dopDates.map(d => <option key={d} value={d}>{d}</option>)
              }
            </select>
          </div>
          <div className="form-inputs form-pi-pracc">
            <p className="input-label">Payroll Account Bank Name</p>
            <input type="text" value={payrollAcc} onChange={e => setPayrollAcc(e.target.value)} />
          </div>
          <div className="form-inputs form-pi-chacc">
            <p className="input-label">Checking Account Bank Name</p>
            <input type="text" value={bankCheckAcc} onChange={e => setBankCheckAcc(e.target.value)} />
          </div>
        </div>
        {
          /**
           *  EXISTING LOAN
           */
        }
        <div className="form-container m-top-40 d-grid">
          <p className="form-title">Do you have any other existing loans?</p>
          <div className="form-inputs form-pi-exstloan">
            <p className="input-label">If yes, please specify. (Company Name / Type of Loan / Amount / Balance)</p>
            <input type="text" value={existingLoans} onChange={e => setExistingLoans(e.target.value)} />
          </div>
        </div>
        <div className="buttons">
          <button type="button" onClick={resetData}>Reset</button>
          <button className="submit-btn" type="button" onClick={handleSubmit}>Update</button>
        </div>
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

export default EditInformation;