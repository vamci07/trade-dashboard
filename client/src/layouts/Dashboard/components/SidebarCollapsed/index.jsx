import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon
} from '@material-ui/core';

// Material icons
import {
  DashboardOutlined as DashboardIcon,
  Code as CodeIcon,
  List as ListIcon,
  TrendingUpOutlined as TrendingUpIcon,
  SettingsOutlined as SettingsIcon,
  ChevronRight as ExpandIcon
} from '@material-ui/icons';

// Component styles
import styles from './styles';

class SidebarCollapsed extends Component {
  render() {
    const { classes, className, onToggleSidebar } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <nav className={rootClassName}>
        <div className={classes.logoWrapper}>
          <Link
            className={classes.logoLink}
            to="/"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <CodeIcon className={classes.logoIcon} />
            </ListItemIcon>
          </Link>
        </div>
        <Divider className={classes.logoDivider} />
        <div className={classes.profile}>
          <Link to="/account">
            <Avatar
              alt="Name"
              className={classes.avatar}
              src="/images/avatars/low-res.png"
            />
          </Link>
        </div>
        <Divider className={classes.profileDivider} />
        <List
          component="div"
          disablePadding
        >
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/dashboard"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <DashboardIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/History"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <ListIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/Analytics"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <TrendingUpIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/settings"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <SettingsIcon />
            </ListItemIcon>
          </ListItem>
        </List>
        <List
          className={classes.footerList}
          component="div"
          disablePadding
        >
          <ListItemIcon
            className={classes.footerIcon}
            onClick={onToggleSidebar}
          >
            <ExpandIcon className={classes.expandIcon} />
          </ListItemIcon>
        </List>
      </nav>
    );
  }
}

SidebarCollapsed.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SidebarCollapsed);
