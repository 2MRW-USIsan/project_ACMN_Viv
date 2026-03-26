"use client";

import { Stack } from "@mui/material";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { SelectAtom } from "@/components/atoms/SelectAtom";
import { ButtonAtom } from "@/components/atoms/ButtonAtom";

interface ConfigSetSelectorMoleculeProps {
  props: {
    configSetOptions: string[];
    selectedConfigSet: string;
    onSelectConfigSet: (value: string) => void;
    onLoad: () => void;
  };
}

export function ConfigSetSelectorMolecule({ props }: ConfigSetSelectorMoleculeProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <LabelAtom props={{ text: "Config Sets:", variant: "body1" }} />
      <Stack sx={{ flexGrow: 1 }}>
        <SelectAtom
          props={{
            value: props.selectedConfigSet,
            options: props.configSetOptions,
            onChange: props.onSelectConfigSet,
            placeholder: "Select Item",
            fullWidth: true,
          }}
        />
      </Stack>
      <ButtonAtom
        props={{ label: "Load", onClick: props.onLoad, variant: "contained" }}
      />
    </Stack>
  );
}
