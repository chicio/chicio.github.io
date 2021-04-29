import { useHardwareConcurrency, useMemoryStatus } from "react-adaptive-hooks";
import { isMobile } from "react-device-detect";

export const useIsPowerfulMobileDevice = () => {
  const { deviceMemory } = useMemoryStatus({ deviceMemory: 1 });
  const { numberOfLogicalProcessors } = useHardwareConcurrency();

  return (
    isMobile &&
    deviceMemory >= 3 &&
    numberOfLogicalProcessors != null &&
    numberOfLogicalProcessors >= 8
  );
};
