"use client";

import { Stack } from "@mui/material";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { ButtonAtom } from "@/components/atoms/ButtonAtom";

interface OrdersSheetOrganismProps {
  props: {
    value: string;
    onValueChange: (value: string) => void;
    onPaste: () => void;
    onReset: () => void;
    onClear: () => void;
  };
}

export function OrdersSheetOrganism({ props }: OrdersSheetOrganismProps) {
  return (
    <Stack spacing={1} flex={1}>
      <LabelAtom props={{ text: "Orders Sheet:" }} />
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
        <ButtonAtom props={{ label: "Paste", onClick: props.onPaste }} />
        <ButtonAtom props={{ label: "Reset", onClick: props.onReset }} />
        <ButtonAtom props={{ label: "Clear", onClick: props.onClear }} />
      </Stack>
    </Stack>
  );
}
