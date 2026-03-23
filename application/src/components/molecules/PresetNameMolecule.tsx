"use client";

import { Stack } from "@mui/material";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { ButtonAtom } from "@/components/atoms/ButtonAtom";

interface PresetNameMoleculeProps {
  props: {
    presetName: string;
    hasChanges: boolean;
    onChange: () => void;
    onSave: () => void;
  };
}

export function PresetNameMolecule({ props }: PresetNameMoleculeProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <LabelAtom props={{ text: "Presets:" }} />
      <LabelAtom props={{ text: props.presetName }} />
      <ButtonAtom props={{ label: "Change", onClick: props.onChange }} />
      {props.hasChanges && (
        <LabelAtom
          props={{
            text: "there are some changes",
            variant: "body2",
            color: "text.secondary",
          }}
        />
      )}
      <ButtonAtom props={{ label: "Save", onClick: props.onSave }} />
    </Stack>
  );
}
