import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainDashboard from '../MainDashboard/mainDashboard';
import UserInfo from '../../Admin/UserInfo/userInfo';
import TransactionHistory from '../TransactionHistory/transactionHistory';

const UserDashboardRoutes = () => {
  return (
    <Switch>
      <Route exact path="/dashboard" component={MainDashboard} />
      <Route exact path="/dashboard/my-account" component={UserInfo} />
      <Route exact path="/dashboard/transaction-history" component={TransactionHistory} />
    </Switch>
  )
}

export default UserDashboardRoutes;