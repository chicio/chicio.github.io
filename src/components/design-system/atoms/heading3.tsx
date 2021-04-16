import styled from "styled-components";

export const Heading3 = styled.h3`
  font-size: ${(props) => props.theme.fontSizes[9]};
  color: ${(props) => props.theme.light.primaryColorText};
  margin: ${(props) => props.theme.spacing[0]};

  @media (prefers-color-scheme: dark) {
    color: ${(props) => props.theme.dark.primaryColorText};
  }
`;
