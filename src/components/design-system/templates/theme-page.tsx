import { GlobalStyle } from "../global-style";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { FC, ReactNode } from "react";

interface ThemePageProps {
  theme: DefaultTheme;
  children?: ReactNode;
}

export const ThemePage: FC<ThemePageProps> = ({ children, theme }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);
