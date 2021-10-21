import styled from "styled-components";
import { mediaQuery } from "../utils-css/media-query";

export const Paragraph = styled.p`
  font-size: ${(props) => props.theme.fontSizes[2]};
  color: ${(props) => props.theme.light.primaryTextColor};
  margin: ${(props) => props.theme.spacing[0]};
  line-height: ${(props) => props.theme.lineHeight};

  ${mediaQuery.dark} {
    color: ${(props) => props.theme.dark.primaryTextColor};
  }
`;
