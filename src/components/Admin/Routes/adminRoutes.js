import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminDashboard from '../AdminDashboard/adminDashboard';
import Loan from '../Loan/loan';

const AdminRoutes = ({ handleLogout }) => {
  return (
    <Switch>
      <Route exact path="/admin/loan/:id" component={Loan} />
      <Route path="/admin" render={() => <AdminDashboard handleLogout={handleLogout} />} />
    </Switch>
  )
}

export default AdminRoutes;