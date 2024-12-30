import { css } from "styled-components";

export const backgroundGradients = css`
  background-image: linear-gradient(
    to bottom,
    ${(props) => props.theme.dark.secondaryColor},
    ${(props) => props.theme.dark.primaryColor}
  );
`;
