import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Components
import { PrivateRoute } from './components';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

// Views
import Dashboard from './views/Dashboard';
import SignUp from './views/SignUp';
import SignIn from './views/SignIn';
import UnderDevelopment from './views/UnderDevelopment';
import NotFound from './views/NotFound';

// Check for token to keep user logged in
if (localStorage.jwtTokenTeams) {
  // Set auth token header auth
  const token = localStorage.jwtTokenTeams;
  setAuthToken(token);

  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = './';
  }
}

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route component={SignIn} exact path="/" />
        <Route exact path="/register" component={SignUp} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <Route component={localStorage.jwtTokenTeams ? Dashboard : NotFound} />

        <Route component={UnderDevelopment} exact path="/under-development" />
        <Route component={NotFound} exact path="/not-found" />
        <Redirect to="/not-found" />
      </Switch>
    );
  }
}
