import React, { useState, useEffect } from 'react';
import handleVerifiedRedirect from '../../../assets/helpers/handleVerifiedRedirect';
import moment from 'moment-timezone';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import serverUrl from '../../../serverUrl';

const TransactionHistory = () => {
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const history = useHistory();

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    handleVerifiedRedirect(history);
    axios(`${serverUrl}/user/loan/transactions`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${userData.authToken}`
      }
    })
      .then(result => {
        const res = result.data;
        setTransactions(res);
      })
  }, []); // eslint-disable-line

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
    <div className="admin-loans-dashboard pending-loan-dashboard">
      <h1 className="header-title">Transaction History</h1>
      <div className="loans-table">
        <table>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {
              transactions.length > 0 ?
                transactions.map((transaction, key) => {
                  return (
                    <tr key={key}>
                      <td>{transaction.loan_id}</td>
                      <td>{moment(transaction.transactionDate).tz('Asia/Manila').format('MMMM DD, YYYY')}</td>
                      <td className={transaction.description === "Penalty" ? 'penalty' : transaction.description === "Payment" ? 'payment' : ''}>{transaction.description}</td>
                      <td className={transaction.description === "Penalty" ? 'penalty' : transaction.description === "Payment" ? 'payment' : ''}>&#8369;{monify(transaction.amount)}</td>
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
    </div>
  )
}

export default TransactionHistory;