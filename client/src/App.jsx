import React, { Component } from 'react';
import { createBrowserHistory } from 'history';

// Externals
import { Chart } from 'react-chartjs-2';

// Material helpers
import { ThemeProvider } from '@material-ui/styles';

// ChartJS helpers
import { chartjs } from './helpers';

// Theme
import theme from './theme';

// Styles
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';

import { Router, Switch, Route, Redirect } from 'react-router-dom';

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

// Store
import { Provider } from 'react-redux';
import store from './store';

import { setCurrentUser, logoutUser } from 'store/actions/authActions';

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

// Browser history
const browserHistory = createBrowserHistory();

// Configure ChartJS
Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={browserHistory}>
            <Route component={SignIn} exact path="/" />
            <Route component={SignUp} exact path="/register" />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <Route
              component={UnderDevelopment}
              exact
              path="/under-development"
            />
            <Route component={NotFound} exact path="/not-found" />
          </Router>
        </ThemeProvider>
      </Provider>
    );
  }
}
