import {
  createGlobalStyle,
  DefaultTheme,
  GlobalStyleComponent,
} from "styled-components";

export const GlobalStyle: GlobalStyleComponent<
  {},
  DefaultTheme
> = createGlobalStyle`
  @font-face {
    font-family: 'Open Sans';
    src: local("Open Sans Regular"),
    url("/fonts/opensans/OpenSans-Regular.woff2") format("woff2"),
    url("/fonts/opensans/OpenSans-Regular.woff") format("woff"),
    url('/fonts/opensans/OpenSans-Regular.eot?#iefix') format('embedded-opentype'),
    url('/fonts/opensans/OpenSans-Regular.ttf') format('truetype'),
    url('/fonts/opensans/OpenSans-Regular.svg#OpenSansRegular') format('svg');
    font-weight: normal;
    font-style: normal;
    font-display: fallback;
  }

  html {
    max-width: 100%;
    overflow-x: hidden;
  }

  body {
    background-color: ${(props) => props.theme.light.generalBackground};
    font: ${(props) => props.theme.fontSizes[0]} 'Open Sans', Arial, sans-serif;
    max-width: 100%;
    margin: 0;

    @media (prefers-color-scheme: dark) {
      background-color: ${(props) => props.theme.dark.generalBackground};
    }
  }
`;
