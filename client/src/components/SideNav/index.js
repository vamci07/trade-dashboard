import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faTasks,
  faChevronRight,
  faChevronLeft
} from "@fortawesome/free-solid-svg-icons";
import { Slide } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  divOpen: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  divClose: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

export default function SideNav() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  function handleDrawerOpen() {
    setOpen(true);
    handleExpandClick();
  }

  function handleDrawerClose() {
    setOpen(false);
    handleExpandClick();
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
        open={open}
      >
        <div
          className={clsx({
            [classes.divOpen]: open,
            [classes.divClose]: !open
          })}
        >
          <IconButton>
            {!open ? (
              <FontAwesomeIcon
                icon={faChevronRight}
                onClick={handleDrawerOpen}
              />
            ) : (
              <FontAwesomeIcon
                icon={faChevronLeft}
                onClick={handleDrawerClose}
              />
            )}
          </IconButton>
        </div>
        <List>
          {["Dashboard", "Tasks"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <FontAwesomeIcon icon={faDollarSign} />
                ) : (
                  <FontAwesomeIcon icon={faTasks} />
                )}
              </ListItemIcon>
              <Slide direction="right" in={expanded} mountOnEnter unmountOnExit>
                <ListItemText primary={text} />
              </Slide>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
