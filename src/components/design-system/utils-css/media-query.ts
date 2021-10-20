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
}

const breakpoints: Record<BreakPoint, string> = {
  xs: "576px",
  sm: "768px",
  md: "992px",
  lg: "1200px",
};

const minWidth: (breakpoint: BreakPoint) => string = (breakpoint: BreakPoint) =>
  `@media (min-width: ${breakpoints[breakpoint]})`;

export const mediaQuery: MediaQuery = {
  minWidth: {
    xs: minWidth(BreakPoint.xs),
    sm: minWidth(BreakPoint.sm),
    md: minWidth(BreakPoint.md),
    lg: minWidth(BreakPoint.lg),
  },
};
