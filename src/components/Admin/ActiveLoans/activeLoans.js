import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import handleRedirects from '../../../assets/helpers/handleRedirects';
import moment from 'moment-timezone';
import axios from 'axios';
import serverUrl from '../../../serverUrl';
import Pagination from '../../Pagination/pagination';
import ExportExcel from '../../../assets/helpers/exportExcel';

const ActiveLoans = () => {
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const history = useHistory();
  const [activeLoans, setActiveLoans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const fields = {
    "id": "Loan ID",
    "firstName": "First Name",
    "lastName": "Last Name",
    "amount": "Loan Amount",
    "loanBalance": "Balance",
    "terms": "Terms",
    "loanDate": "Loan Issued Date",
    "dueDate": "Last Due Date",
    "loanStatus": "Status"
  }

  useEffect(() => {
    if (userData.userLevel !== 1) {
      handleRedirects(history);
      return;
    }
    axios(`${serverUrl}/loans/active/page/${currentPage}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${userData.authToken}`
      }
    })
      .then(({ data }) => {
        const { activeLoans, totalPage } = data;
        setActiveLoans(activeLoans);
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
    <div className="admin-loans-dashboard active-loan-dashboard">
      <h1 className="header-title">Active Loans</h1>
      <ExportExcel
        data={activeLoans}
        fileName="Active Loans"
        fields={fields}
        buttonLabel="Generate Excel"
      />
      <div className="loans-table">
        <table>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Borrower</th>
              <th>Loan Amount</th>
              <th>Balance</th>
              <th>Terms</th>
              <th>Loan Issued Date</th>
              <th>Last Due Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              activeLoans.length > 0 ?
                activeLoans.map((loan, key) => {
                  return (
                    <tr key={key}>
                      <td><Link to={`/admin/loan/${loan.id}`} >{loan.id}</Link></td>
                      <td>{loan.firstName} {loan.lastName}</td>
                      <td>&#8369;{monify(loan.amount)}</td>
                      <td>&#8369;{monify(loan.loanBalance)}</td>
                      <td>{loan.terms} days</td>
                      <td>{moment(loan.loanDate).tz('Asia/Manila').format('MMMM DD, YYYY')}</td>
                      <td>{moment(loan.dueDate).tz('Asia/Manila').format('MMMM DD, YYYY')}</td>
                      <td>{loan.loanStatus}</td>
                      <td><Link to={`/admin/loan/${loan.id}`} >View</Link></td>
                    </tr>
                  )
                })
                :
                <tr>
                  <td className="no-loans" colSpan={7}>No active loans found.</td>
                </tr>
            }
          </tbody>
        </table>
      </div>
      <Pagination totalPage={totalPage} activePage={currentPage} onPageChange={setCurrentPage} />
    </div>
  )
}

export default ActiveLoans;