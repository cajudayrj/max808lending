import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainDashboard from '../MainDashboard/mainDashboard';
import MyAccount from '../MyAccount/myAccount';

const UserDashboardRoutes = () => {
  return (
    <Switch>
      <Route exact path="/dashboard" component={MainDashboard} />
      <Route exact path="/dashboard/my-account" component={MyAccount} />
    </Switch>
  )
}

export default UserDashboardRoutes;