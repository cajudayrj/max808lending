import React, { useState, useEffect, useRef } from 'react';
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
  const [loanPayments, setLoanPayments] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [financeCharge, setFinanceCharge] = useState(0);
  const [penaltyCharge, setPenaltyCharge] = useState(0);
  const [loanProceeds, setLoanProceeds] = useState(0);
  const [loanPaid, setLoanPaid] = useState(0);
  const [loanBalance, setLoanBalance] = useState(0);

  const [refuseModal, setRefuseModal] = useState(false);
  const [acceptModal, setAcceptModal] = useState(false);
  const [newLoanModal, setNewLoanModal] = useState(false);

  // new loan states
  const [newLoanAmount, setNewLoanAmount] = useState(5000);
  const [newLoanTerms, setNewLoanTerms] = useState(15);

  const refuseRef = useRef(null);
  const acceptRef = useRef(null);
  const newLoanRef = useRef(null);

  useEffect(() => {
    axios(`${serverUrl}/loans/get-latest`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${userData.authToken}`,
      }
    })
      .then(result => {
        const res = result.data[0];
        setLoanId(res.id);
        setAmount(res.amount);
        setTerms(res.terms);
        setLoanDate(moment(res.loanDate).format('MMMM D, YYYY'));
        setApprovedDate(res.approvedDate ? moment(res.approvedDate).format('MMMM D, YYYY') : '-');
        setAcceptedDate(res.acceptedDate ? moment(res.acceptedDate).format('MMMM D, YYYY') : '-');
        setDurationDate(res.dueDate ? moment(res.dueDate).format('MMMM D, YYYY') : '-');
        setStatus(res.loanStatus);

        if ((res.loanStatus !== 'Pending') || (res.loanStatus !== 'Rejected')) {
          axios(`${serverUrl}/loans/loan-payments/${res.id}`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${userData.authToken}`,
            }
          })
            .then(result => {
              const payments = result.data[0];
              setLoanPayments(payments);
              setServiceFee(res.serviceFee);
              setFinanceCharge(res.financeCharge);
              setPenaltyCharge(res.penaltyCharge);
              setLoanProceeds(res.loanProceeds);
              setLoanPaid(res.loanPaid ? res.loanPaid : 0);
              setLoanBalance(res.loanBalance);
            })
        }
      })

  }, [userData.authToken]);

  const toggleRefuseModal = e => {
    e.preventDefault();
    setRefuseModal(!refuseModal);
    if (!refuseModal) {
      refuseRef.current.classList.add('opened');
      setTimeout(() => {
        refuseRef.current.classList.add('visible');
      }, 100)
    } else {
      refuseRef.current.classList.remove('visible');
      setTimeout(() => {
        refuseRef.current.classList.remove('opened');
      }, 300)
    }
  }

  const confirmRefuse = e => {
    toggleRefuseModal(e);
    setTimeout(() => {
      handleAcceptRefuse('Refused');
    }, 400)
  }

  const toggleAcceptModal = e => {
    e.preventDefault();
    setAcceptModal(!acceptModal);
    if (!acceptModal) {
      acceptRef.current.classList.add('opened');
      setTimeout(() => {
        acceptRef.current.classList.add('visible');
      }, 100)
    } else {
      acceptRef.current.classList.remove('visible');
      setTimeout(() => {
        acceptRef.current.classList.remove('opened');
      }, 300)
    }
  }

  const confirmAccept = e => {
    toggleAcceptModal(e);
    setTimeout(() => {
      handleAcceptRefuse('Accepted');
    }, 400)
  }

  const toggleNewLoanModal = e => {
    e.preventDefault();
    setNewLoanModal(!newLoanModal);
    if (!newLoanModal) {
      newLoanRef.current.classList.add('opened');
      setTimeout(() => {
        newLoanRef.current.classList.add('visible');
      }, 100)
    } else {
      newLoanRef.current.classList.remove('visible');
      setTimeout(() => {
        newLoanRef.current.classList.remove('opened');
      }, 300)
    }
  }

  const confirmNewLoan = e => {
    toggleNewLoanModal(e);
    setTimeout(() => {
      axios(`${serverUrl}/loans/apply-new`, {
        method: "POST",
        data: {
          amount: newLoanAmount,
          terms: newLoanTerms
        },
        headers: {
          "Authorization": `Bearer ${userData.authToken}`
        }
      })
        .then(result => {
          const res = result.data;

          if (res.success) {
            window.location.reload();
          } else {
            console.log(res.message);
          }
        })
    }, 400)
  }

  const handleAcceptRefuse = action => {
    axios(`${serverUrl}/loans/accept-refuse/${loanId}`, {
      method: "PUT",
      data: {
        loanAction: action
      },
      headers: {
        "Authorization": `Bearer ${userData.authToken}`,
      }
    })
      .then(result => {
        const res = result.data.loanData;
        setLoanId(res.id);
        setAmount(res.amount);
        setTerms(res.terms);
        setLoanDate(moment(res.loanDate).format('MMMM D, YYYY'));
        setApprovedDate(res.approvedDate ? moment(res.approvedDate).format('MMMM D, YYYY') : '-');
        setAcceptedDate(res.acceptedDate ? moment(res.acceptedDate).format('MMMM D, YYYY') : '-');
        setDurationDate(res.dueDate ? moment(res.dueDate).format('MMMM D, YYYY') : '-');
        setStatus(res.loanStatus);

        if ((res.loanStatus !== 'Pending') || (res.loanStatus !== 'Rejected')) {
          axios(`${serverUrl}/loans/loan-payments/${res.id}`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${userData.authToken}`,
            }
          })
            .then(result => {
              const payments = result.data[0];
              setLoanPayments(payments);
              setServiceFee(res.serviceFee);
              setFinanceCharge(res.financeCharge);
              setPenaltyCharge(res.penaltyCharge);
              setLoanProceeds(res.loanProceeds);
              setLoanPaid(res.loanPaid ? res.loanPaid : 0);
              setLoanBalance(res.loanBalance);
            })
        }
      })
  }

  const monify = (amount) => {
    if (amount) {
      return amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    } else {
      return '0.00';
    }
  }

  return (
    <>
      <div className="main-dashboard dashboard-container">

        <p className="header-title">Loan Summary</p>
        <div className="main-loan-info">
          <div className="d-grid">
            {
              status !== 'Active' ?
                <div className={`loan-status-message ${((status === 'Refused') || (status === 'Rejected')) ? 'warning' : ''}`}>
                  {
                    status === 'Pending' ?
                      <p>Your loan request is being reviewed for approval by Max808 Lending Corp.</p>
                      :
                      status === 'Approved' ?
                        <>
                          <p>Congratulations! Your loan request has been approved. Loan summary and computation is listed below.
                  You can either accept or refuse the terms set by Max808 Lending Corp.</p>
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
                              :
                              status === 'Fully Paid' ?
                                <p> Thank you! Your loan has been fully paid. You may now apply for another loan.</p>
                                : null
                  }
                </div>
                :
                null
            }
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
                    : (status === 'Active') || (status === 'Fully Paid')
                      ? 'active' : ''}
        `}>{status}</p>
            </div>
            {
              ((status === 'Approved') || (status === 'Accepted') || (status === 'Active') || (status === 'Fully Paid')) ?
                <>
                  <div className={`loan-computation ${(status === 'Active') || (status === 'Fully Paid') ? 'active' : ''}`}>
                    <div className="title-value">
                      <p className="title">Finance Charge &#40;{financeCharge}%&#41;: </p>
                      <p className="value">&#8369;{monify(amount * (financeCharge / 100))}</p>
                    </div>
                    <div className="title-value">
                      <p className="title">Processing Fee &#40;2%&#41;: </p>
                      <p className="value">&#8369;{monify(amount * (2 / 100))}</p>
                    </div>
                    <div className="title-value">
                      <p className="title">Service Fee &#40;{serviceFee}%&#41;: </p>
                      <p className="value">&#8369;{monify(amount * (serviceFee / 100))}</p>
                    </div>
                    <div className="title-value loan-proceeds">
                      <p className="title">Loan Proceeds / Receivable Amount: </p>
                      <p className="value">&#8369;{monify(loanProceeds)}</p>
                      {
                        (status === 'Active') || (status === 'Fully Paid') ?
                          <>
                            <p className="title">Penalty Charge: </p>
                            <p className="value">&#8369;{monify(penaltyCharge)}</p>
                            <p className="title">Total Charges: </p>
                            <p className="value">&#8369;{monify(amount + penaltyCharge)}</p>
                            <p className="title">Total Payment: </p>
                            <p className="value">&#8369;{monify(loanPaid)}</p>
                            <p className="title">Loan Balance: </p>
                            <p className="value">&#8369;{monify(loanBalance)}</p>
                          </>
                          : null
                      }
                    </div>

                  </div>
                  <div className="loans-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Payment</th>
                          <th>Amount</th>
                          <th>Deadline</th>
                          {
                            (status === 'Active') || (status === 'Fully Paid') ?
                              <>
                                <th>Penalty</th>
                                <th>Paid Amount</th>
                                <th>Balance</th>
                                <th>Status</th>
                              </>
                              : null
                          }
                        </tr>
                      </thead>
                      <tbody>
                        {
                          loanPayments.firstPaymentAmount !== 0 ?
                            <tr>
                              <td>1st Payment</td>
                              <td>&#8369;{monify(loanPayments.firstPaymentAmount)}</td>
                              <td>{moment(loanPayments.firstPaymentDate).format('MMMM DD, YYYY')}</td>
                              {
                                (status === 'Active') || (status === 'Fully Paid') ?
                                  <>
                                    <td>&#8369;{monify(loanPayments.firstPaymentPenalty)}</td>
                                    <td>&#8369;{monify(loanPayments.firstPaymentPaid)}</td>
                                    <td>&#8369;{monify(loanPayments.firstPaymentBalance)}</td>
                                    <td>{loanPayments.firstPaymentStatus}</td>
                                  </>
                                  : null
                              }
                            </tr>
                            : null
                        }
                        {
                          loanPayments.secondPaymentAmount !== 0 ?
                            <tr>
                              <td>2nd Payment</td>
                              <td>&#8369;{monify(loanPayments.secondPaymentAmount)}</td>
                              <td>{moment(loanPayments.secondPaymentDate).format('MMMM DD, YYYY')}</td>
                              {
                                (status === 'Active') || (status === 'Fully Paid') ?
                                  <>
                                    <td>&#8369;{monify(loanPayments.secondPaymentPenalty)}</td>
                                    <td>&#8369;{monify(loanPayments.secondPaymentPaid)}</td>
                                    <td>&#8369;{monify(loanPayments.secondPaymentBalance)}</td>
                                    <td>{loanPayments.secondPaymentStatus}</td>
                                  </>
                                  : null
                              }
                            </tr>
                            : null
                        }
                        {
                          loanPayments.thirdPaymentAmount !== 0 ?
                            <tr>
                              <td>3rd Payment</td>
                              <td>&#8369;{monify(loanPayments.thirdPaymentAmount)}</td>
                              <td>{moment(loanPayments.thirdPaymentDate).format('MMMM DD, YYYY')}</td>
                              {
                                (status === 'Active') || (status === 'Fully Paid') ?
                                  <>
                                    <td>&#8369;{monify(loanPayments.thirdPaymentPenalty)}</td>
                                    <td>&#8369;{monify(loanPayments.thirdPaymentPaid)}</td>
                                    <td>&#8369;{monify(loanPayments.thirdPaymentBalance)}</td>
                                    <td>{loanPayments.thirdPaymentStatus}</td>
                                  </>
                                  : null
                              }
                            </tr>
                            : null
                        }
                        {
                          loanPayments.fourthPaymentAmount !== 0 ?
                            <tr>
                              <td>4th Payment</td>
                              <td>&#8369;{monify(loanPayments.fourthPaymentAmount)}</td>
                              <td>{moment(loanPayments.fourthPaymentDate).format('MMMM DD, YYYY')}</td>
                              {
                                (status === 'Active') || (status === 'Fully Paid') ?
                                  <>
                                    <td>&#8369;{monify(loanPayments.fourthPaymentPenalty)}</td>
                                    <td>&#8369;{monify(loanPayments.fourthPaymentPaid)}</td>
                                    <td>&#8369;{monify(loanPayments.fourthPaymentBalance)}</td>
                                    <td>{loanPayments.fourthPaymentStatus}</td>
                                  </>
                                  : null
                              }
                            </tr>
                            : null
                        }
                        {
                          loanPayments.fifthPaymentAmount !== 0 ?
                            <tr>
                              <td>5th Payment</td>
                              <td>&#8369;{monify(loanPayments.fifthPaymentAmount)}</td>
                              <td>{moment(loanPayments.fifthPaymentDate).format('MMMM DD, YYYY')}</td>
                              {
                                (status === 'Active') || (status === 'Fully Paid') ?
                                  <>
                                    <td>&#8369;{monify(loanPayments.fifthPaymentPenalty)}</td>
                                    <td>&#8369;{monify(loanPayments.fifthPaymentPaid)}</td>
                                    <td>&#8369;{monify(loanPayments.fifthPaymentBalance)}</td>
                                    <td>{loanPayments.fifthPaymentStatus}</td>
                                  </>
                                  : null
                              }
                            </tr>
                            : null
                        }
                        {
                          loanPayments.sixthPaymentAmount !== 0 ?
                            <tr>
                              <td>6th Payment</td>
                              <td>&#8369;{monify(loanPayments.sixthPaymentAmount)}</td>
                              <td>{moment(loanPayments.sixthPaymentDate).format('MMMM DD, YYYY')}</td>
                              {
                                (status === 'Active') || (status === 'Fully Paid') ?
                                  <>
                                    <td>&#8369;{monify(loanPayments.sixthPaymentPenalty)}</td>
                                    <td>&#8369;{monify(loanPayments.sixthPaymentPaid)}</td>
                                    <td>&#8369;{monify(loanPayments.sixthPaymentBalance)}</td>
                                    <td>{loanPayments.sixthPaymentStatus}</td>
                                  </>
                                  : null
                              }
                            </tr>
                            : null
                        }
                        {
                          loanPayments.seventhPaymentAmount !== 0 ?
                            <tr>
                              <td>7th Payment</td>
                              <td>&#8369;{monify(loanPayments.seventhPaymentAmount)}</td>
                              <td>{moment(loanPayments.seventhPaymentDate).format('MMMM DD, YYYY')}</td>
                              {
                                (status === 'Active') || (status === 'Fully Paid') ?
                                  <>
                                    <td>&#8369;{monify(loanPayments.seventhPaymentPenalty)}</td>
                                    <td>&#8369;{monify(loanPayments.seventhPaymentPaid)}</td>
                                    <td>&#8369;{monify(loanPayments.seventhPaymentBalance)}</td>
                                    <td>{loanPayments.seventhPaymentStatus}</td>
                                  </>
                                  : null
                              }
                            </tr>
                            : null
                        }
                        {
                          loanPayments.eighthPaymentAmount !== 0 ?
                            <tr>
                              <td>8th Payment</td>
                              <td>&#8369;{monify(loanPayments.eighthPaymentAmount)}</td>
                              <td>{moment(loanPayments.eighthPaymentDate).format('MMMM DD, YYYY')}</td>
                              {
                                (status === 'Active') || (status === 'Fully Paid') ?
                                  <>
                                    <td>&#8369;{monify(loanPayments.eighthPaymentPenalty)}</td>
                                    <td>&#8369;{monify(loanPayments.eighthPaymentPaid)}</td>
                                    <td>&#8369;{monify(loanPayments.eighthPaymentBalance)}</td>
                                    <td>{loanPayments.eighthPaymentStatus}</td>
                                  </>
                                  : null
                              }
                            </tr>
                            : null
                        }
                        {
                          loanPayments.ninthPaymentAmount !== 0 ?
                            <tr>
                              <td>9th Payment</td>
                              <td>&#8369;{monify(loanPayments.ninthPaymentAmount)}</td>
                              <td>{moment(loanPayments.ninthPaymentDate).format('MMMM DD, YYYY')}</td>
                              {
                                (status === 'Active') || (status === 'Fully Paid') ?
                                  <>
                                    <td>&#8369;{monify(loanPayments.ninthPaymentPenalty)}</td>
                                    <td>&#8369;{monify(loanPayments.ninthPaymentPaid)}</td>
                                    <td>&#8369;{monify(loanPayments.ninthPaymentBalance)}</td>
                                    <td>{loanPayments.ninthPaymentStatus}</td>
                                  </>
                                  : null
                              }
                            </tr>
                            : null
                        }
                        {
                          loanPayments.tenthPaymentAmount !== 0 ?
                            <tr>
                              <td>10th Payment</td>
                              <td>&#8369;{monify(loanPayments.tenthPaymentAmount)}</td>
                              <td>{moment(loanPayments.tenthPaymentDate).format('MMMM DD, YYYY')}</td>
                              {
                                (status === 'Active') || (status === 'Fully Paid') ?
                                  <>
                                    <td>&#8369;{monify(loanPayments.tenthPaymentPenalty)}</td>
                                    <td>&#8369;{monify(loanPayments.tenthPaymentPaid)}</td>
                                    <td>&#8369;{monify(loanPayments.tenthPaymentBalance)}</td>
                                    <td>{loanPayments.tenthPaymentStatus}</td>
                                  </>
                                  : null
                              }
                            </tr>
                            : null
                        }
                        {
                          loanPayments.eleventhPaymentAmount !== 0 ?
                            <tr>
                              <td>11th Payment</td>
                              <td>&#8369;{monify(loanPayments.eleventhPaymentAmount)}</td>
                              <td>{moment(loanPayments.eleventhPaymentDate).format('MMMM DD, YYYY')}</td>
                              {
                                (status === 'Active') || (status === 'Fully Paid') ?
                                  <>
                                    <td>&#8369;{monify(loanPayments.eleventhPaymentPenalty)}</td>
                                    <td>&#8369;{monify(loanPayments.eleventhPaymentPaid)}</td>
                                    <td>&#8369;{monify(loanPayments.eleventhPaymentBalance)}</td>
                                    <td>{loanPayments.eleventhPaymentStatus}</td>
                                  </>
                                  : null
                              }
                            </tr>
                            : null
                        }
                        {
                          loanPayments.twelfthPaymentAmount !== 0 ?
                            <tr>
                              <td>12th Payment</td>
                              <td>&#8369;{monify(loanPayments.twelfthPaymentAmount)}</td>
                              <td>{moment(loanPayments.twelfthPaymentDate).format('MMMM DD, YYYY')}</td>
                              {
                                (status === 'Active') || (status === 'Fully Paid') ?
                                  <>
                                    <td>&#8369;{monify(loanPayments.twelfthPaymentPenalty)}</td>
                                    <td>&#8369;{monify(loanPayments.twelfthPaymentPaid)}</td>
                                    <td>&#8369;{monify(loanPayments.twelfthPaymentBalance)}</td>
                                    <td>{loanPayments.twelfthPaymentStatus}</td>
                                  </>
                                  : null
                              }
                            </tr>
                            : null
                        }
                      </tbody>
                    </table>
                  </div>
                </>
                : null
            }
            {
              status === 'Approved' ?
                <div className="buttons">
                  <button className="confirm-btn" type="button" onClick={toggleAcceptModal}>Accept</button>
                  <button className="cancel-btn" type="button" onClick={toggleRefuseModal}>Refuse</button>
                </div>
                : null
            }
            {
              (status === 'Fully Paid') || (status === 'Refused') || (status === 'Rejected') ?
                <div className="buttons">
                  <button className="confirm-btn" type="button" onClick={toggleNewLoanModal}>Request New Loan</button>
                </div>
                : null
            }
          </div>
        </div>
      </div>
      <div className="loan-modal" ref={acceptRef}>
        <div className="modal-overlay" onClick={toggleAcceptModal}></div>
        <div className="modal-content">
          <div className="modal-header">
            <p className="modal-title">Accept Loan Request?</p>
          </div>
          <div className="loan-charges-btns">
            <button type="button" className="confirm-btn" onClick={confirmAccept}>Continue</button>
            <button type="button" className="cancel-btn" onClick={toggleAcceptModal}>Cancel</button>
          </div>
        </div>
      </div>
      <div className="loan-modal" ref={refuseRef}>
        <div className="modal-overlay" onClick={toggleRefuseModal}></div>
        <div className="modal-content">
          <div className="modal-header">
            <p className="modal-title">Refuse Loan Request?</p>
          </div>
          <div className="loan-charges-btns">
            <button type="button" className="confirm-btn" onClick={confirmRefuse}>Continue</button>
            <button type="button" className="cancel-btn" onClick={toggleRefuseModal}>Cancel</button>
          </div>
        </div>
      </div>
      {
        (status === 'Fully Paid') || (status === 'Refused') || (status === 'Rejected') ?
          <div className="loan-modal" ref={newLoanRef}>
            <div className="modal-overlay" onClick={toggleNewLoanModal}></div>
            <div className="modal-content">
              <div className="modal-header">
                <p className="modal-title">Apply New Loan</p>
              </div>
              <div className="modal-body">
                <div className="form-inputs form-loan-amount">
                  <p className="input-label">Loan Amount</p>
                  <input
                    type="range"
                    min="5000"
                    max="200000"
                    step="100"
                    defaultValue={newLoanAmount}
                    onChange={e => setNewLoanAmount(e.target.value)}
                  />
                  <p className="loan-label">&#x20b1;{newLoanAmount}</p>
                </div>
                <div className="form-inputs form-loan-amount">
                  <p className="input-label">Loan Terms</p>
                  <input
                    type="range"
                    min="15"
                    max="180"
                    step="15"
                    defaultValue={newLoanTerms}
                    onChange={e => setNewLoanTerms(e.target.value)}
                  />
                  <p className="loan-label">{newLoanTerms} days</p>
                </div>
              </div>
              <div className="loan-charges-btns">
                <button type="button" className="confirm-btn" onClick={confirmNewLoan}>Apply Loan</button>
                <button type="button" className="cancel-btn" onClick={toggleNewLoanModal}>Cancel</button>
              </div>
            </div>
          </div>
          :
          null
      }
    </>
  );
}

export default MainDashboard;