import React, { useState, useEffect } from 'react';
import axios from 'axios';
import serverUrl from '../../../serverUrl';
import moment from 'moment';

const MainDashboard = () => {
  const userData = JSON.parse(window.localStorage.getItem('userData'));

  const [loanId, setLoanId] = useState('');
  const [amount, setAmount] = useState(0);
  const [terms, setTerms] = useState(0);
  const [loanDate, setLoanDate] = useState('');
  const [approvedDate, setApprovedDate] = useState('');
  const [acceptedDate, setAcceptedDate] = useState('');
  const [durationDate, setDurationDate] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    axios(`${serverUrl}/loans/get-latest`, {
      method: "GET",
      headers: {
        "auth_token": userData.authToken
      }
    })
      .then(result => {
        console.log(result);
        const res = result.data[0];
        setLoanId(res.id);
        setAmount(res.amount);
        setTerms(res.terms);
        setLoanDate(moment(res.loanDate).format('MMMM D, YYYY'));
        setApprovedDate(res.approvedDate ? moment(res.approvedDate).format('MMMM D, YYYY') : '-');
        setAcceptedDate(res.acceptedDate ? moment(res.approvedDate).format('MMMM D, YYYY') : '-');
        setDurationDate(res.dueDate ? moment(res.dueDate).format('MMMM D, YYYY') : '-');
        setStatus(res.loanStatus);
      })
  }, [userData.authToken, userData.id]);

  const monify = (amount) => {
    return amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }
  return (
    <div className="main-dashboard dashboard-container">
      <p className="header-title">Loan Summary</p>
      <div className="main-loan-info">
        <div className="d-grid">
          <div className="loan-detail ln-id">
            <p className="labels">Loan ID:</p>
            <p className="values loan-id">{loanId}</p>
          </div>
          <div className="loan-detail ln-amt">
            <p className="labels">Amount:</p>
            <p className="values">&#8369;{monify(amount)}</p>
          </div>
          <div className="loan-detail ln-trms">
            <p className="labels">Terms:</p>
            <p className="values">{terms} <span>days</span></p>
          </div>
          <div className="loan-detail ln-ldate">
            <p className="labels">Loan Date:</p>
            <p className="values loan-id">{loanDate}</p>
          </div>
          <div className="loan-detail ln-adate">
            <p className="labels">Approved / Rejected Date:</p>
            <p className="values">{approvedDate}</p>
          </div>
          <div className="loan-detail ln-acdate">
            <p className="labels">Accepted / Refused Date:</p>
            <p className="values">{acceptedDate}</p>
          </div>
          <div className="loan-detail ln-ddate">
            <p className="labels">Duration Date:</p>
            <p className="values">{durationDate}</p>
          </div>
          <div className="loan-detail ln-status">
            <p className="labels">Status:</p>
            <p
              className={
                `
              values ${(status === 'Rejected') || (status === 'Refused')
                  ? 'declined'
                  : status === 'Active'
                    ? 'active'
                    : ''}
              `}>{status}</p>
          </div>
          {
            status !== 'Active' ?
              <div className={`loan-status-message ${((status === 'Refused') || (status === 'Rejected')) ? 'warning' : ''}`}>
                {
                  status === 'Pending' ?
                    <p>Your loan request is being reviewed for approval by Max808 Lending Corp.</p>
                    :
                    status === 'Approved' ?
                      <>
                        <p>Congratulations! Your loan request has been approved. Loan summary computation is listed above.
                        You can either accept or reject the terms set by Max808 Lending Corp.</p>
                      </>
                      :
                      status === 'Accepted' ?
                        <p>You have accepted the loan terms. We will process your request as soon as possible. Thank you for choosing Max808 Lending Corp.!</p>
                        :
                        status === 'Rejected' ?
                          <p>Sorry, your loan request has been rejected. You can try and apply for another loan.</p>
                          :
                          status === 'Refused' ?
                            <p>You have refused the terms set by Max808 Lending Corp . You can try and apply for another loan.</p>
                            : null
                }
              </div>
              :
              null
          }
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;