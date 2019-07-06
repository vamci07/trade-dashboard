import React from 'react';
import { Route } from 'react-router-dom';
import { Dashboard as DashboardLayout } from 'layouts';
import Dashboard from 'views/Dashboard';
import History from 'views/History';
import UnderDevelopment from 'views/UnderDevelopment';
import NotFound from 'views/NotFound';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },
  item: {
    height: '100%'
  }
});

function Landing(props) {
  const { classes } = props;

  return (
    <DashboardLayout title="Dashboard">
      <div className={classes.root}>
        <Route
          component={Dashboard}
          exact
          path="/dashboard"
        />
        <Route
          component={History}
          exact
          path="/History"
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
      </div>
    </DashboardLayout>
  );
}

export default withStyles(styles)(Landing);
