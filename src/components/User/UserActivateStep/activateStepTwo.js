import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import serverUrl from '../../../serverUrl';
import handleRedirects from '../../../assets/helpers/handleRedirects';

const ActivateStepTwo = () => {
  const history = useHistory();
  const userData = JSON.parse(localStorage.getItem('userData'));

  /**
   * OTHER INFO STATES
   */
  const [company, setCompany] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyTelNo, setCompanyTelNo] = useState('');
  const [position, setPosition] = useState('');
  const [dop, setDop] = useState(1);
  const [dopTwo, setDopTwo] = useState(0);
  const [payrollAcc, setPayrollAcc] = useState('');
  const [bankCheckAcc, setBankCheckAcc] = useState('');
  const [existingLoans, setExistingLoans] = useState('');
  const [fbLink, setFbLink] = useState('');

  const [resMessage, setResMessage] = useState('');

  const dopDates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

  useEffect(() => {
    handleRedirects(history);
  }, []); // eslint-disable-line

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      company,
      companyAddress,
      companyTelNo,
      position,
      dop,
      dopTwo,
      payrollAcc,
      bankCheckAcc,
      existingLoans,
      fbLink,
    }

    setResMessage('');

    axios(`${serverUrl}/account/activate/step-two`, {
      method: 'POST',
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
          const newUserData = { ...userData };
          newUserData.userStatus = 'verified-step-two';
          window.localStorage.setItem('userData', JSON.stringify(newUserData));
          history.push('/activate-account/step-three')
        } else {
          setResMessage(res.message);
        }
      })
  }

  return (
    <div className="user-activate max808-container">
      <div className="steps-container user-activate-stepone-container">
        <h3 className="step-header">Step 2 - Other Information</h3>{
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
            <select defaultValue={dop} onChange={e => setDop(e.target.value)}>
              {
                dopDates.map(d => <option key={d} value={d}>{d}</option>)
              }
            </select>
          </div>
          <div className="form-inputs form-pi-dop-2">
            <p className="input-label">Date of Payout 2</p>
            <select defaultValue={dopTwo} onChange={e => setDopTwo(e.target.value)}>
              <option value="0">N/A</option>
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
          <div className="form-inputs form-pi-fbacc">
            <p className="input-label">Facebook Account Link</p>
            <input type="text" value={fbLink} onChange={e => setFbLink(e.target.value)} />
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

export default ActivateStepTwo;