import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import handleRedirects from '../../../assets/helpers/handleRedirects';
import moment from 'moment';
import axios from 'axios';
import serverUrl from '../../../serverUrl';

const PendingLoans = () => {
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const history = useHistory();
  const [pendingLoans, setPendingLoans] = useState([]);

  useEffect(() => {
    if (userData.userLevel !== 1) {
      handleRedirects(history);
      return;
    }
    axios(`${serverUrl}/loans/pending`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${userData.authToken}`
      }
    })
      .then(({ data }) => {
        const { pendingLoans } = data;
        setPendingLoans(pendingLoans);
      })
      .catch(err => console.log(err));
  }, [history, userData.authToken, userData.userLevel])

  const monify = (amount) => {
    return amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  return (
    <div className="admin-loans-dashboard pending-loan-dashboard">
      <h1 className="header-title">Pending Loans</h1>
      <div className="loans-table">
        <table>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Borrower</th>
              <th>Amount</th>
              <th>Terms</th>
              <th>Loan Request Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              pendingLoans.length > 0 ?
                pendingLoans.map((loan, key) => {
                  return (
                    <tr key={key}>
                      <td>{loan.id}</td>
                      <td>{loan.firstName} {loan.lastName}</td>
                      <td>&#8369;{monify(loan.amount)}</td>
                      <td>{loan.terms} days</td>
                      <td>{moment(loan.loanDate).format('MMMM DD, YYYY')}</td>
                      <td>{loan.loanStatus}</td>
                      <td><Link to={`/admin/loan/${loan.id}`} >View</Link></td>
                    </tr>
                  )
                })
                :
                <tr>
                  <td className="no-loans" colSpan={7}>No pending loans available.</td>
                </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PendingLoans;