import "styled-components";

interface Colors {
  primaryColor: string;
  secondaryColor: string;
  primaryColorDark: string;
  primaryColorLight: string;
  generalBackground: string;
  textAbovePrimaryColor: string;
  primaryTextColor: string;
  secondaryTextColor: string;
  accentColor: string;
  accentColorAbovePrimaryColor: string;
  generalBackgroundLight: string;
  boxShadowLight: string;
  dividerColor: string;
}

declare module "styled-components" {
  export interface DefaultTheme {
    dark: Colors;
    light: Colors;
    fontSizes: string[];
    spacing: string[];
    lineHeight: number;
  }
}
