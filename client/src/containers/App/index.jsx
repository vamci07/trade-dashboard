import React from 'react';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import theme from 'theme';
import { CssBaseline } from '@material-ui/core';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'assets/scss/index.scss';

import SignUp from 'views/SignUp';
import SignIn from 'views/SignIn';

import { setCurrentUser, logoutUser } from 'store/actions/authActions';
import jwt_decode from 'jwt-decode';
import setAuthToken from 'utils/setAuthToken';
import { createGenerateClassName, jssPreset } from '@material-ui/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import Landing from 'views/Landing';

const browserHistory = createBrowserHistory();

if (localStorage.jwtTokenTeams) {
  const token = localStorage.jwtTokenTeams;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  setCurrentUser(decoded);
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    logoutUser();
    window.location.href = './';
  }
}

const styleNode = document.createComment('jss-insertion-point');
document.head.insertBefore(styleNode, document.head.firstChild);

const generateClassName = createGenerateClassName();

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById('jss-insertion-point')
});

function App(props) {
  return (
    <JssProvider
      generateClassName={generateClassName}
      jss={jss}
    >
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <>
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
              {props.auth.isAuthenticated ? <Landing /> : null}
            </Router>
          </>
        </ThemeProvider>
      </MuiThemeProvider>
    </JssProvider>
  );
}

export default connect(
  state => ({
    auth: state.auth
  }),
  {
    setCurrentUser,
    logoutUser
  }
)(App);
