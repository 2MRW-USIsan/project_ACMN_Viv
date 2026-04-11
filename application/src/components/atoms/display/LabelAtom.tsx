"use client";

import { LabelAtomType } from "@/types/ui";
import { Typography } from "@mui/material";

export interface LabelAtomProps {
  props: LabelAtomType;
}
type LabelSize = "TITLE" | "HEADER" | "LABEL" | "BODY" | "INPUT" | "CAPTION";

export function LabelAtom({ props }: LabelAtomProps) {
  type MaiLabelSize = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  const { style = { color: "info", size: "CAPTION" } } = props;

  const labelSize: Record<LabelSize, MaiLabelSize> = {
    TITLE: "h1",
    HEADER: "h2",
    LABEL: "h3",
    BODY: "h4",
    INPUT: "h5",
    CAPTION: "h6",
  };
  return (
    <Typography variant={labelSize[style.size]} color={style.color}>
      {props.text}
    </Typography>
  );
}
