"use client";

import { Stack } from "@mui/material";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { IconButtonAtom } from "@/components/atoms/IconButtonAtom";

interface SwitchGrpHeaderMoleculeProps {
  props: {
    grpKey: string;
    grpLabel: string;
    isExpanded: boolean;
    onKeyBlur: (value: string) => void;
    onLabelBlur: (value: string) => void;
    onRemove: () => void;
    onToggleExpand: () => void;
  };
}

export function SwitchGrpHeaderMolecule({ props }: SwitchGrpHeaderMoleculeProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ px: 2, py: 1 }}>
      <LabelAtom props={{ text: "Switch Grp:", noWrap: true }} />
      <LabelAtom props={{ text: "Key:", noWrap: true }} />
      <TextFieldAtom
        props={{
          defaultValue: props.grpKey,
          onBlur: props.onKeyBlur,
          placeholder: "text field...",
        }}
      />
      <LabelAtom props={{ text: "Label:", noWrap: true }} />
      <TextFieldAtom
        props={{
          defaultValue: props.grpLabel,
          onBlur: props.onLabelBlur,
          placeholder: "text field...",
          fullWidth: true,
        }}
      />
      <IconButtonAtom props={{ icon: "removeCircle", onClick: props.onRemove }} />
      <IconButtonAtom
        props={{
          icon: props.isExpanded ? "arrowUp" : "arrowDown",
          onClick: props.onToggleExpand,
        }}
      />
    </Stack>
  );
}
