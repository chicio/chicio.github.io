import styled from "styled-components";

export const Time = styled.time`
  color: ${(props) => props.theme.light.secondaryTextColor};

  @media (prefers-color-scheme: dark) {
    color: ${(props) => props.theme.dark.secondaryTextColor};
  }
`;
