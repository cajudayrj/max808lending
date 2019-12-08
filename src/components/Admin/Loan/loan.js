import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import serverUrl from '../../../serverUrl';
import NotFound from './notFound';

const Loan = ({ match }) => {
  const userData = JSON.parse(window.localStorage.getItem('userData'));

  const [hasResult, setHasResult] = useState(true);
  const [loanResult, setLoanResult] = useState({});

  useEffect(() => {
    axios(`${serverUrl}/loans/find/${match.params.id}`, {
      method: "GET",
      headers: {
        "auth_token": userData.authToken
      }
    })
      .then(result => {
        const res = result.data.loanData;
        if (res.length === 0) {
          setHasResult(false);
          return;
        }
        console.log(res[0]);
        setLoanResult(res[0]);
      })
  }, [match.params.id, userData.authToken]);

  if (!hasResult) return <NotFound />;

  const monify = (amount) => {
    return amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  return (
    <>
      <div className="loan d-grid">
        <div className="loan__info-summary">
          <div className="cash-loan-details">
            <p>Loan Application Details</p>
          </div>
          <div className="summary">
            <div className="info">
              <p className="label">Loan ID:</p>
              <p className="value">{loanResult.id}</p>
            </div>
            <div className="info">
              <p className="label">Loan Amount:</p>
              <p className="value">&#8369;{monify(parseInt(loanResult.amount))}</p>
            </div>
            <div className="info">
              <p className="label">Loan Terms:</p>
              <p className="value">{loanResult.terms} days</p>
            </div>
            <div className="info">
              <p className="label">Loan Request Date:</p>
              <p className="value">{moment(loanResult.loanDate).format('MMMM DD, YYYY')}</p>
            </div>
            <div className="info">
              <p className="label">Loan Effectivity Date:</p>
              <p className="value">{loanResult.dueDate ? moment(loanResult.acceptedDate).format('MMMM DD, YYYY') : '-'}</p>
            </div>
            <div className="info">
              <p className="label">Loan Due Date:</p>
              <p className="value">{loanResult.dueDate ? moment(loanResult.dueDate).format('MMMM DD, YYYY') : '-'}</p>
            </div>
            <div className="info">
              <p className="label">Loan Status:</p>
              <p className="value">{loanResult.loanStatus}</p>
            </div>
            <div className="info">
              <p className="label">Borrower's Name:</p>
              <p className="value">{loanResult.firstName} {loanResult.lastName}</p>
            </div>
            <div className="info">
              <p className="label">Home  Address:</p>
              <p className="value">{loanResult.address}, {loanResult.town}, {loanResult.cityProvince}</p>
            </div>
            <div className="info">
              <p className="label">Email:</p>
              <p className="value">{loanResult.email}</p>
            </div>
            <div className="info">
              <p className="label">Mobile Number:</p>
              <p className="value">{loanResult.mobileNum}</p>
            </div>
          </div>
          {
            loanResult.loanStatus === 'Pending' ?
              <>
                <div className="computation">
                  <p className="computation-label">Computation</p>
                  <div className="computation-container">
                    <div className="computations">
                      <p className="label">Principal:</p>
                      <p className="value">{monify(parseInt(loanResult.amount))}</p>
                    </div>
                    <div className="computations">
                      <p className="label">Finance Charge &#40; {loanResult.financeCharge}% &#41;:</p>
                      <p className="value">&#40;{monify(parseInt(loanResult.amount * (loanResult.financeCharge / 100)))}&#41;</p>
                    </div>
                    <div className="computations">
                      <p className="label">Processing Fee &#40; 2% &#41;:</p>
                      <p className="value">&#40;{monify(parseInt(loanResult.amount * (2 / 100)))}&#41;</p>
                    </div>
                    <div className="computations">
                      <p className="label">Service Fee &#40; {loanResult.serviceFee}% &#41;:</p>
                      <p className="value">&#40;{monify(parseInt(loanResult.amount * (loanResult.serviceFee / 100)))}&#41;</p>
                    </div>
                    <div className="computations loan-proceeds">
                      <p className="label">Loan Proceeds:</p>
                      <p className="value">&#8369;{
                        monify(
                          parseInt(
                            loanResult.amount
                            - (loanResult.amount * (2 / 100))
                            - (loanResult.amount * (loanResult.serviceFee / 100))
                            - (loanResult.amount * (loanResult.financeCharge / 100))
                          )
                        )
                      }</p>
                    </div>
                  </div>
                </div>
                <div className="approval-btns">
                  <button type="button" className="approve-btn">Approve</button>
                  <button type="button" className="reject-btn">Reject</button>
                </div>
              </>
              :
              <>
                <div className="computation approved">
                  <div className="computation-container">
                    <div className="computations">
                      <p className="label">Principal:</p>
                      <p className="value">&#8369;{monify(parseInt(loanResult.amount))}</p>
                    </div>
                    <div className="computations">
                      <p className="label">Loan Proceeds:</p>
                      <p className="value">&#8369;{
                        monify(
                          parseInt(
                            loanResult.amount
                            - (loanResult.amount * (2 / 100))
                            - (loanResult.amount * (loanResult.serviceFee / 100))
                            - (loanResult.amount * (loanResult.financeCharge / 100))
                          )
                        )
                      }</p>
                    </div>
                    <div className="computations">
                      <p className="label">Total Charges:</p>
                      <p className="value">&#8369;{
                        monify(
                          parseInt(
                            (loanResult.amount * (2 / 100))
                            + (loanResult.amount * (loanResult.serviceFee / 100))
                            + (loanResult.amount * (loanResult.financeCharge / 100))
                            + loanResult.penaltyCharge
                          )
                        )
                      }</p>
                    </div>
                    <div className="computations sub-comp">
                      <p className="label">Finance Charge &#40; {loanResult.financeCharge}% &#41;:</p>
                      <p className="value">{monify(parseInt(loanResult.amount * (loanResult.financeCharge / 100)))}</p>
                    </div>
                    <div className="computations sub-comp">
                      <p className="label">Processing Fee &#40; 2% &#41;:</p>
                      <p className="value">{monify(parseInt(loanResult.amount * (2 / 100)))}</p>
                    </div>
                    <div className="computations sub-comp">
                      <p className="label">Service Fee &#40; {loanResult.serviceFee}% &#41;:</p>
                      <p className="value">{monify(parseInt(loanResult.amount * (loanResult.serviceFee / 100)))}</p>
                    </div>
                    <div className="computations sub-comp">
                      <p className="label">Penalty:</p>
                      <p className="value">{monify(parseInt(loanResult.penaltyCharge))}</p>
                    </div>
                  </div>
                </div>
              </>
          }
        </div>
        <div className="loan__main-info">
          <h1>Other Details Here -- Payment, Borrower</h1>
        </div>
      </div>
      <div className="loan-approve-modal">

      </div>
    </>
  )
}

export default Loan;