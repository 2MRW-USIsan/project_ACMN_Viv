"use client";

import { Stack } from "@mui/material";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { ButtonAtom } from "@/components/atoms/ButtonAtom";

interface ConfigNameEditorMoleculeProps {
  props: {
    configName: string;
    onConfigNameChange: (value: string) => void;
    onChangeName: () => void;
    hasChanges: boolean;
    onSave: () => void;
  };
}

export function ConfigNameEditorMolecule({ props }: ConfigNameEditorMoleculeProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <LabelAtom props={{ text: "Config Name:", variant: "body1" }} />
      <Stack sx={{ flexGrow: 1 }}>
        <TextFieldAtom
          props={{
            defaultValue: props.configName,
            onBlur: props.onConfigNameChange,
            fullWidth: true,
            placeholder: "Text Field",
          }}
        />
      </Stack>
      <ButtonAtom
        props={{ label: "Change", onClick: props.onChangeName, variant: "contained" }}
      />
      {props.hasChanges && (
        <LabelAtom
          props={{ text: "has some changes...", variant: "body2", color: "text.secondary" }}
        />
      )}
      <ButtonAtom
        props={{ label: "Save", onClick: props.onSave, variant: "contained" }}
      />
    </Stack>
  );
}
