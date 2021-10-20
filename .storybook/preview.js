import React from 'react';
import { action } from "@storybook/addon-actions"
import { ThemeProvider } from 'styled-components';
import { theme } from "../src/components/design-system/theme";
import { GlobalStyle } from "../src/components/design-system/global-style";

/** https://www.gatsbyjs.com/docs/how-to/testing/visual-testing-with-storybook/ **/
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}

global.__BASE_PATH__ = "/"

window.___navigate = pathname => {
  action("NavigateTo:")(pathname)
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
