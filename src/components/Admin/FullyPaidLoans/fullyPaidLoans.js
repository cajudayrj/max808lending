import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import handleRedirects from '../../../assets/helpers/handleRedirects';
import moment from 'moment-timezone';
import axios from 'axios';
import serverUrl from '../../../serverUrl';
import Pagination from '../../Pagination/pagination';

const FullyPaidLoans = () => {
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const history = useHistory();
  const [fullyPaidLoans, setFullyPaidLoans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    if (userData.userLevel !== 1) {
      handleRedirects(history);
      return;
    }
    axios(`${serverUrl}/loans/fully-paid/page/${currentPage}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${userData.authToken}`
      }
    })
      .then(({ data }) => {
        const { fullyPaidLoans, totalPage } = data;
        setFullyPaidLoans(fullyPaidLoans);
        setTotalPage(totalPage);
      })
  }, [currentPage, history, userData.authToken, userData.userLevel])

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
    <div className="admin-loans-dashboard approved-loan-dashboard">
      <h1 className="header-title">Fully Paid Loans</h1>
      <div className="loans-table">
        <table>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Borrower</th>
              <th>Amount</th>
              <th>Penalties</th>
              <th>Total Payment</th>
              <th>Loan Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              fullyPaidLoans.length > 0 ?
                fullyPaidLoans.map((loan, key) => {
                  return (
                    <tr key={key}>
                      <td><Link to={`/admin/loan/${loan.id}`} >{loan.id}</Link></td>
                      <td>{loan.firstName} {loan.lastName}</td>
                      <td>&#8369;{monify(loan.amount)}</td>
                      <td>&#8369;{monify(loan.penaltyCharge)}</td>
                      <td>&#8369;{monify(loan.loanPaid)}</td>
                      <td>{moment(loan.loanDate).tz('Asia/Manila').format('MMMM DD, YYYY')}</td>
                      <td>{loan.loanStatus}</td>
                      <td><Link to={`/admin/loan/${loan.id}`} >View</Link></td>
                    </tr>
                  )
                })
                :
                <tr>
                  <td className="no-loans" colSpan={7}>No fully paid loans found.</td>
                </tr>
            }
          </tbody>
        </table>
      </div>
      <Pagination totalPage={totalPage} activePage={currentPage} onPageChange={setCurrentPage} />
    </div>
  )
}

export default FullyPaidLoans;