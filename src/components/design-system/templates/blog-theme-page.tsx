import { blogTheme } from "../theme";
import { FC, ReactNode } from "react";
import { ThemePage } from "./theme-page";

interface Props {
  children?: ReactNode;
}

export const BlogThemePage: FC<Props> = ({ children }) => (
  <ThemePage theme={blogTheme}>{children}</ThemePage>
);
