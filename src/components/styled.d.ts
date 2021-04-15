import "styled-components";

interface Colors {
  primaryColor: string;
  primaryColorDark: string;
  generalBackground: string;
  primaryColorText: string;
  accentColor: string;
}

declare module "styled-components" {
  export interface DefaultTheme {
    dark: Colors;
    light: Colors;
    fontSizes: string[];
    spacing: string[];
  }
}
