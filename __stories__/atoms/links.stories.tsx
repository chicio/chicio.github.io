import React from "react";
import { Meta } from "@storybook/react";
import { StandardInternalLink } from "../../src/components/design-system/atoms/standard-internal-link";
import { StandardExternalLink } from "../../src/components/design-system/atoms/standard-external-link";

export const Links: React.FC = () => (
  <>
    <div>
      <StandardInternalLink to={""}>An internal link</StandardInternalLink>
    </div>
    <div>
      <StandardExternalLink>An external link</StandardExternalLink>
    </div>
  </>
);

export default {
  title: "Atoms/Typography",
  component: Links,
} as Meta;
