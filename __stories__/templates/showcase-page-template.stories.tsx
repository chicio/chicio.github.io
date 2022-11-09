import { Meta, Story } from "@storybook/react";
import { BlogPageProps } from "../../src/components/design-system/templates/blog-page-template";
import { OgPageType } from "../../src/logic/seo";
import { ProfilePresentation } from "../../src/components/design-system/organism/profile-presentation";
import { ShowcasePageTemplate } from "../../src/components/design-system/templates/showcase-page-template";
import { BackgroundFullScreen } from "../../src/components/background-fullscreen";
import BottomIndex from "../../src/components/bottom-index";
import { blogTheme } from "../../src/components/design-system/theme";

export const ShowcasePageTemplateStory: Story<BlogPageProps> = () => (
  <ShowcasePageTemplate
    cookieConsentColor={"#FF0000"}
    location={{
      pathname: "/",
      url: "http://localhost:8000/",
    }}
    theme={blogTheme}
    fullScreenComponent={
      <>
        <BackgroundFullScreen />
        <ProfilePresentation author={"author"} />
      </>
    }
    trackingCategory={"tracking"}
    ogPageType={OgPageType.Person}
    featuredImage={"url"}
  >
    <BottomIndex author={"author"} />
  </ShowcasePageTemplate>
);

ShowcasePageTemplateStory.storyName = "Showcase Page Template";

export default {
  title: "Templates/Showcase Page Template",
  component: ShowcasePageTemplate,
} as Meta;
