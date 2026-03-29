"use client";

import { Stack, CircularProgress } from "@mui/material";
import { LabelAtom, LabelAtomProps } from "@/components/atoms/LabelAtom";
import {
  SampleListItemMolecule,
  SampleListItemMoleculeProps,
} from "@/components/molecules/SampleListItemMolecule";

interface SampleListOrganismProps {
  props: {
    titleLabel: LabelAtomProps["props"];
    emptyLabel: LabelAtomProps["props"];
    items: Array<SampleListItemMoleculeProps["props"] & { key: string }>;
    isLoading: boolean;
  };
}

export function SampleListOrganism({ props }: SampleListOrganismProps) {
  return (
    <Stack spacing={1}>
      <LabelAtom props={props.titleLabel} />
      {props.isLoading && props.items.length === 0 ? (
        <Stack alignItems="center" p={2}>
          <CircularProgress size={24} />
        </Stack>
      ) : props.items.length === 0 ? (
        <LabelAtom props={props.emptyLabel} />
      ) : (
        props.items.map(({ key, ...itemProps }) => (
          <SampleListItemMolecule key={key} props={itemProps} />
        ))
      )}
    </Stack>
  );
}
