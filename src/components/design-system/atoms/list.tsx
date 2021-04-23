import styled from "styled-components";

export const List = styled.ul`
  font-size: ${(props) => props.theme.fontSizes[2]};
  color: ${(props) => props.theme.light.primaryTextColor};
  line-height: ${(props) => props.theme.lineHeight};

  @media (prefers-color-scheme: dark) {
    color: ${(props) => props.theme.dark.primaryTextColor};
  }
`;
