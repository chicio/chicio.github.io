import "styled-components";

interface Colors {
  primaryColor: string;
  primaryColorDark: string;
  primaryColorLight: string;
  generalBackground: string;
  primaryColorText: string;
  primaryTextColor: string;
  secondaryTextColor: string;
  accentColor: string;
  generalBackgroundLight: string;
  boxShadowLight: string;
}

declare module "styled-components" {
  export interface DefaultTheme {
    dark: Colors;
    light: Colors;
    fontSizes: string[];
    spacing: string[];
  }
}
