"use client";

import { Box } from "@mui/material";
import { LabelAtom, LabelAtomProps } from "@/components/atoms/LabelAtom";

export interface SectionPlaceholderMoleculeProps {
  props: {
    placeholderLabel: LabelAtomProps["props"];
  };
}

export function SectionPlaceholderMolecule({
  props,
}: SectionPlaceholderMoleculeProps) {
  return (
    <Box
      mt={1}
      sx={{
        bgcolor: "grey.200",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 5,
      }}
    >
      <LabelAtom props={props.placeholderLabel} />
    </Box>
  );
}
