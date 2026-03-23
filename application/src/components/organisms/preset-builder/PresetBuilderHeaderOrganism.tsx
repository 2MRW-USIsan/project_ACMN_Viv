"use client";

import { Stack } from "@mui/material";
import { DividerAtom } from "@/components/atoms/DividerAtom";
import { PresetSelectorMolecule } from "@/components/molecules/PresetSelectorMolecule";
import { PresetNameMolecule } from "@/components/molecules/PresetNameMolecule";

interface PresetBuilderHeaderOrganismProps {
  props: {
    presetOptions: string[];
    selectedPreset: string;
    onPresetChange: (value: string) => void;
    onLoad: () => void;
    presetName: string;
    hasChanges: boolean;
    onChange: () => void;
    onSave: () => void;
  };
}

export function PresetBuilderHeaderOrganism({
  props,
}: PresetBuilderHeaderOrganismProps) {
  return (
    <Stack spacing={1}>
      <PresetSelectorMolecule
        props={{
          presetOptions: props.presetOptions,
          selectedPreset: props.selectedPreset,
          onPresetChange: props.onPresetChange,
          onLoad: props.onLoad,
        }}
      />
      <PresetNameMolecule
        props={{
          presetName: props.presetName,
          hasChanges: props.hasChanges,
          onChange: props.onChange,
          onSave: props.onSave,
        }}
      />
      <DividerAtom />
    </Stack>
  );
}
