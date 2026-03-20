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

export function SampleEditorOrganism({ props }: SampleEditorOrganismProps) {
  const headingLabelProps = {
    text: props.isEditing ? "データ編集" : "新規データ作成",
    variant: "h6" as const,
    fontWeight: "bold" as const,
  };
  const titleFieldProps = {
    label: "タイトル",
    defaultValue: props.title,
    onBlur: props.onTitleChange,
  };
  const descriptionFieldProps = {
    label: "説明",
    defaultValue: props.description,
    onBlur: props.onDescriptionChange,
    multiline: true,
    rows: 3,
  };
  const saveButtonProps = {
    label: props.isEditing ? "更新" : "作成",
    isLoading: props.isLoading,
    onClick: props.onSave,
    fullWidth: true,
  };
  const cancelButtonProps = {
    label: "キャンセル",
    variant: "outlined" as const,
    onClick: props.onCancel,
    fullWidth: true,
  };

  return (
    <Stack spacing={2}>
      <LabelAtom props={headingLabelProps} />
      <TextFieldAtom props={titleFieldProps} />
      <TextFieldAtom props={descriptionFieldProps} />
      <Stack direction="row" spacing={1}>
        <ButtonAtom props={saveButtonProps} />
        {props.isEditing && <ButtonAtom props={cancelButtonProps} />}
      </Stack>
    </Stack>
  );
}
