import { createMuiTheme } from "@material-ui/core/styles";
import { blueGrey, green, red } from "@material-ui/core/colors";

export const lightTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: [
      "Open Sans",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  },
  palette: {
    primary: {
      main: blueGrey[500]
    },
    secondary: {
      main: red[500]
    },
    type: "light"
  }
});

export const darkTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: [
      "Open Sans",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  },
  palette: {
    primary: {
      main: blueGrey[500]
    },
    secondary: {
      main: green[500]
    },
    type: "dark"
  }
});

export default { lightTheme, darkTheme };
