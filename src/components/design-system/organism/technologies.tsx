import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";
import { Paragraph } from "../atoms/paragraph";
import styled from "styled-components";
import { ContainerFluid } from "../atoms/container-fluid";
import { mediaQuery } from "../utils-css/media-query";

const TechnologiesContainer = styled(ContainerFluid)`
  margin: 0;
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.spacing[11]};
  background-color: ${(props) => props.theme.light.primaryColorDark};

  ${mediaQuery.dark} {
    background-color: ${(props) => props.theme.dark.primaryColorDark};
  }
`;

const TechnologyParagraph = styled(Paragraph)`
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing[7]};
  color: ${(props) => props.theme.light.textAbovePrimaryColor};

  ${mediaQuery.dark} {
    color: ${(props) => props.theme.dark.textAbovePrimaryColor};
  }

  ${mediaQuery.minWidth.md} {
    padding: 0 ${(props) => props.theme.spacing[12]};
  }
`;

const TechnologiesIconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const TechnologyImageContainer = styled.div`
  width: 80px;
  height: 80px;
  margin: ${(props) => props.theme.spacing[2]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export interface TechnologiesProps {
  author: string;
}

export const Technologies: React.FC<TechnologiesProps> = ({ author }) => (
  <TechnologiesContainer>
    <TechnologyParagraph>
      {`I'm ${author}, a software developer with many years of experience.
        I have a strong knowledge of the following languages: C++, Objective-C, Swift, C, Java, PHP,
        JavaScript, TypeScript, Kotlin.
        I develop mobile app since 2010 and web application since 2005. I'm also passionate about computer graphics.`}
    </TechnologyParagraph>
    <TechnologiesIconsContainer>
      <TechnologyImageContainer>
        <StaticImage
          objectFit={"contain"}
          src={"../../../images/technologies/xcode.png"}
          alt={"xcode"}
        />
      </TechnologyImageContainer>
      <TechnologyImageContainer>
        <StaticImage
          src={"../../../images/technologies/swift.png"}
          alt={"swift"}
        />
      </TechnologyImageContainer>
      <TechnologyImageContainer>
        <StaticImage
          objectFit={"contain"}
          src={"../../../images/technologies/android.png"}
          alt={"android"}
        />
      </TechnologyImageContainer>
      <TechnologyImageContainer>
        <StaticImage
          objectFit={"contain"}
          src={"../../../images/technologies/cpp.png"}
          alt={"c++"}
        />
      </TechnologyImageContainer>
      <TechnologyImageContainer>
        <StaticImage
          objectFit={"contain"}
          src={"../../../images/technologies/opengl-es.png"}
          alt={"opengl"}
        />
      </TechnologyImageContainer>
      <TechnologyImageContainer>
        <StaticImage
          objectFit={"contain"}
          src={"../../../images/technologies/react.png"}
          alt={"react"}
        />
      </TechnologyImageContainer>
      <TechnologyImageContainer>
        <StaticImage
          objectFit={"contain"}
          src={"../../../images/technologies/php.png"}
          alt={"php"}
        />
      </TechnologyImageContainer>
      <TechnologyImageContainer>
        <StaticImage
          objectFit={"contain"}
          src={"../../../images/technologies/html-css-js.png"}
          alt={"js"}
        />
      </TechnologyImageContainer>
      <TechnologyImageContainer>
        <StaticImage
          objectFit={"contain"}
          src={"../../../images/technologies/typescript.png"}
          alt={"typescript"}
        />
      </TechnologyImageContainer>
    </TechnologiesIconsContainer>
  </TechnologiesContainer>
);
