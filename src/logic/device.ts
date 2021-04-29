import { isDesktop, isSafari } from "react-device-detect";
import { useHardwareConcurrency, useMemoryStatus } from "react-adaptive-hooks";

export const isSafariDesktop = () => isSafari && isDesktop;

export const useIsPowerfulDesktop = () => {
  const { deviceMemory } = useMemoryStatus({ deviceMemory: 1 });
  const { numberOfLogicalProcessors } = useHardwareConcurrency();

  return (
    isDesktop &&
    deviceMemory >= 8 &&
    numberOfLogicalProcessors != null &&
    numberOfLogicalProcessors >= 8
  );
};
