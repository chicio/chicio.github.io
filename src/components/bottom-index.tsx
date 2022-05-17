import { Technologies } from "./design-system/organism/technologies";
import { Resume } from "./design-system/organism/resume";
import { FC } from "react";

interface BottomIndexProps {
  author: string;
}

const BottomIndex: FC<BottomIndexProps> = ({ author }) => (
  <>
    <Technologies author={author} />
    <Resume />
  </>
);

export default BottomIndex;
