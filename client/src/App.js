import React, { useState, useEffect } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider } from "@material-ui/styles";
import GlobalStyles from "shared/styles/globalStyles";
import { lightTheme, darkTheme } from "shared/styles/baseThemes";
import { customTheme } from "shared/styles/customTheme";
import Landing from "pages/Landing";
import SideNav from "components/SideNav";

function App() {
  const [trueLight, setTrueLight] = useState(true);
  const [appTheme, setAppTheme] = useState(lightTheme);

  function handleThemeChange() {
    setTrueLight(!trueLight);
  }

  useEffect(() => {
    if (trueLight) {
      setAppTheme(lightTheme);
    } else {
      setAppTheme(darkTheme);
    }
  }, [trueLight]);

  const theme = customTheme(appTheme);
  return (
    <ThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <>
          <GlobalStyles />
          <SideNav handleThemeChange={handleThemeChange} trueLight={trueLight} />
          <Landing />
        </>
      </StyledThemeProvider>
    </ThemeProvider>
  );
}

export default App;
