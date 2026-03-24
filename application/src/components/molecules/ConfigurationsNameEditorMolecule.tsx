"use client";
import { StackAtom } from "@/components/atoms/StackAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { ButtonAtom } from "@/components/atoms/ButtonAtom";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";

interface ConfigurationsNameEditorMoleculeProps {
  props: {
    nameValue: string;
    hasChanges: boolean;
    onNameBlur: (value: string) => void;
    onSave: () => void;
  };
}

export function ConfigurationsNameEditorMolecule({
  props,
}: ConfigurationsNameEditorMoleculeProps) {
  return (
    <StackAtom
      props={{ direction: "row", alignItems: "center", spacing: 1, sx: { mb: 0.5 } }}
    >
      <LabelAtom props={{ text: "Name:", variant: "body2" }} />
      <TextFieldAtom
        props={{
          label: "Name",
          defaultValue: props.nameValue,
          onBlur: props.onNameBlur,
          fullWidth: true,
          size: "small",
        }}
      />
      {props.hasChanges && (
        <LabelAtom
          props={{
            text: "having some changes",
            variant: "body2",
            color: "text.secondary",
          }}
        />
      )}
      <ButtonAtom props={{ label: "Save", onClick: props.onSave }} />
    </StackAtom>
  );
}