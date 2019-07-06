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
import { registerUser } from 'store/actions/authActions';


function signUp() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
}

function SignUp(props) {
  const [signUpState, setSignUpState] = useState({
    values: {
      name:'',
      email: '',
      password: ''
    },
    touched: {
      name:false,
      email: false,
      password: false
    },
    errors: {
      name:null,
      email: null,
      password: null
    },
    isValid: false,
    isLoading: false,
    submitError: null
  });

  const validateForm = _.debounce(() => {
    const { values } = signUpState;
    const newState = { ...signUpState };
    const errors = validate(values, schema);
    newState.errors = errors || {};
    newState.isValid = errors ? false : true;
    setSignUpState(newState);
  }, 300);

  function handleFieldChange(field, value) {
    const newState = { ...signUpState };
    newState.submitError = null;
    newState.touched[field] = true;
    newState.values[field] = value;
    setSignUpState(newState);
    validateForm();
  }

  function handleSignUp() {
    try {
      const newState = { ...signUpState };
      newState.isLoading = true;
      setSignUpState(newState);
      signUp(values);
      props.registerUser(values);
    } catch (error) {
      signUpState({
        ...signUpState,
        isLoading: false,
        submitError: error
      });
    }
  }

  useEffect(() => {
    setTimeout(() => {
     if (props.auth.isAuthenticated) {
        setSignUpState({
          ...signUpState,
          isLoading: false
        });
//        props.history.push('/');
     }
    }, 1000);
  });

  const { classes } = props;
  const {
    isLoading,
    values,
    touched,
    errors,
    isValid,
    submitError
  } = signUpState;

  const showNameError = touched.name && errors.name;
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
            Sign Up
          </Typography>
          <div className={classes.fields}>
            <div className={classes.field}>
                <TextField
                  autoComplete="off"
                  className={classes.textField}
                  fullWidth
                  label="Full Name"
                  name="name"
                  onChange={event =>
                    handleFieldChange('name', event.target.value)
                  }
                  type="text"
                  value={values.name}
                  variant="outlined"
                />
                {showNameError && (
                  <Typography
                    className={classes.fieldError}
                    variant="body2"
                  >
                    {errors.name[0]}
                  </Typography>
                )}
              </div>
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
                className={classes.signUpButton}
                color="primary"
                disabled={!isValid}
                onClick={handleSignUp}
                size="large"
                variant="contained"
              >
                Sign Up
              </Button>
            )}
          </div>
        </form>
      </Grid>
    </div>
  );
}

SignUp.propTypes = {
  auth: PropTypes.object,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  errors: PropTypes.object,
  history: PropTypes.object.isRequired,
  registerUser: PropTypes.func
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(
  compose(
    withRouter,
    withStyles(styles)
  )(SignUp)
);
