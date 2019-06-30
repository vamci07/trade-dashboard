import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import validate from 'validate.js';
import _ from 'underscore';
import { withStyles } from '@material-ui/core';
import {
  Grid,
  Button,
  CircularProgress,
  TextField,
  Typography
} from '@material-ui/core';
import styles from './styles';
import schema from './schema';
import { connect } from 'react-redux';
import { loginUser } from 'store/actions/authActions';

function signIn() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
}

function SignIn(props) {
  const [signInState, setSignInState] = useState({
    values: {
      email: '',
      password: ''
    },
    touched: {
      email: false,
      password: false
    },
    errors: {
      email: null,
      password: null
    },
    isValid: false,
    isLoading: false,
    submitError: null
  });

  const validateForm = _.debounce(() => {
    const { values } = signInState;
    const newState = { ...signInState };
    const errors = validate(values, schema);
    newState.errors = errors || {};
    newState.isValid = errors ? false : true;
    setSignInState(newState);
  }, 300);

  function handleFieldChange(field, value) {
    const newState = { ...signInState };
    newState.submitError = null;
    newState.touched[field] = true;
    newState.values[field] = value;
    setSignInState(newState);
    validateForm();
  }

  function handleSignIn() {
    try {
      const newState = { ...signInState };
      newState.isLoading = true;
      setSignInState(newState);
      signIn(values);
      props.loginUser(values);
    } catch (error) {
      signInState({
        ...signInState,
        isLoading: false,
        submitError: error
      });
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (props.auth.isAuthenticated) {
        setSignInState({
          ...signInState,
          isLoading: false
        });
        props.history.push('/dashboard');
      }
    }, 1000);
  }, [props.auth.isAuthenticated]);

  const { classes } = props;
  const {
    isLoading,
    values,
    touched,
    errors,
    isValid,
    submitError
  } = signInState;

  const showEmailError = touched.email && errors.email;
  const showPasswordError = touched.password && errors.password;

  return (
    <div className={classes.root}>
      <Grid
        className={classes.content}
        item
        xs={12}
      >
        <form className={classes.form}>
          <Typography
            className={classes.title}
            variant="h2"
          >
            Sign in
          </Typography>
          <div className={classes.fields}>
            <div className={classes.field}>
              <TextField
                autoComplete="off"
                className={classes.textField}
                fullWidth
                label="Email address"
                name="email"
                onChange={event =>
                  handleFieldChange('email', event.target.value)
                }
                type="text"
                value={values.email}
                variant="outlined"
              />
              {showEmailError && (
                <Typography
                  className={classes.fieldError}
                  variant="body2"
                >
                  {errors.email[0]}
                </Typography>
              )}
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Password"
                name="password"
                onChange={event =>
                  handleFieldChange('password', event.target.value)
                }
                type="password"
                value={values.password}
                variant="outlined"
              />
              {showPasswordError && (
                <Typography
                  className={classes.fieldError}
                  variant="body2"
                >
                  {errors.password[0]}
                </Typography>
              )}
            </div>
          </div>
          <div className={classes.actions}>
            {submitError && (
              <Typography
                className={classes.submitError}
                variant="body2"
              >
                {submitError}
              </Typography>
            )}
            {isLoading ? (
              <CircularProgress className={classes.progress} />
            ) : (
              <Button
                className={classes.signInButton}
                color="primary"
                disabled={!isValid}
                onClick={handleSignIn}
                size="large"
                variant="contained"
              >
                Sign in now
              </Button>
            )}
            <Typography
              className={classes.signUp}
              variant="body1"
            >
              Don't have an account?{' '}
              <Link
                className={classes.signUpUrl}
                to="/register"
              >
                Sign up
              </Link>
            </Typography>
          </div>
        </form>
      </Grid>
    </div>
  );
}

SignIn.propTypes = {
  auth: PropTypes.object,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  errors: PropTypes.object,
  history: PropTypes.object.isRequired,
  loginUser: PropTypes.func
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(
  compose(
    withRouter,
    withStyles(styles)
  )(SignIn)
);
