import { LabelAtomType } from "@/types/ui";
import { Typography } from "@mui/material";

export interface LabelAtomProps {
  props: LabelAtomType;
  style?: LabelSize;
  error?: boolean;
  primary?: boolean;
}
type LabelSize = "TITLE" | "HEADER" | "LABEL" | "BODY" | "INPUT" | "CAPTION";

export function LabelAtom({
  props,
  style = "BODY",
  primary,
  error,
}: LabelAtomProps) {
  type MaiLabelSize = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  const labelColor = primary ? "primary" : error ? "error" : "default";
  const labelSize: Record<LabelSize, MaiLabelSize> = {
    TITLE: "h1",
    HEADER: "h2",
    LABEL: "h3",
    BODY: "h4",
    INPUT: "h5",
    CAPTION: "h6",
  };
  return (
    <Typography variant={labelSize[style]} color={labelColor}>
      {props?.text ?? "--"}
    </Typography>
  );
}
