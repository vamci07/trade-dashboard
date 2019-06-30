import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from 'theme';
import { CssBaseline } from '@material-ui/core';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'assets/scss/index.scss';

import Dashboard from 'views/Dashboard';
import SignUp from 'views/SignUp';
import SignIn from 'views/SignIn';
import UnderDevelopment from 'views/UnderDevelopment';
import NotFound from 'views/NotFound';

import { Provider } from 'react-redux';
import store from 'store';
import { setCurrentUser, logoutUser } from 'store/actions/authActions';
import jwt_decode from 'jwt-decode';
import setAuthToken from 'utils/setAuthToken';

const browserHistory = createBrowserHistory();

if (localStorage.jwtTokenTeams) {
  const token = localStorage.jwtTokenTeams;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = './';
  }
}

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router history={browserHistory}>
          <Route
            component={SignIn}
            exact
            path="/"
          />
          <Route
            component={SignUp}
            exact
            path="/register"
          />
          <Route
            component={Dashboard}
            exact
            path="/dashboard"
          />
          <Route
            component={UnderDevelopment}
            exact
            path="/under-development"
          />
          <Route
            component={NotFound}
            exact
            path="/not-found"
          />
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
