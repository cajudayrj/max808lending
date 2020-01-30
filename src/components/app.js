import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from './Homepage/homepage';
import Faq from './FAQ/faq';
import Borrow from './Borrow/borrow';
import Login from './Login/login';
import Verify from './Verify/verify';
import PrivateRoute from '../assets/helpers/privateRoute';
import User from './User/user';
import ActivateAccount from './User/ActivateAccount/activateAccount';
import Admin from './Admin/admin';
import ResendVerification from './ResendVerification/resendVerification';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/faq" component={Faq} />
        <Route exact path="/borrow" component={Borrow} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/verify-account" component={Verify} />
        <Route exact path="/resend-verification" component={ResendVerification} />
        <Route exact path="/verify-account/:verifyToken" component={Verify} />
        <PrivateRoute path="/dashboard" component={User} />
        <PrivateRoute path="/activate-account" component={ActivateAccount} />
        <PrivateRoute path="/admin" component={Admin} />
        <Route component={() => <p>Not Found</p>} />
      </Switch>
    </Router>
  )
}

export default App;