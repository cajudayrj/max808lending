
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import serverUrl from '../../../../serverUrl';
import moment from 'moment-timezone';

const TabContentTransactions = ({ loanId, totalPenalty, totalPaid }) => {
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  const [transactionId, setTransactionId] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [transactionDescription, setTransactionDescription] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionLoanId, setTransactionLoanId] = useState('');

  const [editModal, setEditModal] = useState(false);

  const editTransactionRef = useRef(null);


  useEffect(() => {
    axios(`${serverUrl}/loans/transaction-history/${loanId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${userData.authToken}`
      }
    })
      .then(result => {
        const res = result.data;
        setTransactions(res);
        setLoading(false);
        return;
      })
  }, [loanId, totalPaid, totalPenalty, userData.authToken]);

  const handleSetAmount = e => {
    let val = e.target.value;
    if (e.target.value === '') {
      setTransactionAmount(0);
      return;
    }

    setTransactionAmount(parseFloat(val))
  }

  const toggleEditTransaction = (e, id, desc, transactDate, amount, loanId) => {
    e.preventDefault();
    setEditModal(!editModal);
    if (!editModal) {
      editTransactionRef.current.classList.add('opened');
      setTransactionId(id);
      setTransactionDescription(desc);
      setTransactionAmount(amount);
      setTransactionDate(transactDate);
      setTransactionLoanId(loanId);
      setTimeout(() => {
        editTransactionRef.current.classList.add('visible');
      }, 100)
    } else {
      editTransactionRef.current.classList.remove('visible');
      setTimeout(() => {
        editTransactionRef.current.classList.remove('opened');
        setTransactionId('');
        setTransactionDescription('');
        setTransactionAmount('');
        setTransactionDate('');
        setTransactionLoanId('');
      }, 300)
    }
  }

  const confirmEditTransaction = e => {
    e.preventDefault();

    const data = {
      id: transactionId,
      transactionDate: moment(transactionDate).tz('Asia/Manila').format('YYYY-MM-DD'),
      amount: transactionAmount,
      description: transactionDescription,
      loan_id: transactionLoanId,
    }

    toggleEditTransaction(e);
    setTimeout(() => {
      axios(`${serverUrl}/loans/edit-transaction/${data.id}`, {
        method: "PUT",
        data,
        headers: {
          "Authorization": `Bearer ${userData.authToken}`
        }
      })
        .then(result => {
          const res = result.data;
          if (res.error) {
            console.log(res.message);
          } else {
            setTransactions(res);
          }
        });
    }, 400)
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

  if (loading) return <h1 className="title-info loading">Loading Transaction History...</h1>

  return (
    <>
      <h3 className="title-info">Loan Transactions History</h3>
      <div className="loans-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              transactions.length > 0 ?
                transactions.map((loan, key) => {
                  return (
                    <tr key={key}>
                      <td>{moment(loan.transactionDate).tz('Asia/Manila').format('MMMM DD, YYYY')}</td>
                      <td className={loan.description === 'Penalty' ? 'penalty' : ''}>{loan.description}</td>
                      <td className={loan.description === 'Penalty' ? 'penalty' : ''}>&#8369;{monify(loan.amount)}</td>
                      <td className="action">
                        <button type="button" className="confirm-btn" onClick={e => toggleEditTransaction(e, loan.id, loan.description, moment(loan.transactionDate).tz('Asia/Manila').format('YYYY-MM-DD'), loan.amount, loan.loan_id)}>Edit</button>
                      </td>
                    </tr>
                  )
                })
                :
                <tr>
                  <td className="no-loans" colSpan={4}>No transactions found.</td>
                </tr>
            }
          </tbody>
        </table>
      </div>

      <div className="loan-modal" ref={editTransactionRef}>
        <div className="modal-overlay" onClick={toggleEditTransaction}></div>
        <div className="modal-content">
          <div className="modal-header">
            <p className="modal-title">Edit Transaction History</p>
            <span onClick={toggleEditTransaction}>&times;</span>
          </div>
          <div className="fields">
            <p className="label">Transaction Date</p>
            <input type="date" className="approve-input" value={transactionDate} onChange={e => setTransactionDate(e.target.value)} />
          </div>
          <div className="fields">
            <p className="label">Description</p>
            <select value={transactionDescription} onChange={e => setTransactionDescription(e.target.value)}>
              <option value="Payment">Payment</option>
              <option value="Penalty">Penalty</option>
              <option value="Initial Loan">Initial Loan</option>
            </select>
          </div>
          <div className="fields">
            <p className="label">Amount</p>
            <input type="number" step="0.01" className="approve-input" value={transactionAmount} onChange={handleSetAmount} />
          </div>
          <div className="separator"></div>
          <div className="loan-charges-btns">
            <button type="button" className="confirm-btn" onClick={confirmEditTransaction}>Confirm</button>
            <button type="button" className="cancel-btn" onClick={toggleEditTransaction}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  )

}

export default TabContentTransactions;