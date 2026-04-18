import { DividerAtomType } from "@/types/components/ui";
import { Divider } from "@mui/material";

export interface DividerAtomProps {
  props?: DividerAtomType;
}

export function DividerAtom({
  props = { orientation: "horizontal" },
}: DividerAtomProps) {
  return <Divider flexItem orientation={props.orientation} />;
}
