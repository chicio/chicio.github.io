import { theme } from "../../theme";
import { GlobalStyle } from "../../global-style";
import { ThemeProvider } from "styled-components";
import React from "react";

export const Page: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);
