import { Technologies } from "./design-system/organism/technologies";
import { Resume } from "./design-system/organism/resume";
import * as React from "react";

interface BottomIndexProps {
  author: string;
}

const BottomIndex: React.FC<BottomIndexProps> = ({ author }) => (
  <>
    <Technologies author={author} />
    <Resume />
  </>
);

export default BottomIndex;
