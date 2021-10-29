import { GlobalStyle } from "../global-style";
import { DefaultTheme, ThemeProvider } from "styled-components";
import React from "react";

interface ThemePageProps {
  theme: DefaultTheme;
}

export const ThemePage: React.FC<ThemePageProps> = ({ children, theme }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);
