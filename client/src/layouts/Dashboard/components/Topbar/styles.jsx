import { Z_FIXED } from "zlib";

export default theme => ({
  root: {
    width: '100%',
    height: 60,
    borderBottom: `1px solid ${theme.palette.border}`,
    backgroundColor: theme.palette.background.topBar,
    display: 'flex',
    alignItems: 'flex-start'
  },
  toolbar: {
    minHeight: 'auto',
    width: '100%'
  },
  title: {
    marginLeft: theme.spacing.unit,
    color: theme.palette.primary.contrastText
  },
  menuButton: {
    marginLeft: '-4px'
  },
  notificationsButton: {
    marginLeft: 'auto'
  },
  signOutButton: {
    marginLeft: theme.spacing.unit
  }
});
