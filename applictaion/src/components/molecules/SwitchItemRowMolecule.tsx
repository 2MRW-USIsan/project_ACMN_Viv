"use client";

import { Stack } from "@mui/material";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { IconButtonAtom } from "@/components/atoms/IconButtonAtom";

interface SwitchItemRowMoleculeProps {
  props: {
    label: string;
    value: string;
    alt: string;
    onLabelBlur: (value: string) => void;
    onValueBlur: (value: string) => void;
    onAltBlur: (value: string) => void;
    onRemove: () => void;
  };
}

export function SwitchItemRowMolecule({ props }: SwitchItemRowMoleculeProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <LabelAtom props={{ text: "Label:", noWrap: true }} />
      <TextFieldAtom
        props={{
          defaultValue: props.label,
          onBlur: props.onLabelBlur,
          placeholder: "text field...",
        }}
      />
      <LabelAtom props={{ text: "Value:", noWrap: true }} />
      <TextFieldAtom
        props={{
          defaultValue: props.value,
          onBlur: props.onValueBlur,
          placeholder: "text field...",
          fullWidth: true,
        }}
      />
      <LabelAtom props={{ text: "Alt:", noWrap: true }} />
      <TextFieldAtom
        props={{
          defaultValue: props.alt,
          onBlur: props.onAltBlur,
          placeholder: "text field...",
          fullWidth: true,
        }}
      />
      <IconButtonAtom props={{ icon: "removeCircle", onClick: props.onRemove }} />
    </Stack>
  );
}
