import { FC } from "react";
import { tracking } from "../logic/tracking";
import { graphql, PageProps, useStaticQuery } from "gatsby";
import { BlogPageTemplate } from "../components/design-system/templates/blog-page-template";
import { Heading1 } from "../components/design-system/atoms/heading1";
import { Heading4 } from "../components/design-system/atoms/heading4";
import { List } from "../components/design-system/atoms/list";
import { ContainerSection } from "../components/design-system/atoms/container-section";
import { Paragraph } from "../components/design-system/atoms/paragraph";
import { StandardExternalLink } from "../components/design-system/atoms/standard-external-link";
import { OgPageType } from "../logic/seo";
import { getCurrentLocationFrom } from "../logic/current-location";

const PrivacyPolicy: FC<PageProps> = ({ location }) => {
  const data = useStaticQuery<Queries.PrivacyPolicyQuery>(
    graphql`
      query PrivacyPolicy {
        site {
          siteMetadata {
            title
            author
            featuredImage
          }
        }
      }
    `
  );
  const siteMetadata = data.site!.siteMetadata!;
  const author = siteMetadata.author!;
  const featuredImage = siteMetadata.featuredImage!;

  return (
    <BlogPageTemplate
      location={getCurrentLocationFrom(location)}
      author={author}
      ogPageType={OgPageType.WebSite}
      ogImage={featuredImage}
      trackingCategory={tracking.category.privacy_policy}
    >
      <Heading1>Privacy Policy</Heading1>
      <Paragraph>
        Fabrizio Duroni built the chicio coding app as a Free app. This SERVICE
        is provided by Fabrizio Duroni at no cost and is intended for use as is.
      </Paragraph>
      <Paragraph>
        This page is used to inform visitors regarding my policies with the
        collection, use, and disclosure of Personal Information if anyone
        decided to use my Service.
      </Paragraph>
      <Paragraph>
        If you choose to use my Service, then you agree to the collection and
        use of information in relation to this policy. The Personal Information
        that I collect is used for providing and improving the Service. I will
        not use or share your information with anyone except as described in
        this Privacy Policy.
      </Paragraph>
      <Paragraph>
        The terms used in this Privacy Policy have the same meanings as in our
        Terms and Conditions, which is accessible at chicio coding unless
        otherwise defined in this Privacy Policy.
      </Paragraph>
      <ContainerSection>
        <Heading4>Information Collection and Use</Heading4>
        <Paragraph>
          For a better experience, while using our Service, I may require you to
          provide us with certain personally identifiable information. The
          information that I request will be retained on your device and is not
          collected by me in any way.
        </Paragraph>
        <Paragraph>
          The app does use third party services that may collect information
          used to identify you.
        </Paragraph>
        <Paragraph>
          Link to privacy policy of third party service providers used by the
          app
        </Paragraph>
        <List>
          <li>
            <StandardExternalLink
              href="https://www.google.com/policies/privacy/"
              target="_blank"
              rel="noreferrer"
            >
              Google Play Services
            </StandardExternalLink>
          </li>
        </List>
      </ContainerSection>
      <ContainerSection>
        <Heading4>Log Data</Heading4>
        <Paragraph>
          I want to inform you that whenever you use my Service, in a case of an
          error in the app I collect data and information (through third party
          products) on your phone called Log Data. This Log Data may include
          information such as your device Internet Protocol (“IP”) address,
          device name, operating system version, the configuration of the app
          when utilizing my Service, the time and date of your use of the
          Service, and other statistics.
        </Paragraph>
      </ContainerSection>
      <ContainerSection>
        <Heading4>Cookies</Heading4>
        <Paragraph>
          Cookies are files with a small amount of data that are commonly used
          as anonymous unique identifiers. These are sent to your browser from
          the websites that you visit and are stored on your device&apos;s
          internal memory.
        </Paragraph>
        <Paragraph>
          This Service does not use these “cookies” explicitly. However, the app
          may use third party code and libraries that use “cookies” to collect
          information and improve their services. You have the option to either
          accept or refuse these cookies and know when a cookie is being sent to
          your device. If you choose to refuse our cookies, you may not be able
          to use some portions of this Service.
        </Paragraph>
      </ContainerSection>
      <ContainerSection>
        <Heading4>Service Providers</Heading4>
        <Paragraph>
          I may employ third-party companies and individuals due to the
          following reasons:
        </Paragraph>
        <List>
          <li>To facilitate our Service;</li>
          <li>To provide the Service on our behalf;</li>
          <li>To perform Service-related services; or</li>
          <li>To assist us in analyzing how our Service is used.</li>
        </List>
        <Paragraph>
          I want to inform users of this Service that these third parties have
          access to your Personal Information. The reason is to perform the
          tasks assigned to them on our behalf. However, they are obligated not
          to disclose or use the information for any other purpose.
        </Paragraph>
      </ContainerSection>
      <ContainerSection>
        <Heading4>
          <strong>Security</strong>
        </Heading4>
        <Paragraph>
          I value your trust in providing us your Personal Information, thus we
          are striving to use commercially acceptable means of protecting it.
          But remember that no method of transmission over the internet, or
          method of electronic storage is 100% secure and reliable, and I cannot
          guarantee its absolute security.
        </Paragraph>
      </ContainerSection>
      <ContainerSection>
        <Heading4>Links to Other Sites</Heading4>
        <Paragraph>
          This Service may contain links to other sites. If you click on a
          third-party link, you will be directed to that site. Note that these
          external sites are not operated by me. Therefore, I strongly advise
          you to review the Privacy Policy of these websites. I have no control
          over and assume no responsibility for the content, privacy policies,
          or practices of any third-party sites or services.
        </Paragraph>
      </ContainerSection>
      <ContainerSection>
        <Heading4>Children’s Privacy</Heading4>
        <Paragraph>
          These Services do not address anyone under the age of 13. I do not
          knowingly collect personally identifiable information from children
          under 13. In the case I discover that a child under 13 has provided me
          with personal information, I immediately delete this from our servers.
          If you are a parent or guardian and you are aware that your child has
          provided us with personal information, please contact me so that I
          will be able to do necessary actions.
        </Paragraph>{" "}
      </ContainerSection>
      <ContainerSection>
        <Heading4>
          <strong>Changes to This Privacy Policy</strong>
        </Heading4>
        <Paragraph>
          I may update our Privacy Policy from time to time. Thus, you are
          advised to review this page periodically for any changes. I will
          notify you of any changes by posting the new Privacy Policy on this
          page. These changes are effective immediately after they are posted on
          this page.
        </Paragraph>
      </ContainerSection>
      <ContainerSection>
        <Heading4>
          <strong>Contact Us</strong>
        </Heading4>
        <Paragraph>
          If you have any questions or suggestions about my Privacy Policy, do
          not hesitate to contact me.
        </Paragraph>
      </ContainerSection>
    </BlogPageTemplate>
  );
};

export default PrivacyPolicy;
