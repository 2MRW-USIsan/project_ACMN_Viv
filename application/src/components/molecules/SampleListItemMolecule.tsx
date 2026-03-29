"use client";

import { Stack } from "@mui/material";
import { LabelAtom, LabelAtomProps } from "@/components/atoms/LabelAtom";
import { ButtonAtom, ButtonAtomProps } from "@/components/atoms/ButtonAtom";

export interface SampleListItemMoleculeProps {
  props: {
    titleLabel: LabelAtomProps["props"];
    descriptionLabel: LabelAtomProps["props"];
    deleteButton: ButtonAtomProps["props"];
    isSelected: boolean;
    isLoading: boolean;
    onSelect: () => void;
  };
}

export function SampleListItemMolecule({ props }: SampleListItemMoleculeProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        p: 1,
        border: "1px solid",
        borderColor: props.isSelected ? "primary.main" : "divider",
        borderRadius: 1,
        bgcolor: props.isSelected ? "primary.50" : "background.paper",
        cursor: "pointer",
      }}
      onClick={props.onSelect}
    >
      <Stack spacing={0.5} flex={1} mr={1}>
        <LabelAtom props={props.titleLabel} />
        <LabelAtom props={props.descriptionLabel} />
      </Stack>
      <span onClick={(e) => e.stopPropagation()}>
        <ButtonAtom props={props.deleteButton} />
      </span>
    </Stack>
  );
}
