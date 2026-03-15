"use client";

import { Stack } from "@mui/material";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { ButtonAtom } from "@/components/atoms/ButtonAtom";

interface SampleEditorOrganismProps {
  props: {
    title: string;
    description: string;
    isEditing: boolean;
    isLoading: boolean;
    onTitleChange: (title: string) => void;
    onDescriptionChange: (description: string) => void;
    onSave: () => Promise<void>;
    onCancel: () => void;
  };
}

const SampleEditorOrganism = ({ props }: SampleEditorOrganismProps) => (
  <Stack spacing={2}>
    <LabelAtom
      props={{
        text: props.isEditing ? "データ編集" : "新規データ作成",
        variant: "h6",
        fontWeight: "bold",
      }}
    />
    <TextFieldAtom
      props={{
        label: "タイトル",
        defaultValue: props.title,
        onBlur: props.onTitleChange,
        fullWidth: true,
      }}
    />
    <TextFieldAtom
      props={{
        label: "説明",
        defaultValue: props.description,
        onBlur: props.onDescriptionChange,
        multiline: true,
        rows: 3,
        fullWidth: true,
      }}
    />
    <Stack direction="row" spacing={1}>
      <ButtonAtom
        props={{
          label: props.isEditing ? "更新" : "作成",
          isLoading: props.isLoading,
          onClick: props.onSave,
          fullWidth: true,
        }}
      />
      {props.isEditing && (
        <ButtonAtom
          props={{
            label: "キャンセル",
            variant: "outlined",
            onClick: props.onCancel,
            fullWidth: true,
          }}
        />
      )}
    </Stack>
  </Stack>
);

export { SampleEditorOrganism };
