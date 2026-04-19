import { LabelType } from "@/types/components/ui";
import { Typography } from "@mui/material";

export interface LabelProps {
  props: LabelType;
  style?: LabelSize;
  error?: boolean;
  grey?: boolean;
  primary?: boolean;
}
type LabelSize = "TITLE" | "HEADER" | "LABEL" | "BODY" | "INPUT" | "CAPTION";
type MuiLabelSize = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export function Label({
  props,
  style = "BODY",
  error,
  grey,
  primary,
}: LabelProps) {
  const labelSize: Record<LabelSize, MuiLabelSize> = {
    TITLE: "h1",
    HEADER: "h2",
    LABEL: "h3",
    BODY: "h4",
    INPUT: "h5",
    CAPTION: "h6",
  };
  return (
    <Typography
      variant={labelSize[style]}
      color={grey ? "grey" : primary ? "primary" : error ? "error" : "default"}
    >
      {props?.text ?? "--"}
    </Typography>
  );
}
