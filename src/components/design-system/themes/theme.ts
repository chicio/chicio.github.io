import { DefaultTheme } from "styled-components";
import { blogDark, blogLight } from "./blog-colors";
import { artDark, artLight } from "./art-colors";

const fontSizes = [
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
];

const spacing = [
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
  "56px",
  "60px",
];

export const blogTheme: DefaultTheme = {
  dark: blogDark,
  light: blogLight,
  fontSizes,
  spacing,
  lineHeight: 1.8,
};

export const artTheme: DefaultTheme = {
  dark: artDark,
  light: artLight,
  fontSizes,
  spacing,
  lineHeight: 1.8,
};
