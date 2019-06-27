import { createMuiTheme } from "@material-ui/core/styles";

export const customTheme = theme =>
  createMuiTheme({
    ...theme,
    overrides: {
      MuiListItemIcon: {
        root: {
          color: "rgba(0, 0, 0, 0.54)",
          display: "inline-flex",
          minWidth: "56px",
          flexShrink: 0,
          justifyContent: "center"
        }
      }
    }
  });
