export default theme => ({
  topbar: {
    position: 'fixed',
    width: 'calc(-73px + 100vw)',
    top: 0,
    left: 0,
    right: 'auto',
    marginLeft: '73px',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  topbarShift: {
    marginLeft: '271px',
    width: 'calc(-271px + 100vw)'
  },
  drawerPaper: {
    zIndex: 1200,
    width: '271px'
  },
  sidebar: {
    width: '270px'
  },
  content: {
    marginTop: '61px',
    marginLeft: '73px',
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    zIndex: theme.zIndex.appBar
  },
  contentShift: {
    marginLeft: '270px',
    zIndex: theme.zIndex.appBar
  },
  drawerPaperCollapsed: {
    zIndex: 1200,
    width: '73px'
  },
  drawerOpen: {
    width: '270px',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  sidebarcollapsed: {
    width: '72px'
  }
});
