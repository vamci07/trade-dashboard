export default theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100vh',
    width: '100vw'
  },
  content: {
    height: '100%'
  },
  form: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(8)
  },
  fields: {
    width: 512,
    padding: 16,
    marginTop: theme.spacing(2)
  },
  field: {
    height: 96
  },
  textField: {
    width: '100%',
    '& + & ': {
      marginTop: theme.spacing(2)
    }
  },
  actions: {
    width: 240,
    padding: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  progress: {
    display: 'block',
    marginTop: theme.spacing(2),
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  signUpButton: {
    marginTop: theme.spacing(2),
    width: '100%'
  },
  signUp: {
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  signUpUrl: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
  fieldError: {
    color: theme.palette.danger.main,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1)
  },
  submitError: {
    color: theme.palette.danger.main,
    alignText: 'center',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2)
  }
});
