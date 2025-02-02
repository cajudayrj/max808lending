import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={
        props => JSON.parse(window.localStorage.getItem('userData')) ? (
          <Component {...props} />
        ) : (
            <Redirect to={{
              pathname: "/",
              state: { from: props.location }
            }}
            />
          )
      }
    />
  )
}

export default PrivateRoute;