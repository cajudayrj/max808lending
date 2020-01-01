import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import handleRedirects from '../../../assets/helpers/handleRedirects';
import moment from 'moment-timezone';
import axios from 'axios';
import serverUrl from '../../../serverUrl';

const SummaryOfTransactions = () => {
  // const userData = JSON.parse(window.localStorage.getItem('userData'));
  const history = useHistory();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [loans, setLoans] = useState({});

  useEffect(() => {
    if (userData.userLevel !== 1) {
      handleRedirects(history);
      return;
    }
    axios(`${serverUrl}/loans/transactions`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${userData.authToken}`
      }
    })
      .then(({ data }) => setLoans(data))
      .catch(err => console.log(err));
  }, []) // eslint-disable-line
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
      <h1 className="header-title">Summary of Transactions</h1>
      <div className="loans-table">
        <table>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Borrower</th>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {
              loans.length > 0 ?
                loans.map((loan, key) => {
                  return (
                    <tr key={key}>
                      <td>{loan.id}</td>
                      <td>{loan.firstName} {loan.lastName}</td>
                      <td>{moment(loan.acceptedDate).tz('Asia/Manila').format('MMMM DD, YYYY')}</td>
                      <td>Payment</td>
                      <td>&#8369;{monify(loan.loanPaid)}</td>
                    </tr>
                  )
                })
                :
                <tr>
                  <td className="no-loans" colSpan={5}>No transactions found.</td>
                </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SummaryOfTransactions;