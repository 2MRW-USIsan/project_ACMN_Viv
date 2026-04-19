import { DividerLineType } from "@/types/components/ui";
import { Divider } from "@mui/material";

export interface DividerLineProps {
  props?: DividerLineType;
}

export function DividerLine({
  props = { orientation: "horizontal" },
}: DividerLineProps) {
  return <Divider flexItem orientation={props.orientation} />;
}
