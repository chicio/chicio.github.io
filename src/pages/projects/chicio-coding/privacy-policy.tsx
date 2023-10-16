import { FC } from "react";
import { PageProps } from "gatsby";
import { PrivacyPolicyTemplate } from "../../../components/design-system/templates/privacy-policy";

const PrivacyPolicy: FC<PageProps> = ({ location }) => {
  return (
    <PrivacyPolicyTemplate
      appName={"Chicio Coding"}
      location={location}
      services={[]}
    />
  );
};

export default PrivacyPolicy;
