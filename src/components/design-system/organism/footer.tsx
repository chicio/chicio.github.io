import { FC } from "react";
import { tracking } from "../../../logic/tracking";
import { SocialContacts } from "./social-contacts";
import styled from "styled-components";
import { Paragraph } from "../atoms/paragraph";
import { slugs } from "../../../logic/slug";
import { MenuItemWithTracking } from "../../menu-item-with-tracking";
import { mediaQuery } from "../utils-css/media-query";

const FooterContainer = styled.footer`
  flex-shrink: 0;
  width: 100%;
  background-color: ${(props) => props.theme.light.primaryColor};

  ${mediaQuery.dark} {
    background-color: ${(props) => props.theme.dark.primaryColor};
  }
`;

const FooterMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  padding: ${(props) => props.theme.spacing[2]};
`;

const FooterMenuItem = styled(MenuItemWithTracking)`
  margin: ${(props) => props.theme.spacing[0]};

  ${mediaQuery.inputDevice.mouse} {
    transition: transform 0.15s;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

const FooterContentContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${(props) => props.theme.spacing[0]};
  text-align: center;
  flex-wrap: wrap;
`;

const FooterAuthorDescription = styled.div`
  padding: ${(props) => props.theme.spacing[2]};
  background-color: ${(props) => props.theme.light.primaryColorDark};

  ${mediaQuery.dark} {
    color: ${(props) => props.theme.dark.primaryColorDark};
  }
`;

const MadeWithLoveParagraph = styled(Paragraph)`
  color: ${(props) => props.theme.light.textAbovePrimaryColor};

  ${mediaQuery.dark} {
    color: ${(props) => props.theme.dark.textAbovePrimaryColor};
  }
`;

export interface FooterProps {
  author: string;
  trackingCategory: string;
}

export const Footer: FC<FooterProps> = ({ author, trackingCategory }) => (
  <FooterContainer>
    <FooterMenu>
      <FooterMenuItem
        to="/"
        trackingData={{
          action: tracking.action.open_home,
          category: trackingCategory,
          label: tracking.label.footer,
        }}
        selected={false}
      >
        Home
      </FooterMenuItem>
      <FooterMenuItem
        to={slugs.blog}
        trackingData={{
          action: tracking.action.open_blog,
          category: trackingCategory,
          label: tracking.label.footer,
        }}
        selected={false}
      >
        Blog
      </FooterMenuItem>
      <FooterMenuItem
        to={slugs.art}
        trackingData={{
          action: tracking.action.open_art,
          category: trackingCategory,
          label: tracking.label.footer,
        }}
        selected={false}
      >
        Art
      </FooterMenuItem>
      <FooterMenuItem
        to={slugs.aboutMe}
        trackingData={{
          action: tracking.action.open_about_me,
          category: trackingCategory,
          label: tracking.label.footer,
        }}
        selected={false}
      >
        About Me
      </FooterMenuItem>
      <FooterMenuItem
        to={slugs.archive}
        trackingData={{
          action: tracking.action.open_blog_archive,
          category: trackingCategory,
          label: tracking.label.footer,
        }}
        selected={false}
      >
        Archive
      </FooterMenuItem>
      <FooterMenuItem
        to={slugs.tags}
        trackingData={{
          action: tracking.action.open_blog_tags,
          category: trackingCategory,
          label: tracking.label.footer,
        }}
        selected={false}
      >
        Tags
      </FooterMenuItem>
    </FooterMenu>
    <FooterAuthorDescription>
      <SocialContacts
        trackingCategory={trackingCategory}
        trackingLabel={tracking.label.footer}
      />
      <FooterContentContainer>
        <MadeWithLoveParagraph>
          {`Made with 💝 by ${author} 'Chicio'`}
        </MadeWithLoveParagraph>
      </FooterContentContainer>
    </FooterAuthorDescription>
  </FooterContainer>
);

export default Footer;
