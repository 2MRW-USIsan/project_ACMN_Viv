"use client";

import { Stack } from "@mui/material";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { IconButtonAtom } from "@/components/atoms/IconButtonAtom";

interface BlocPanelHeaderMoleculeProps {
  props: {
    blocKey: string;
    label: string;
    isExpanded: boolean;
    onBlocKeyChange: (value: string) => void;
    onLabelChange: (value: string) => void;
    onRemove: () => void;
    onToggleExpand: () => void;
  };
}

export function BlocPanelHeaderMolecule({ props }: BlocPanelHeaderMoleculeProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ px: 1, py: 0.5 }}>
      <LabelAtom props={{ text: "Bloc Info:", variant: "body1", fontWeight: "bold" }} />
      <LabelAtom props={{ text: "Key:", variant: "body1" }} />
      <Stack sx={{ width: 160 }}>
        <TextFieldAtom
          props={{
            defaultValue: props.blocKey,
            onBlur: props.onBlocKeyChange,
            placeholder: "Text Field",
            size: "small",
          }}
        />
      </Stack>
      <LabelAtom props={{ text: "Label:", variant: "body1" }} />
      <Stack sx={{ flexGrow: 1 }}>
        <TextFieldAtom
          props={{
            defaultValue: props.label,
            onBlur: props.onLabelChange,
            placeholder: "Text Field",
            size: "small",
            fullWidth: true,
          }}
        />
      </Stack>
      <IconButtonAtom
        props={{ icon: "removeCircle", onClick: props.onRemove, color: "default" }}
      />
      <IconButtonAtom
        props={{
          icon: props.isExpanded ? "arrowUp" : "arrowDown",
          onClick: props.onToggleExpand,
        }}
      />
    </Stack>
  );
}
