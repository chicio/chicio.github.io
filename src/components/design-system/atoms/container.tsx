import styled from "styled-components";
import { ContainerFluid } from "./container-fluid";
import { mediaQuery } from "../utils-css/media-query";

export const Container = styled(ContainerFluid)`
  ${mediaQuery.minWidth.xs} {
    max-width: 540px;
  }

  ${mediaQuery.minWidth.sm} {
    max-width: 720px;
  }

  ${mediaQuery.minWidth.md} {
    max-width: 960px;
  }
`;
