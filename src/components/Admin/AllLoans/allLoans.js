import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import handleRedirects from '../../../assets/helpers/handleRedirects';
import moment from 'moment-timezone';
import axios from 'axios';
import serverUrl from '../../../serverUrl';
import Pagination from '../../Pagination/pagination';

const AllLoans = () => {
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const history = useHistory();
  const [allLoans, setAllLoans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    if (userData.userLevel !== 1) {
      handleRedirects(history);
      return;
    }
    axios(`${serverUrl}/loans/all/page/${currentPage}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${userData.authToken}`
      }
    })
      .then(({ data }) => {
        const { allLoans, totalPage } = data;
        setAllLoans(allLoans);
        setTotalPage(totalPage);
      })
      .catch(err => console.log(err));
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
    <div className="admin-loans-dashboard pending-loan-dashboard">
      <h1 className="header-title">All Loans</h1>
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
              allLoans.length > 0 ?
                allLoans.map((loan, key) => {
                  return (
                    <tr key={key}>
                      <td><Link to={`/admin/loan/${loan.id}`} >{loan.id}</Link></td>
                      <td>{loan.firstName} {loan.lastName}</td>
                      <td>&#8369;{monify(loan.amount)}</td>
                      <td>{loan.terms} days</td>
                      <td>{moment(loan.loanDate).tz('Asia/Manila').format('MMMM DD, YYYY')}</td>
                      <td>{loan.loanStatus}</td>
                      <td><Link to={`/admin/loan/${loan.id}`} >View</Link></td>
                    </tr>
                  )
                })
                :
                <tr>
                  <td className="no-loans" colSpan={7}>No loans found.</td>
                </tr>
            }
          </tbody>
        </table>
      </div>
      <Pagination totalPage={totalPage} activePage={currentPage} onPageChange={setCurrentPage} />
    </div>
  )
}

export default AllLoans;