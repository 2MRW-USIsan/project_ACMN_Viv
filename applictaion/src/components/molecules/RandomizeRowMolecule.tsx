"use client";

import { Stack } from "@mui/material";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { SwitchAtom } from "@/components/atoms/SwitchAtom";

interface RandomizeRowMoleculeProps {
  props: {
    isRandomize: boolean;
    onRandomizeChange: (value: boolean) => void;
  };
}

export function RandomizeRowMolecule({ props }: RandomizeRowMoleculeProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <LabelAtom props={{ text: "Randomize:" }} />
      <SwitchAtom
        props={{
          checked: props.isRandomize,
          onChange: props.onRandomizeChange,
        }}
      />
    </Stack>
  );
}
