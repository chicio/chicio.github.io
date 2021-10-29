import { blogTheme } from "../theme";
import React from "react";
import { ThemePage } from "./theme-page";

export const BlogThemePage: React.FC = ({ children }) => (
  <ThemePage theme={blogTheme}>{children}</ThemePage>
);
