import { DefaultTheme } from "styled-components";
import { Colors } from "./styled";

export const primaryColor = "#3F51B5";
export const primaryColorDark = "#303F9F";
export const primaryColorLight = "#DFDFF1";
export const textAbovePrimaryColor = "#FFFFFF";

export const dark: Colors = {
  primaryColor,
  primaryColorDark,
  primaryColorLight,
  generalBackground: "#181918",
  textAbovePrimaryColor,
  primaryTextColor: "#FAFAFA",
  secondaryTextColor: "#A6A6A6",
  accentColor: "#4fA7ff",
  accentColorAbovePrimaryColor: "#AAFFFF",
  generalBackgroundLight: "#363636",
  boxShadowLight: "rgba(0, 0, 0, 0.2)",
  dividerColor: "#575757",
};

export const light: Colors = {
  primaryColor,
  primaryColorDark,
  primaryColorLight,
  generalBackground: "#FBFBFB",
  textAbovePrimaryColor,
  primaryTextColor: "#151515",
  secondaryTextColor: "#575757",
  accentColor: "#1F67FF",
  accentColorAbovePrimaryColor: "#AAFFFF",
  generalBackgroundLight: "#FFFFFF",
  boxShadowLight: "rgba(0, 0, 0, 0.2)",
  dividerColor: "#BDBDBD",
};

export const theme: DefaultTheme = {
  dark,
  light,
  fontSizes: [
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "22px",
    "24px",
    "28px",
    "32px",
    "36px",
    "40px",
    "48px",
    "56px",
  ],
  spacing: [
    "4px",
    "8px",
    "12px",
    "16px",
    "20px",
    "24px",
    "28px",
    "32px",
    "36px",
    "40px",
    "44px",
    "48px",
    "52px",
  ],
  lineHeight: 1.8,
};