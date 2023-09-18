import { CurrentLocation } from "./current-location";

export const pageOpenedInApp = (location: CurrentLocation): boolean => {
  const appParam = new URLSearchParams(location.search).get("app");
  return appParam !== undefined && appParam !== null && appParam === "true";
};
