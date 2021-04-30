import { useHardwareConcurrency, useMemoryStatus } from "react-adaptive-hooks";
import { isDesktop, isIOS, isMobile } from "react-device-detect";

export const useIsPowerfulMobileDevice = () => {
  const { deviceMemory } = useMemoryStatus({ deviceMemory: 1 });
  const { numberOfLogicalProcessors } = useHardwareConcurrency();

  return (
    isIOS ||
    (isMobile &&
      deviceMemory >= 4 &&
      numberOfLogicalProcessors != null &&
      numberOfLogicalProcessors >= 8)
  );
};

export const useIsPowerfulDevice = () => {
  const isPowerfulMobileDevice = useIsPowerfulMobileDevice();

  return isDesktop || isPowerfulMobileDevice;
};
