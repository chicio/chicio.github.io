import styled from "styled-components";

export const StandardLink = styled.a`
  color: ${(props) => props.theme.light.accentColor};

  @media (prefers-color-scheme: dark) {
    color: ${(props) => props.theme.dark.accentColor};
  }

  &:hover {
    color: ${(props) => props.theme.light.accentColor};

    @media (prefers-color-scheme: dark) {
      color: ${(props) => props.theme.dark.accentColor};
    }
  }
`;
