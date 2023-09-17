import { WindowLocation } from "@reach/router";

export const pageOpenedInApp = (
  location: WindowLocation<WindowLocation["state"]>,
): boolean => {
  const appParam = new URLSearchParams(location.search).get("app");
  return appParam !== undefined && appParam !== null && appParam === "true";
};
