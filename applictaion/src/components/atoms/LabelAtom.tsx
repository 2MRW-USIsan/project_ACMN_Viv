"use client";

import { Typography } from "@mui/material";

type VariantType =
  | "body1"
  | "body2"
  | "subtitle1"
  | "subtitle2"
  | "h6"
  | "caption";

interface LabelAtomProps {
  props: {
    text: string;
    variant?: VariantType;
    fontWeight?: "normal" | "bold";
    noWrap?: boolean;
  };
}

export function LabelAtom({ props }: LabelAtomProps) {
  return (
    <Typography
      variant={props.variant ?? "body2"}
      fontWeight={props.fontWeight}
      noWrap={props.noWrap}
    >
      {props.text}
    </Typography>
  );
}
