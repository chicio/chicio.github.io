import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export const DownArrow: React.FC = () => (
  <span className="down-arrow" aria-hidden="true" id="down-arrow">
    <FontAwesomeIcon icon={faChevronDown} />
  </span>
);
