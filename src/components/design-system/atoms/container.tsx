import styled from "styled-components";
import { ContainerFluid } from "./container-fluid";

export const Container = styled(ContainerFluid)`
  @media (min-width: 576px) {
    max-width: 540px;
  }

  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 992px) {
    max-width: 960px;
  }
`;
