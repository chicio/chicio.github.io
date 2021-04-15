import styled from "styled-components";

export const Heading1 = styled.h1`
  font-size: ${(props) => props.theme.fontSizes[12]};
  color: ${(props) => props.theme.light.primaryColorText};
  margin: ${(props) => props.theme.spacing[0]};

  @media (prefers-color-scheme: dark) {
    color: ${(props) => props.theme.dark.primaryColorText};
  }
`;
