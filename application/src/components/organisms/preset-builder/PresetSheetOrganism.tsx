"use client";

import { Stack } from "@mui/material";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { ButtonAtom } from "@/components/atoms/ButtonAtom";

interface PresetSheetOrganismProps {
  props: {
    value: string;
    onValueChange: (value: string) => void;
    onShuffle: () => void;
    onCopy: () => void;
  };
}

export function PresetSheetOrganism({ props }: PresetSheetOrganismProps) {
  return (
    <Stack spacing={1} flex={1}>
      <LabelAtom props={{ text: "Preset Sheet:" }} />
      <TextFieldAtom
        props={{
          label: "",
          defaultValue: props.value,
          onBlur: props.onValueChange,
          multiline: true,
          rows: 12,
          fullWidth: true,
        }}
      />
      <Stack direction="row" spacing={1}>
        <ButtonAtom props={{ label: "Shuffle", onClick: props.onShuffle }} />
        <ButtonAtom props={{ label: "Copy", onClick: props.onCopy }} />
      </Stack>
    </Stack>
  );
}
