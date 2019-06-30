import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

// Externals
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import validate from 'validate.js';
import _ from 'underscore';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Grid,
  Button,
  CircularProgress,
  TextField,
  Typography
} from '@material-ui/core';

// Component styles
import styles from './styles';

// Form validation schema
import schema from './schema';

import { connect } from 'react-redux';
import { loginUser } from 'store/actions/authActions';

// Service methods
const signIn = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
  }

  // eslint-disable-next-line no-unused-vars
  async componentDidUpdate(prevProps, prevState) {
    if (this.props.auth.isAuthenticated !== prevProps.auth.isAuthenticated) {
      if (this.props.auth.isAuthenticated) {
        const { history } = this.props;
        // eslint-disable-next-line react/no-did-update-set-state
        await this.setState({ isLoading: false });
        history.push('/dashboard');
      }
    }
  }

  handleBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  validateForm = _.debounce(() => {
    const { values } = this.state;
    const newState = { ...this.state };
    const errors = validate(values, schema);
    newState.errors = errors || {};
    newState.isValid = errors ? false : true;
    this.setState(newState);
  }, 300);

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState.submitError = null;
    newState.touched[field] = true;
    newState.values[field] = value;
    this.setState(newState, this.validateForm);
  };

  handleSignIn = async () => {
    try {
      await this.setState({ isLoading: true });
      const { values } = this.state;
      await signIn(values);
      this.props.loginUser(values);
    } catch (error) {
      this.setState({
        isLoading: false,
        serviceError: error
      });
    }
  };

  render() {
    const { classes } = this.props;
    const {
      isLoading,
      values,
      touched,
      errors,
      isValid,
      submitError
    } = this.state;

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
                    this.handleFieldChange('email', event.target.value)
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
                    this.handleFieldChange('password', event.target.value)
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
                  onClick={this.handleSignIn}
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
}

SignIn.propTypes = {
  auth: PropTypes.object,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  errors: PropTypes.object,
  history: PropTypes.object.isRequired
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
