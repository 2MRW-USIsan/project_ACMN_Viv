"use client";

import { Typography } from "@mui/material";

interface LabelAtomProps {
  props: {
    text: string;
    variant?:
      | "h4"
      | "h5"
      | "h6"
      | "subtitle1"
      | "subtitle2"
      | "body1"
      | "body2"
      | "caption";
    color?: string;
    fontWeight?: "bold" | "normal";
  };
}

const LabelAtom = ({ props }: LabelAtomProps) => (
  <Typography
    variant={props.variant ?? "body1"}
    color={props.color}
    fontWeight={props.fontWeight}
  >
    {props.text}
  </Typography>
);

export { LabelAtom };
