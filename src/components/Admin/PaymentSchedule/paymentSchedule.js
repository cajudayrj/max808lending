import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import handleRedirects from '../../../assets/helpers/handleRedirects';
import moment from 'moment-timezone';
import axios from 'axios';
import serverUrl from '../../../serverUrl';
import ExportExcel from '../../../assets/helpers/exportExcel';

const PaymentSchedule = () => {
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const history = useHistory();
  const [paymentSchedule, setPaymentSchedule] = useState([]);
  const [paymentScheduleReport, setPaymentScheduleReport] = useState([]);

  const [editModal, setEditModal] = useState(false);

  const editTransactionRef = useRef(null);

  const [loanData, setLoanData] = useState({});
  const [transactionPosition, setTransactionPosition] = useState('');
  const [transactionLoanId, setTransactionLoanId] = useState('');
  const [transactionBorrower, setTransactionBorrower] = useState('');
  const [transactionAmortizationDate, setTransactionAmortizationDate] = useState('');
  const [transactionAmortization, setTransactionAmortization] = useState('');
  const [transactionPenalty, setTransactionPenalty] = useState('');
  const [transactionPaid, setTransactionPaid] = useState('');
  const [transactionBalance, setTransactionBalance] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('');

  const fields = {
    loanId: "Loan ID",
    borrower: "Borrower",
    amount: "Loan Amount",
    amortizationDate: "Amortization Date",
    amortization: "Amortization",
    penalty: "Penalty",
    paid: "Amount Paid",
    balance: "Balance",
    status: "Status"
  }

  useEffect(() => {
    if (userData.userLevel !== 1) {
      handleRedirects(history);
      return;
    }
    axios(`${serverUrl}/loans/payment-summary-schedule`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${userData.authToken}`
      }
    })
      .then(({ data }) => {
        const { schedules } = data;
        setPaymentSchedule(schedules);
      });

    axios(`${serverUrl}/loans/generate/summary-schedule`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${userData.authToken}`
      }
    })
      .then(({ data }) => {
        const { schedules } = data;

        setPaymentScheduleReport(schedules);
      });

  }, [history, userData.authToken, userData.userLevel]) // eslint-disable-line

  const toggleEditTransaction = (e, loan) => {
    e.preventDefault();
    setEditModal(!editModal);
    if (!editModal) {
      editTransactionRef.current.classList.add('opened');

      setLoanData(loan);
      setTransactionPosition(loan.position);
      setTransactionLoanId(loan.loanId);
      setTransactionBorrower(loan.borrower);
      setTransactionAmortization(parseFloat(loan.amortization));
      setTransactionAmortizationDate(moment(loan.amortizationDate).format('YYYY-MM-DD'))
      setTransactionBalance(parseFloat(loan.balance));
      setTransactionPenalty(parseFloat(loan.penalty));
      setTransactionPaid(parseFloat(loan.paid));
      setTransactionStatus(loan.status);

      setTimeout(() => {
        editTransactionRef.current.classList.add('visible');
      }, 100)
    } else {
      editTransactionRef.current.classList.remove('visible');

      setLoanData({});
      setTransactionPosition('');
      setTransactionLoanId('');
      setTransactionBorrower('');
      setTransactionAmortization('');
      setTransactionAmortizationDate('')
      setTransactionBalance('');
      setTransactionPenalty('');
      setTransactionPaid('');
      setTransactionStatus('');

      setTimeout(() => {
        editTransactionRef.current.classList.remove('opened');

      }, 300)
    }
  }

  const handleTransactionPenalty = e => {
    let val = e.target.value;
    const currBal = loanData.amortization;
    let bal;
    if (e.target.value === '') {
      setTransactionPenalty(0);
      bal = currBal - transactionPaid;
      setTransactionBalance(bal);
      return;
    }
    const penalty = parseFloat(val);
    bal = (penalty + parseFloat(currBal)) - transactionPaid;
    console.log(currBal);
    setTransactionPenalty(penalty);
    setTransactionBalance(bal);
  }

  const handleTransactionPaid = e => {
    let val = e.target.value;
    let balance;
    if (e.target.value === '') {
      setTransactionPaid(0);
      balance = (transactionAmortization + transactionPenalty) - 0;
      setTransactionBalance(balance);
      return;
    }
    const paidAmount = parseFloat(val);
    balance = (transactionAmortization + transactionPenalty) - paidAmount;

    setTransactionPaid(paidAmount);
    setTransactionBalance(balance.toFixed(2));
  }

  const handleUpdatePayment = e => {
    e.preventDefault();


    const data = {
      loanPaymentId: loanData.loanPaymentId,
      position: transactionPosition,
      loanId: transactionLoanId,
      borrower: transactionBorrower,
      amortizationDate: transactionAmortizationDate,
      amortization: transactionAmortization,
      penalty: transactionPenalty,
      paid: transactionPaid,
      balance: transactionBalance,
      status: transactionStatus
    }

    axios(`${serverUrl}/loans/update-payment/${data.loanPaymentId}`, {
      method: "PUT",
      data,
      headers: {
        "Authorization": `Bearer ${userData.authToken}`
      }
    })
      .then(({ data }) => {
        const { success, message } = data;
        if (success) {
          console.log(message);
        } else {
          console.log(message);
        }
        window.location.reload();
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
    <div className="admin-loans-dashboard active-loan-dashboard">
      <h1 className="header-title">Payment Summary Schedule</h1>
      <ExportExcel
        data={paymentScheduleReport}
        fileName="Payment Summary Schedule"
        fields={fields}
        buttonLabel="Generate Excel"
      />
      <div className="loans-table">
        <table>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Borrower Name</th>
              <th>Loan Amount</th>
              <th>Amortization Date</th>
              <th>Amortization</th>
              <th>Penalty</th>
              <th>Amount Paid</th>
              <th>Balance</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              paymentSchedule.length > 0 ?
                paymentSchedule.map((loan, key) => {
                  return (
                    <tr key={key}>
                      <td><Link to={`/admin/loan/${loan.loanId}`} >{loan.loanId}</Link></td>
                      <td>{loan.borrower}</td>
                      <td>&#8369;{monify(loan.amount)}</td>
                      <td>{moment(loan.amortizationDate).tz('Asia/Manila').format('MMMM DD, YYYY')}</td>
                      <td>&#8369;{monify(loan.amortization)}</td>
                      <td>&#8369;{monify(loan.penalty)}</td>
                      <td>&#8369;{monify(loan.paid)}</td>
                      <td>&#8369;{monify(loan.balance)}</td>
                      <td>{loan.status}</td>
                      <td><button type="button" className="confirm-btn" onClick={e => toggleEditTransaction(e, loan)}>Update</button></td>
                    </tr>
                  )
                })
                :
                <tr>
                  <td className="no-loans" colSpan={7}>No payment schedules found.</td>
                </tr>
            }
          </tbody>
        </table>
      </div>
      <div className="loan-modal" ref={editTransactionRef}>
        <div className="modal-overlay" onClick={toggleEditTransaction}></div>
        <div className="modal-content">
          <div className="modal-header">
            <p className="modal-title">Edit Payment</p>
            <span onClick={toggleEditTransaction}>&times;</span>
          </div>
          <div className="fields">
            <p className="label">Loan ID</p>
            <input type="text" className="approve-input" value={transactionLoanId} readOnly />
          </div>
          <div className="fields">
            <p className="label">Borrower</p>
            <input type="text" className="approve-input" value={transactionBorrower} readOnly />
          </div>
          <div className="fields">
            <p className="label">Amortization Date</p>
            <input type="date" value={transactionAmortizationDate}
              onChange={e => setTransactionAmortizationDate(e.target.value)}
              onKeyDown={e => e.preventDefault()}
            />
          </div>
          <div className="fields">
            <p className="label">Amortization</p>
            <input type="text" className="approve-input" value={transactionAmortization} readOnly />
          </div>
          <div className="fields">
            <p className="label">Amortization Penalty</p>
            <input type="number" step="0.01" min="0" value={transactionPenalty} onChange={handleTransactionPenalty} />
          </div>
          <div className="fields">
            <p className="label">Amount Paid</p>
            <input type="number" step="0.01" min="0" value={transactionPaid} onChange={handleTransactionPaid} />
          </div>
          <div className="fields">
            <p className="label">Amortization Balance</p>
            <input type="number" className="approve-input" value={transactionBalance} readOnly />
          </div>
          <div className="fields">
            <p className="label">Status</p>
            <select type="text" value={transactionStatus} onChange={e => {
              if (e.target.value === 'Paid') {
                const paid = parseFloat(transactionPenalty) + parseFloat(transactionAmortization);
                setTransactionPaid(paid);
                setTransactionBalance(0);
              } else {
                setTransactionPaid(loanData.paid);
                setTransactionBalance(parseFloat(loanData.balance) + parseFloat(loanData.penalty));
              }
              setTransactionStatus(e.target.value)
            }}>
              <option value="Unpaid">Unpaid</option>
              <option value="Paid">Paid</option>
              <option value="Past Due">Past Due</option>
            </select>
          </div>

          <div className="separator"></div>
          <div className="loan-charges-btns">
            <button type="button" className="confirm-btn" onClick={e => handleUpdatePayment(e)}>Confirm</button>
            <button type="button" className="cancel-btn" onClick={toggleEditTransaction}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentSchedule;