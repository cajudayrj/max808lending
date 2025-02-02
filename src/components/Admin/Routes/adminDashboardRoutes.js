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
import UserList from '../UserList/userList';
import UserInfo from '../UserInfo/userInfo';
import SummaryOfTransactions from '../SummaryOfTransactions/summaryOfTransactions';
import BannedUsers from '../BannedUsers/bannedUsers';
import PaymentSchedule from '../PaymentSchedule/paymentSchedule';

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
      <Route exact path="/admin/summary-of-transactions" component={SummaryOfTransactions} />
      <Route exact path="/admin/payment-summary-schedule" component={PaymentSchedule} />
      <Route exact path="/admin/user-list" component={UserList} />
      <Route exact path="/admin/banned-user-list" component={BannedUsers} />
      <Route exact path="/admin/user/:id" component={UserInfo} />
      <Route exact path="/admin/*" component={NotFound} />
    </Switch>
  )
}

export default AdminDashboardRoutes;