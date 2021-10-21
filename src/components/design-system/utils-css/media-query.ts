enum BreakPoint {
  xs = "xs",
  sm = "sm",
  md = "md",
  lg = "lg",
}

interface MediaQuery {
  minWidth: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };
  maxWidth: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };
  dark: string;
}

const breakpoints: Record<BreakPoint, string> = {
  xs: "576px",
  sm: "768px",
  md: "992px",
  lg: "1200px",
};

const media: (content: string) => string = (content) => `@media (${content})`;

const dark = media("prefers-color-scheme: dark");

const width: (
  width: "max-width" | "min-width",
  breakpoint: BreakPoint
) => string = (width: "max-width" | "min-width", breakpoint: BreakPoint) =>
  media(`${width}: ${breakpoints[breakpoint]}`);

const minWidth: (breakpoint: BreakPoint) => string = (breakpoint: BreakPoint) =>
  width("min-width", breakpoint);

const maxWidth: (breakpoint: BreakPoint) => string = (breakpoint: BreakPoint) =>
  width("max-width", breakpoint);

export const mediaQuery: MediaQuery = {
  minWidth: {
    xs: minWidth(BreakPoint.xs),
    sm: minWidth(BreakPoint.sm),
    md: minWidth(BreakPoint.md),
    lg: minWidth(BreakPoint.lg),
  },
  maxWidth: {
    xs: maxWidth(BreakPoint.xs),
    sm: maxWidth(BreakPoint.sm),
    md: maxWidth(BreakPoint.md),
    lg: maxWidth(BreakPoint.lg),
  },
  dark,
};
