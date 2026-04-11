

import { Divider } from "@mui/material";
import { DividerAtomType } from "@/types/ui";

export interface DividerAtomProps {
  props?: DividerAtomType;
}

export function DividerAtom({
  props = { orientation: "horizontal" },
}: DividerAtomProps) {
  return <Divider flexItem orientation={props.orientation} />;
}
