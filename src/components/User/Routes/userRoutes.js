import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UserDashboard from '../Dashboard/userDashboard';

const UserRoutes = ({ handleLogout }) => {
  return (
    <Switch>
      <Route path="/dashboard" render={() => <UserDashboard handleLogout={handleLogout} />} />
    </Switch>
  )
}

export default UserRoutes;