import { StaticImage } from "gatsby-plugin-image";
import { Paragraph } from "../atoms/paragraph";
import styled from "styled-components";
import { ContainerFluid } from "../atoms/container-fluid";
import { mediaQuery } from "../utils-css/media-query";
import { FC } from "react";
import { Container } from "../atoms/container";

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
  font-size: ${(props) => props.theme.fontSizes[3]};

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

export const Technologies: FC<TechnologiesProps> = ({ author }) => (
  <TechnologiesContainer>
    <Container>
      <TechnologyParagraph>
        {`I’m ${author}, a software developer with over 15 years of experience, working in the field since 2008. I specialise in developing mobile 📱 and web applications 🚀. I also maintain small open-source projects and I have a blog where I speak about technology.`}
      </TechnologyParagraph>
    </Container>
    <TechnologiesIconsContainer>
      <TechnologyImageContainer>
        <StaticImage
          objectFit={"contain"}
          src={"../../../images/technologies/typescript.png"}
          alt={"typescript"}
          placeholder={"blurred"}
        />
      </TechnologyImageContainer>
      <TechnologyImageContainer>
        <StaticImage
          objectFit={"contain"}
          src={"../../../images/technologies/react.png"}
          alt={"react"}
          placeholder={"blurred"}
        />
      </TechnologyImageContainer>
      <TechnologyImageContainer>
        <StaticImage
          objectFit={"contain"}
          src={"../../../images/technologies/xcode.png"}
          alt={"xcode"}
          placeholder={"blurred"}
        />
      </TechnologyImageContainer>
      <TechnologyImageContainer>
        <StaticImage
          src={"../../../images/technologies/swift.png"}
          alt={"swift"}
          placeholder={"blurred"}
        />
      </TechnologyImageContainer>
      <TechnologyImageContainer>
        <StaticImage
          objectFit={"contain"}
          src={"../../../images/technologies/android.png"}
          alt={"android"}
          placeholder={"blurred"}
        />
      </TechnologyImageContainer>
    </TechnologiesIconsContainer>
  </TechnologiesContainer>
);
