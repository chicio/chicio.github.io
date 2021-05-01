import { WindowLocation } from "@reach/router";

export interface CurrentLocation {
  url: string;
  pathname: string;
}

export const getCurrentLocationFrom: (
  location: WindowLocation<WindowLocation["state"]>
) => CurrentLocation = (location: WindowLocation<WindowLocation["state"]>) => ({
  url: location.href,
  pathname: location.pathname,
});