import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import axios from 'axios';
import serverUrl from '../../../serverUrl';
import NotFound from './notFound';
import TabContentLoanPayment from './TabContents/tabContentLoanPayment';
import TabContentBorrowerInfo from './TabContents/tabContentBorrowerInfo';
import TabContentBorrowerDocs from './TabContents/tabContentBorrowerDocs';
import TabContentBorrowerRefs from './TabContents/tabContentBorrowerRefs';

const Loan = ({ match }) => {
  const userData = JSON.parse(window.localStorage.getItem('userData'));

  const [hasResult, setHasResult] = useState(true);
  const [loanResult, setLoanResult] = useState({});
  const [status, setStatus] = useState('');
  const [amount, setAmount] = useState(0);
  const [financeCharge, setFinanceCharge] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [terms, setTerms] = useState(0);
  const [penaltyCharge, setPenaltyCharge] = useState(0);
  const [approveModal, setApproveModal] = useState(false);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const approveModalRef = useRef(null);
  const paymentRef = useRef(null);
  const borrowerInfoRef = useRef(null);
  const borrowerDocsRef = useRef(null);
  const borrowerRefsRef = useRef(null);
  const paymentBtnRef = useRef(null);
  const borrowerInfoBtnRef = useRef(null);
  const borrowerDocsBtnRef = useRef(null);
  const borrowerRefsBtnRef = useRef(null);

  useEffect(() => {
    axios(`${serverUrl}/loans/find/${match.params.id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${userData.authToken}`
      }
    })
      .then(result => {
        const res = result.data.loanData;
        if (res.length === 0) {
          setHasResult(false);
          return;
        }
        setLoanResult(res[0]);
        setTerms(res[0].terms);
        setStatus(res[0].loanStatus);
        setFinanceCharge(res[0].financeCharge);
        setServiceFee(res[0].serviceFee);
        setAmount(res[0].amount);
        setPenaltyCharge(res[0].penaltyCharge);
      })
  }, [match.params.id, userData.authToken]);

  const toggleSetCharges = (e) => {
    e.preventDefault();
    setApproveModal(!approveModal);
    if (!approveModal) {
      approveModalRef.current.classList.add('opened');
      setTimeout(() => {
        approveModalRef.current.classList.add('visible');
      }, 100)
    } else {
      approveModalRef.current.classList.remove('visible');
      setTimeout(() => {
        approveModalRef.current.classList.remove('opened');
      }, 300)
    }
  }

  const resetLoanCharges = (e) => {
    setTerms(loanResult.terms);
    setFinanceCharge(loanResult.financeCharge);
    setServiceFee(loanResult.serviceFee);
    setAmount(loanResult.amount);
  }

  const handleSetAmount = e => {
    let val = e.target.value;
    if (e.target.value === '') {
      setAmount(0);
      return;
    }

    setAmount(parseInt(val.replace(/\D/, ''), 10))
  }

  const handlePenalties = total => {
    setPenaltyCharge(total);
  }

  const showInfoTabs = (tab) => {
    switch (tab) {
      case 'payment':
        paymentBtnRef.current.classList.add('active');
        paymentRef.current.classList.remove('hidden');
        borrowerInfoRef.current.classList.add('hidden');
        borrowerInfoBtnRef.current.classList.remove('active');
        borrowerDocsRef.current.classList.add('hidden');
        borrowerDocsBtnRef.current.classList.remove('active');
        borrowerRefsRef.current.classList.add('hidden');
        borrowerRefsBtnRef.current.classList.remove('active');
        return;
      case 'borrower-info':
        borrowerInfoRef.current.classList.remove('hidden');
        borrowerInfoBtnRef.current.classList.add('active');
        paymentRef.current.classList.add('hidden');
        paymentBtnRef.current.classList.remove('active');
        borrowerDocsRef.current.classList.add('hidden');
        borrowerDocsBtnRef.current.classList.remove('active');
        borrowerRefsRef.current.classList.add('hidden');
        borrowerRefsBtnRef.current.classList.remove('active');
        return;
      case 'borrower-docs':
        borrowerDocsRef.current.classList.remove('hidden');
        borrowerDocsBtnRef.current.classList.add('active');
        borrowerInfoRef.current.classList.add('hidden');
        borrowerInfoBtnRef.current.classList.remove('active');
        paymentRef.current.classList.add('hidden');
        paymentBtnRef.current.classList.remove('active');
        borrowerRefsRef.current.classList.add('hidden');
        borrowerRefsBtnRef.current.classList.remove('active');
        return;
      case 'borrower-refs':
        borrowerRefsRef.current.classList.remove('hidden');
        borrowerRefsBtnRef.current.classList.add('active');
        borrowerInfoRef.current.classList.add('hidden');
        borrowerInfoBtnRef.current.classList.remove('active');
        borrowerDocsRef.current.classList.add('hidden');
        borrowerDocsBtnRef.current.classList.remove('active');
        paymentRef.current.classList.add('hidden');
        paymentBtnRef.current.classList.remove('active');
        return;
      default:
        paymentBtnRef.current.classList.add('active');
        paymentRef.current.classList.remove('hidden');
        borrowerInfoRef.current.classList.add('hidden');
        borrowerInfoBtnRef.current.classList.remove('active');
        borrowerDocsRef.current.classList.add('hidden');
        borrowerDocsBtnRef.current.classList.remove('active');
        borrowerRefsRef.current.classList.add('hidden');
        borrowerRefsBtnRef.current.classList.remove('active');
        return;
    }
  }

  const approveLoanRequest = (loanRequestData) => {

    const today = new Date();

    const loanProceeds = amount
      - (amount * (2 / 100))
      - (amount * (serviceFee / 100))
      - (amount * (financeCharge / 100));

    const requestData = Object.keys(loanRequestData).map(key => {
      return loanRequestData[key];
    }).sort((a, b) => {
      return new Date(b) - new Date(a);
    });

    const loanCharges = {
      serviceFee,
      financeCharge,
      terms,
      amount,
      loanProceeds,
      dueDate: requestData[0],
      approvedDate: moment(today).format('YYYY-MM-DD'),
    }

    const userDetails = {
      fullName: loanResult.firstName + ' ' + loanResult.lastName,
      email: loanResult.email
    }

    const loanData = {
      loanCharges,
      paymentTerms: loanRequestData,
      userDetails
    }

    axios(`${serverUrl}/loans/approve/${loanResult.id}`, {
      method: "POST",
      data: loanData,
      headers: {
        "Authorization": `Bearer ${userData.authToken}`,
      }
    })
      .then(result => {
        const res = result.data;
        if (!res.success) {
          console.log(res.message)
          return;
        }
        setLoanResult(res.loanData[0]);
        setStatus(res.loanData[0].loanStatus);
        setTerms(res.loanData[0].terms);
        setFinanceCharge(res.loanData[0].financeCharge);
        setServiceFee(res.loanData[0].serviceFee);
        setAmount(res.loanData[0].amount);
        setPenaltyCharge(res.loanData[0].penaltyCharge);
      });
  }

  const rejectLoanRequest = () => {
    axios(`${serverUrl}/loans/reject/${loanResult.id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${userData.authToken}`
      }
    })
      .then(result => {
        const res = result.data;
        if (!res.success) {
          console.log(res.message)
          return;
        }
        setLoanResult(res.loanData[0]);
        setTerms(res.loanData[0].terms);
        setStatus(res.loanData[0].loanStatus);
        setFinanceCharge(res.loanData[0].financeCharge);
        setServiceFee(res.loanData[0].serviceFee);
        setAmount(res.loanData[0].amount);
        setPenaltyCharge(res.loanData[0].penaltyCharge);
      })
  }

  const loanProceedsValue = amount
    - (amount * (2 / 100))
    - (amount * (serviceFee / 100))
    - (amount * (financeCharge / 100));

  const setActiveLoanStatus = () => {
    axios(`${serverUrl}/loans/to-active/${loanResult.id}`, {
      method: "PUT",
      data: {
        email: loanResult.email,
        loanProceeds: loanProceedsValue,
        amount,
        financeCharge,
        serviceFee,
        dueDate: loanResult.dueDate
      },
      headers: {
        "Authorization": `Bearer ${userData.authToken}`
      }
    })
      .then(result => {
        const res = result.data;
        if (!res.success) {
          console.log(res.message)
          return;
        }
        setLoanResult(res.loanData[0]);
        setTerms(res.loanData[0].terms);
        setStatus(res.loanData[0].loanStatus);
        setFinanceCharge(res.loanData[0].financeCharge);
        setServiceFee(res.loanData[0].serviceFee);
        setAmount(res.loanData[0].amount);
        setPenaltyCharge(res.loanData[0].penaltyCharge);
      })
  }

  if (!hasResult) return <NotFound />;

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
              <p className="value">&#8369;{monify(parseInt(amount))}</p>
            </div>
            <div className="info">
              <p className="label">Loan Terms:</p>
              <p className="value">{terms} days</p>
            </div>
            <div className="info">
              <p className="label">Loan Request Date:</p>
              <p className="value">{moment(loanResult.loanDate).format('MMMM DD, YYYY')}</p>
            </div>
            <div className="info">
              <p className="label">Loan Effectivity Date:</p>
              <p className="value">{loanResult.acceptedDate ? moment(loanResult.acceptedDate).format('MMMM DD, YYYY') : '-'}</p>
            </div>
            <div className="info">
              <p className="label">Loan Due Date:</p>
              <p className="value">{loanResult.dueDate ? moment(loanResult.dueDate).format('MMMM DD, YYYY') : '-'}</p>
            </div>
            <div className="info">
              <p className="label">Loan Status:</p>
              <p className="value">{status}</p>
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
                      <p className="value">{monify(parseInt(amount))}</p>
                    </div>
                    <div className="computations">
                      <p className="label">Finance Charge &#40; {financeCharge}% &#41;:</p>
                      <p className="value">&#40;{(parseInt(amount) * (financeCharge / 100)).toFixed(2)}&#41;</p>
                    </div>
                    <div className="computations">
                      <p className="label">Processing Fee &#40; 2% &#41;:</p>
                      <p className="value">&#40;{(parseInt(amount) * (2 / 100)).toFixed(2)}&#41;</p>
                    </div>
                    <div className="computations">
                      <p className="label">Service Fee &#40; {serviceFee}% &#41;:</p>
                      <p className="value">&#40;{(parseInt(amount) * (serviceFee / 100)).toFixed(2)}&#41;</p>
                    </div>
                    <div className="computations loan-proceeds">
                      <p className="label">Loan Proceeds:</p>
                      <p className="value">&#8369;{
                        loanProceedsValue.toFixed(2)
                      }</p>
                    </div>
                  </div>
                </div>
                <div className="approval-btns">
                  <button type="button" className="approve-btn" onClick={toggleSetCharges}>Set Loan Terms and Charges</button>
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
                        parseInt(
                          loanResult.amount
                          - (loanResult.amount * (2 / 100))
                          - (loanResult.amount * (loanResult.serviceFee / 100))
                          - (loanResult.amount * (loanResult.financeCharge / 100))
                        ).toFixed(2)
                      }</p>
                    </div>
                    <div className="computations">
                      <p className="label">Total Charges:</p>
                      <p className="value">&#8369;{
                        parseInt(
                          loanProceedsValue +
                          (amount * (2 / 100))
                          + (amount * (serviceFee / 100))
                          + (amount * (financeCharge / 100))
                          + penaltyCharge
                        ).toFixed(2)
                      }</p>
                    </div>
                    <div className="computations sub-comp">
                      <p className="label">Finance Charge &#40; {financeCharge}% &#41;:</p>
                      <p className="value">{parseInt(amount * (financeCharge / 100)).toFixed(2)}</p>
                    </div>
                    <div className="computations sub-comp">
                      <p className="label">Processing Fee &#40; 2% &#41;:</p>
                      <p className="value">{parseInt(amount * (2 / 100)).toFixed(2)}</p>
                    </div>
                    <div className="computations sub-comp">
                      <p className="label">Service Fee &#40; {serviceFee}% &#41;:</p>
                      <p className="value">{parseInt(amount * (serviceFee / 100)).toFixed(2)}</p>
                    </div>
                    <div className="computations sub-comp">
                      <p className="label">Penalty:</p>
                      <p className="value">{parseInt(penaltyCharge).toFixed(2)}</p>
                    </div>
                    <div className="computations after-charges">
                      <p className="label">Total Payment:</p>
                      <p className="value">&#8369;{monify(parseInt(totalPayment))}</p>
                    </div>
                    <div className="computations">
                      <p className="label">Balance:</p>
                      <p className="value">&#8369;{monify(parseInt(totalBalance))}</p>
                    </div>
                  </div>
                </div>
              </>
          }
        </div>
        <div className="loan__main-info">
          <div className="loan-tabs">
            <button ref={paymentBtnRef} className="tab-btns active" onClick={() => showInfoTabs('payment')}>Loan Payments</button>
            <button ref={borrowerInfoBtnRef} className="tab-btns" onClick={() => showInfoTabs('borrower-info')}>Borrower Information</button>
            <button ref={borrowerDocsBtnRef} className="tab-btns" onClick={() => showInfoTabs('borrower-docs')}>Borrower Documents</button>
            <button ref={borrowerRefsBtnRef} className="tab-btns" onClick={() => showInfoTabs('borrower-refs')}>Borrower References</button>
          </div>
          <div className="loan-tab-contents">
            <div ref={paymentRef} className="loan-tab-contents__payment active">
              <TabContentLoanPayment
                terms={terms}
                amount={amount}
                status={status}
                approveLoanRequest={approveLoanRequest}
                rejectLoanRequest={rejectLoanRequest}
                setActiveLoanStatus={setActiveLoanStatus}
                loanId={loanResult.id}
                handlePenalties={handlePenalties}
                handlePayment={setTotalPayment}
                handleBalance={setTotalBalance}
                setLoanStatus={setStatus}
              />
            </div>
            <div ref={borrowerInfoRef} className="loan-tab-contents__borrower-info hidden">
              <TabContentBorrowerInfo userId={loanResult.user_id} />
            </div>
            <div ref={borrowerDocsRef} className="loan-tab-contents__borrower-documents hidden">
              <TabContentBorrowerDocs userId={loanResult.user_id} />
            </div>
            <div ref={borrowerRefsRef} className="loan-tab-contents__borrower-references hidden">
              <TabContentBorrowerRefs userId={loanResult.user_id} />
            </div>
          </div>
        </div>
      </div>
      <div className="loan-modal" ref={approveModalRef}>
        <div className="modal-overlay" onClick={toggleSetCharges}></div>
        <div className="modal-content">
          <div className="modal-header">
            <p className="modal-title">Set Loan Terms and Charges</p>
            <span onClick={toggleSetCharges}>&times;</span>
          </div>
          <div className="fields">
            <p className="label">Terms</p>
            <select value={terms} onChange={e => setTerms(e.target.value)}>
              <option value="15">15 Days</option>
              <option value="30">30 Days</option>
              <option value="45">45 Days</option>
              <option value="60">60 Days</option>
              <option value="75">75 Days</option>
              <option value="90">90 Days</option>
              <option value="105">105 Days</option>
              <option value="120">120 Days</option>
              <option value="135">135 Days</option>
              <option value="150">150 Days</option>
              <option value="165">165 Days</option>
              <option value="180">180 Days</option>
            </select>
          </div>
          <div className="fields">
            <p className="label">Principal</p>
            <input type="text" className="approve-input" value={amount} onChange={handleSetAmount} />
          </div>
          <div className="fields">
            <p className="label">Finance Charge</p>
            <select value={financeCharge} onChange={e => setFinanceCharge(e.target.value)}>
              <option value="0">No Interest</option>
              <option value="1">1%</option>
              <option value="2">2%</option>
              <option value="3">3%</option>
              <option value="4">4%</option>
              <option value="5">5%</option>
              <option value="6">6%</option>
              <option value="7">7%</option>
              <option value="8">8%</option>
              <option value="9">9%</option>
              <option value="10">10%</option>
            </select>
          </div>
          <div className="fields">
            <p className="label">Processing Fee</p>
            <input type="text" className="approve-input" defaultValue="2%" readOnly />
          </div>
          <div className="fields">
            <p className="label">Service Charge</p>
            <select value={serviceFee} onChange={e => setServiceFee(e.target.value)}>
              <option value="0">No Service Charge</option>
              <option value="1">1%</option>
              <option value="2">2%</option>
              <option value="3">3%</option>
              <option value="4">4%</option>
              <option value="5">5%</option>
              <option value="6">6%</option>
              <option value="7">7%</option>
              <option value="8">8%</option>
              <option value="9">9%</option>
              <option value="10">10%</option>
            </select>
          </div>
          <div className="separator"></div>
          <div className="fields proceeds">
            <p className="label">Loan Proceeds</p>
            <input type="text" className="approve-input" value={loanProceedsValue.toFixed(2)} readOnly />
          </div>
          <div className="loan-charges-btns">
            <button type="button" className="confirm-btn" onClick={toggleSetCharges}>Confirm</button>
            <button type="button" className="cancel-btn" onClick={resetLoanCharges}>Reset</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Loan;