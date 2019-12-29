import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import serverUrl from '../../../serverUrl';
import handleRedirects from '../../../assets/helpers/handleRedirects';

const ActivateStepThree = () => {
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const history = useHistory();

  const [validIdOne, setValidIdOne] = useState(null);
  const [validIdOnePreview, setValidIdOnePreview] = useState(null);

  const [validIdTwo, setValidIdTwo] = useState(null);
  const [validIdTwoPreview, setValidIdTwoPreview] = useState(null);

  const [payslipOne, setPayslipOne] = useState(null);
  const [payslipOnePreview, setPayslipOnePreview] = useState(null);

  const [payslipTwo, setPayslipTwo] = useState(null);
  const [payslipTwoPreview, setPayslipTwoPreview] = useState(null);

  const [coe, setCoe] = useState(null);
  const [coePreview, setCoePreview] = useState(null);

  const [billingStatement, setBillingStatement] = useState(null);
  const [billingStatementPreview, setBillingStatementPreview] = useState(null);

  const [bankTransaction, setBankTransaction] = useState(null);
  const [bankTransactionPreview, setBankTransactionPreview] = useState(null);

  const [message, setMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState('Submit Documents');

  useEffect(() => {
    handleRedirects(history);
  }, []); // eslint-disable-line

  const handleDocumentSubmit = (e) => {
    setMessage('');
    e.preventDefault();
    if (
      !payslipOne ||
      !payslipTwo ||
      !validIdOne ||
      !validIdTwo ||
      !coe ||
      !bankTransaction ||
      !billingStatement
    ) {
      setMessage('Fill up all required documents.')
      return;
    };

    const userDocuments = new FormData();
    userDocuments.append('payslipOne', payslipOne);
    userDocuments.append('payslipTwo', payslipTwo);
    userDocuments.append('validIdOne', validIdOne);
    userDocuments.append('validIdTwo', validIdTwo);
    userDocuments.append('coe', coe);
    userDocuments.append('billingStatement', billingStatement);
    userDocuments.append('bankTransaction', bankTransaction);
    setSubmitStatus('Submitting');

    axios(`${serverUrl}/documents`, {
      method: 'POST',
      data: userDocuments,
      headers: {
        "Authorization": `Bearer ${userData.authToken}`
      }
    })
      .then(response => {
        const res = response.data;
        if (res.success) {
          const newUserData = { ...userData };
          newUserData.userStatus = 'verified-step-three';
          window.localStorage.setItem('userData', JSON.stringify(newUserData));
          history.push('/activate-account/step-four');
        } else {
          setMessage(res.error.message)
          setSubmitStatus('Submit Documents');
        }
      })
      .catch(err => {
        console.log('upload error', err);
        setMessage("There's an error uploading files. Please refresh page.")
        setSubmitStatus('Submit Documents');
      })
  }

  const handlePayslipOne = (e) => {
    if (e.target.files.length > 0 && (e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/png')) {
      setPayslipOne(e.target.files[0]);
      setPayslipOnePreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setPayslipOne(null);
      setPayslipOnePreview(null);
    }
  }

  const removePayslipOne = () => {
    setPayslipOne(null);
    setPayslipOnePreview(null);
  }

  const handlePayslipTwo = (e) => {
    if (e.target.files.length > 0 && (e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/png')) {
      setPayslipTwo(e.target.files[0]);
      setPayslipTwoPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setPayslipTwo(null);
      setPayslipTwoPreview(null);
    }
  }

  const removePayslipTwo = () => {
    setPayslipTwo(null);
    setPayslipTwoPreview(null);
  }

  const handleValidIdOne = (e) => {
    if (e.target.files.length > 0 && (e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/png')) {
      setValidIdOne(e.target.files[0]);
      setValidIdOnePreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setValidIdOne(null);
      setValidIdOnePreview(null);
    }
  }

  const removeValidIdOne = () => {
    setValidIdOne(null);
    setValidIdOnePreview(null);
  }

  const handleValidIdTwo = (e) => {
    if (e.target.files.length > 0 && (e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/png')) {
      setValidIdTwo(e.target.files[0]);
      setValidIdTwoPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setValidIdTwo(null);
      setValidIdTwoPreview(null);
    }
  }

  const removeValidIdTwo = () => {
    setValidIdTwo(null);
    setValidIdTwoPreview(null);
  }

  const handleCoe = (e) => {
    if (e.target.files.length > 0 && (e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/png')) {
      setCoe(e.target.files[0]);
      setCoePreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setCoe(null);
      setCoePreview(null);
    }
  }

  const removeCoe = () => {
    setCoe(null);
    setCoePreview(null);
  }

  const handleBillingStatement = (e) => {
    if (e.target.files.length > 0 && (e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/png')) {
      setBillingStatement(e.target.files[0]);
      setBillingStatementPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setBillingStatement(null);
      setBillingStatementPreview(null);
    }
  }

  const removeBillingStatement = () => {
    setBillingStatement(null);
    setBillingStatementPreview(null);
  }

  const handleBankTransaction = (e) => {
    if (e.target.files.length > 0 && (e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/png')) {
      setBankTransaction(e.target.files[0]);
      setBankTransactionPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setBankTransaction(null);
      setBankTransactionPreview(null);
    }
  }

  const removeBankTransaction = () => {
    setBankTransaction(null);
    setBankTransactionPreview(null);
  }

  return (
    <div className="user-activate max808-container">
      <div className="steps-container user-activate-steptwo-container">
        <h3 className="step-header">Step 3 - Document Uploads</h3>
        <p className="file-formats">**Accepted file formats are .jpg or .png only.</p>
        {
          /**
           * Valid IDs
           */
        }
        <div className="form-container d-grid">
          <p className="form-title">Valid ID's</p>
          <div className="form-payslip form-payslip-1">
            <p className="input-label">Valid ID 1</p>
            <div className="input-layout-container">
              <label htmlFor="validIdOne">
                <div className="file-name">
                  <p>{validIdOne ? validIdOne.name : 'No chosen image'}</p>
                </div>
                <button>Choose File</button>
              </label>
              <input type="file" id="validIdOne" onChange={handleValidIdOne} />
              {
                validIdOnePreview ?
                  <div className="image-preview">
                    <button className="removeImg" type="button" onClick={removeValidIdOne}>&times;</button>
                    <img src={validIdOnePreview} alt="validIdOne-preview" />
                  </div>
                  :
                  null
              }
            </div>
          </div>
          <div className="form-payslip form-payslip-2">
            <p className="input-label">Valid ID 2</p>
            <div className="input-layout-container">
              <label htmlFor="validIdTwo">
                <div className="file-name">
                  <p>{validIdTwo ? validIdTwo.name : 'No chosen image'}</p>
                </div>
                <button>Choose File</button>
              </label>
              <input type="file" id="validIdTwo" onChange={handleValidIdTwo} />
              {
                validIdTwoPreview ?
                  <div className="image-preview">
                    <button className="removeImg" type="button" onClick={removeValidIdTwo}>&times;</button>
                    <img src={validIdTwoPreview} alt="validIdtwo-preview" />
                  </div>
                  :
                  null
              }
            </div>
          </div>
        </div>
        {
          /**
           * Payslips
           */
        }
        <div className="form-container d-grid">
          <p className="form-title">Payslips</p>
          <div className="form-payslip form-payslip-1">
            <p className="input-label">Payslip 1</p>
            <div className="input-layout-container">
              <label htmlFor="payslipOne">
                <div className="file-name">
                  <p>{payslipOne ? payslipOne.name : 'No chosen image'}</p>
                </div>
                <button>Choose File</button>
              </label>
              <input type="file" id="payslipOne" onChange={handlePayslipOne} />
              {
                payslipOnePreview ?
                  <div className="image-preview">
                    <button className="removeImg" type="button" onClick={removePayslipOne}>&times;</button>
                    <img src={payslipOnePreview} alt="payslipone-preview" />
                  </div>
                  :
                  null
              }
            </div>
          </div>
          <div className="form-payslip form-payslip-2">
            <p className="input-label">Payslip 2</p>
            <div className="input-layout-container">
              <label htmlFor="payslipTwo">
                <div className="file-name">
                  <p>{payslipTwo ? payslipTwo.name : 'No chosen image'}</p>
                </div>
                <button>Choose File</button>
              </label>
              <input type="file" id="payslipTwo" onChange={handlePayslipTwo} />
              {
                payslipTwoPreview ?
                  <div className="image-preview">
                    <button className="removeImg" type="button" onClick={removePayslipTwo}>&times;</button>
                    <img src={payslipTwoPreview} alt="paysliptwo-preview" />
                  </div>
                  :
                  null
              }
            </div>
          </div>
        </div>
        {
          /**
           * COE & Billing Statement
           */
        }
        <div className="form-container d-grid">
          <p className="form-title">COE and Billing Statement</p>
          <div className="form-payslip form-payslip-1">
            <p className="input-label">COE</p>
            <div className="input-layout-container">
              <label htmlFor="coe">
                <div className="file-name">
                  <p>{coe ? coe.name : 'No chosen image'}</p>
                </div>
                <button>Choose File</button>
              </label>
              <input type="file" id="coe" onChange={handleCoe} />
              {
                coePreview ?
                  <div className="image-preview">
                    <button className="removeImg" type="button" onClick={removeCoe}>&times;</button>
                    <img src={coePreview} alt="coe-preview" />
                  </div>
                  :
                  null
              }
            </div>
          </div>
          <div className="form-payslip form-payslip-2">
            <p className="input-label">Billing Statement</p>
            <div className="input-layout-container">
              <label htmlFor="billingStatement">
                <div className="file-name">
                  <p>{billingStatement ? billingStatement.name : 'No chosen image'}</p>
                </div>
                <button>Choose File</button>
              </label>
              <input type="file" id="billingStatement" onChange={handleBillingStatement} />
              {
                billingStatementPreview ?
                  <div className="image-preview">
                    <button className="removeImg" type="button" onClick={removeBillingStatement}>&times;</button>
                    <img src={billingStatementPreview} alt="billingStatement-preview" />
                  </div>
                  :
                  null
              }
            </div>
          </div>
        </div>
        {
          /**
           * Bank Transaction
           */
        }
        <div className="form-container d-grid">
          <p className="form-title">Bank Transaction</p>
          <div className="form-payslip form-payslip-1">
            <p className="input-label">Bank Transaction</p>
            <div className="input-layout-container">
              <label htmlFor="bankTransaction">
                <div className="file-name">
                  <p>{bankTransaction ? bankTransaction.name : 'No chosen image'}</p>
                </div>
                <button>Choose File</button>
              </label>
              <input type="file" id="bankTransaction" onChange={handleBankTransaction} />
              {
                bankTransactionPreview ?
                  <div className="image-preview">
                    <button className="removeImg" type="button" onClick={removeBankTransaction}>&times;</button>
                    <img src={bankTransactionPreview} alt="bankTransaction-preview" />
                  </div>
                  :
                  null
              }
            </div>
          </div>
        </div>
        <div className="submit-documents">
          <button type="button" onClick={handleDocumentSubmit} className="submit-documents-btn">{submitStatus}</button>
        </div>
        {
          message !== '' ?
            <div className={`response-message error`}>
              <p>{message}</p>
            </div>
            :
            null
        }
      </div>
    </div>
  );
}

export default ActivateStepThree;