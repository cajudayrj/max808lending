import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UserDashboard from '../Dashboard/userDashboard';
import ActivateStepOne from '../UserActivateStep/activateStepOne';
import ActivateStepTwo from '../UserActivateStep/activateStepTwo';
import ActivateStepThree from '../UserActivateStep/activateStepThree';
import ActivateStepFour from '../UserActivateStep/activateStepFour';

const UserRoutes = ({ handleLogout }) => {
  return (
    <Switch>
      <Route path="/dashboard" render={() => <UserDashboard handleLogout={handleLogout} />} />
    </Switch>
  )
}

export default UserRoutes;