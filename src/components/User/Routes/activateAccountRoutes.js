import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ActivateStepOne from '../UserActivateStep/activateStepOne';
import ActivateStepTwo from '../UserActivateStep/activateStepTwo';
import ActivateStepThree from '../UserActivateStep/activateStepThree';
import ActivateStepFour from '../UserActivateStep/activateStepFour';

const ActivateAccountRoutes = () => {
  return (
    <Switch>
      <Route exact path="/activate-account/step-one" component={ActivateStepOne} />
      <Route exact path="/activate-account/step-two" component={ActivateStepTwo} />
      <Route exact path="/activate-account/step-three" component={ActivateStepThree} />
      <Route exact path="/activate-account/step-four" component={ActivateStepFour} />
    </Switch>
  )
}

export default ActivateAccountRoutes;