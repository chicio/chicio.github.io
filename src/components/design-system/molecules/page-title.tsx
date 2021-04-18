import styled from "styled-components";
import { Heading1 } from "../atoms/heading1";

export const PageTitle = styled(Heading1)`
  margin-bottom: ${(props) => props.theme.spacing[4]};
`;
