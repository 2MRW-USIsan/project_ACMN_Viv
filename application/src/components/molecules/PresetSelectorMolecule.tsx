"use client";

import { Stack } from "@mui/material";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { SelectAtom } from "@/components/atoms/SelectAtom";
import { ButtonAtom } from "@/components/atoms/ButtonAtom";

interface PresetSelectorMoleculeProps {
  props: {
    presetOptions: string[];
    selectedPreset: string;
    onPresetChange: (value: string) => void;
    onLoad: () => void;
  };
}

export function PresetSelectorMolecule({ props }: PresetSelectorMoleculeProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <LabelAtom props={{ text: "Presets:" }} />
      <SelectAtom
        props={{
          value: props.selectedPreset,
          options: props.presetOptions,
          onChange: props.onPresetChange,
          fullWidth: true,
        }}
      />
      <ButtonAtom props={{ label: "Load", onClick: props.onLoad }} />
    </Stack>
  );
}
