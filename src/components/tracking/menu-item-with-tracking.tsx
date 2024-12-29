import { FC, ReactNode } from "react";
import { TrackingElementProps, trackWith } from "../../logic/tracking";
import { MenuItem } from "../design-system/molecules/menu-item";

type MenuItemWithTrackingProps = TrackingElementProps & {
  to: string;
  className?: string;
  selected: boolean;
  children?: ReactNode;
};

export const MenuItemWithTracking: FC<MenuItemWithTrackingProps> = ({
  children,
  className,
  to,
  trackingData,
  selected,
}) => (
  <MenuItem
    className={className}
    to={to}
    onClick={() => {
      trackWith(trackingData);
    }}
    selected={selected}
  >
    {children}
  </MenuItem>
);
