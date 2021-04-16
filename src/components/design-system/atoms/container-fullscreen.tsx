import styled from "styled-components";

export const ContainerFullscreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: ${(props) => props.theme.light.primaryColor};

  @media (prefers-color-scheme: dark) {
    background-color: ${(props) => props.theme.dark.primaryColor};
  }
`;
