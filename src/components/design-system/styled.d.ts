import "styled-components";
import React, { ComponentProps } from "react";

interface Colors {
  primaryColor: string;
  secondaryColor: string;
  primaryColorDark: string;
  primaryColorLight: string;
  generalBackground: string;
  textAbovePrimaryColor: string;
  primaryTextColor: string;
  secondaryTextColor: string;
  accentColor: string;
  accentColorAbovePrimaryColor: string;
  generalBackgroundLight: string;
  boxShadowLight: string;
  dividerColor: string;
}

declare module "styled-components" {
  export interface DefaultTheme {
    dark: Colors;
    light: Colors;
    fontSizes: string[];
    spacing: string[];
    lineHeight: number;
  }

  type Stringify<PropName> = PropName extends string ? PropName : never;
  type DomElement = keyof React.JSX.IntrinsicElements | false;
  type OmitDomProps<
    CustomProps,
    Component extends DomElement,
  > = Component extends false
    ? keyof CustomProps
    : keyof Omit<CustomProps, keyof ComponentProps<Component>>;

  export type TransientProps<
    CustomProps,
    Component extends DomElement = false,
  > = {
    [Key in OmitDomProps<
      CustomProps,
      Component
    > as `$${Stringify<Key>}`]: CustomProps[Key];
  };
}
