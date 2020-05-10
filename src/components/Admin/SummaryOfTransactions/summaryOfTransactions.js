import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import handleRedirects from '../../../assets/helpers/handleRedirects';
import moment from 'moment-timezone';
import axios from 'axios';
import serverUrl from '../../../serverUrl';
import Pagination from '../../Pagination/pagination';
import ExportExcel from '../../../assets/helpers/exportExcel';

const SummaryOfTransactions = () => {
  // const userData = JSON.parse(window.localStorage.getItem('userData'));
  const history = useHistory();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [transactions, setTransactions] = useState({});
  const [allTransactions, setAllTransactions] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const fields = {
    "loan_id": "Loan ID",
    "fullName": "Borrower",
    "transactionDate": "Transaction Date",
    "description": "Description",
    "amount": "Amount"
  }

  useEffect(() => {
    if (userData.userLevel !== 1) {
      handleRedirects(history);
      return;
    }
    axios(`${serverUrl}/loans/transactions/page/${currentPage}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${userData.authToken}`
      }
    })
      .then(({ data }) => {
        setTotalPage(data.totalPage)
        setTransactions(data.transactions)
        setAllTransactions(data.allTransactions)
        console.log(data.allTransactions);

      })
      .catch(err => console.log(err));
  }, [currentPage]) // eslint-disable-line
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
      <ExportExcel
        data={allTransactions}
        fileName="Summary Transactions"
        fields={fields}
        buttonLabel="Generate Excel"
      />
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
              transactions.length > 0 ?
                transactions.map((transaction, key) => {
                  return (
                    <tr key={key}>
                      <td>{transaction.loan_id}</td>
                      <td>{transaction.firstName} {transaction.lastName}</td>
                      <td>{moment(transaction.transactionDate).tz('Asia/Manila').format('MMMM DD, YYYY')}</td>
                      <td className={transaction.description === "Penalty" ? 'penalty' : transaction.description === "Payment" ? 'payment' : ''}>{transaction.description}</td>
                      <td className={transaction.description === "Penalty" ? 'penalty' : transaction.description === "Payment" ? 'payment' : ''}>&#8369;{monify(transaction.amount)}</td>
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
      <Pagination totalPage={totalPage} activePage={currentPage} onPageChange={setCurrentPage} />
    </div>
  )
}

export default SummaryOfTransactions;