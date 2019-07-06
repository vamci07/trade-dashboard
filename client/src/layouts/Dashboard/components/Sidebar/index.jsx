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
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';

// Material icons
import {
  Code as CodeIcon,
  DashboardOutlined as DashboardIcon,
  List as ListIcon,
  AccountBoxOutlined as AccountBoxIcon,
  TrendingUpOutlined as TrendingUpIcon,
  SettingsOutlined as SettingsIcon,
  ChevronLeft as CollapseIcon
} from '@material-ui/icons';

// Component styles
import styles from './styles';

class Sidebar extends Component {
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
            <div className={classes.logoWrapper}>
              <ListItemIcon className={classes.logoIcon}>
                <CodeIcon className={classes.logoIcon} />
              </ListItemIcon>
              <Typography className={classes.logoTitle}>tradeio</Typography>
            </div>
          </Link>
        </div>
        <Divider className={classes.logoDivider} />
        <div className={classes.profile}>
          <Link to="/account">
            <Avatar
              alt="Roman Kutepov"
              className={classes.avatar}
              src="/images/avatars/high-res.png"
            />
          </Link>
          <Typography
            className={classes.nameText}
            variant="h6"
          >
            Roman Kutepov
          </Typography>
          <Typography
            className={classes.bioText}
            variant="caption"
          >
            Brain Director
          </Typography>
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
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Dashboard"
            /> 
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
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="History"
            />
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
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Analytics"
            />
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
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Settings"
            />
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
            <CollapseIcon className={classes.expandIcon} />
          </ListItemIcon>
        </List>
      </nav>
    );
  }
}

Sidebar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sidebar);
