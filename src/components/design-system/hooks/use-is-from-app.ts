import { useEffect, useState } from "react";
import { CurrentLocation } from "../../../logic/current-location";

export const pageOpenedInApp = (location: CurrentLocation): boolean => {
  const appParam = new URLSearchParams(location.search).get("app");
  return appParam !== undefined && appParam !== null && appParam === "true";
};

export const useIsFromApp = (location: CurrentLocation) => {
  const [isFromApp, setIsFromApp] = useState(false);

  useEffect(() => {
    setIsFromApp(pageOpenedInApp(location));
  }, []);

  return isFromApp;
};
