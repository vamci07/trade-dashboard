import { white, black } from '@material-ui/core/colors/common';
import {
  grey,
  green,
  blue,
  orange,
  red,
  blueGrey
} from '@material-ui/core/colors';

export default {
  type: 'light',
  common: {
    black,
    white,
    neutral: grey[200],
    muted: grey[500]
  },
  primary: {
    contrastText: black,
    main: blue[500],
    light: blue[100]
  },
  secondary: {
    contrastText: black,
    main: blue[800],
    light: blue[400]
  },
  success: {
    contrastText: black,
    main: green[500],
    light: green[100]
  },
  info: {
    contrastText: black,
    main: orange[500],
    light: orange[100]
  },
  warning: {
    contrastText: black,
    main: orange[500],
    light: orange[100]
  },
  danger: {
    contrastText: black,
    main: red[500],
    light: red[100]
  },
  text: {
    primary: blueGrey[800],
    secondary: blue[500],
    disabled: grey[500]
  },
  background: {
    default: white,
    dark: '#172B4D',
    paper: white,
    topBar: blue[500]
  },
  border: blueGrey[50],
  divider: blueGrey[50]
};
