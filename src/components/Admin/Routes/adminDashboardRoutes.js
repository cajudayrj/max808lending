import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainAdminDashboard from '../MainAdminDashboard/mainAdminDashboard';
import AllLoans from '../AllLoans/allLoans';
import PendingLoans from '../PendingLoans/pendingLoans';
import ActiveLoans from '../ActiveLoans/activeLoans';
import RejectedLoans from '../RejectedLoans/rejectedLoans';
import ApprovedLoans from '../ApprovedLoans/approvedLoans';
import AcceptedLoans from '../AcceptedLoans/acceptedLoans';
import NotFound from '../Loan/notFound';
import FullyPaidLoans from '../FullyPaidLoans/fullyPaidLoans';

const AdminDashboardRoutes = () => {
  return (
    <Switch>
      <Route exact path="/admin" component={MainAdminDashboard} />
      <Route exact path="/admin/loans" component={AllLoans} />
      <Route exact path="/admin/pending-loans" component={PendingLoans} />
      <Route exact path="/admin/active-loans" component={ActiveLoans} />
      <Route exact path="/admin/fully-paid-loans" component={FullyPaidLoans} />
      <Route exact path="/admin/approved-loans" component={ApprovedLoans} />
      <Route exact path="/admin/accepted-loans" component={AcceptedLoans} />
      <Route exact path="/admin/rejected-loans" component={RejectedLoans} />
      <Route exact path="/admin/*" component={NotFound} />
    </Switch>
  )
}

export default AdminDashboardRoutes;