import styled from "styled-components";
import { Container } from "./container";

export const Section = styled(Container)`
  padding: ${(props) => props.theme.spacing[2]} 0;
`;
