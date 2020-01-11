import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import handleRedirects from '../../../assets/helpers/handleRedirects';
import axios from 'axios';
import serverUrl from '../../../serverUrl';
import Pagination from '../../Pagination/pagination';

const UserList = () => {
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    if (userData.userLevel !== 1) {
      handleRedirects(history);
      return;
    }
    axios(`${serverUrl}/user/all/page/${currentPage}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${userData.authToken}`
      }
    })
      .then(({ data }) => {
        const { users, totalPage } = data;
        setUsers(users);
        setTotalPage(totalPage);
      })

  }, [currentPage, history, userData.authToken, userData.userLevel])

  const toUpper = txt => txt.replace(/^\w/, c => c.toUpperCase());

  return (
    <div className="admin-loans-dashboard active-loan-dashboard">
      <h1 className="header-title">User List</h1>
      <div className="loans-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>User Level</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              users.length > 0 ?
                users.map((user, key) => {
                  return (
                    <tr key={key}>
                      <td>{user.id}</td>
                      <td>{`${user.firstName} ${user.middleName ? user.middleName.split('')[0] + '. ' : ''} ${user.lastName}`}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.mobileNum}</td>
                      <td>{toUpper(user.level)}</td>
                      <td><Link to={`/admin/user/${user.id}`} >View</Link></td>
                    </tr>
                  )
                })
                :
                <tr>
                  <td className="no-loans" colSpan={7}>No users found.</td>
                </tr>
            }
          </tbody>
        </table>
      </div>
      <Pagination totalPage={totalPage} activePage={currentPage} onPageChange={setCurrentPage} />
    </div>
  )
}

export default UserList;