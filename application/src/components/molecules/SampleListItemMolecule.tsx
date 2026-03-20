"use client";

import { Stack } from "@mui/material";
import { SampleItem } from "@/types/sampleItem";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { ButtonAtom } from "@/components/atoms/ButtonAtom";

interface SampleListItemMoleculeProps {
  props: {
    item: SampleItem;
    isSelected: boolean;
    isLoading: boolean;
    onSelect: (item: SampleItem) => void;
    onDelete: (id: string) => Promise<void>;
  };
}

export function SampleListItemMolecule({ props }: SampleListItemMoleculeProps) {
  const titleLabelProps = { text: props.item.title, fontWeight: "bold" as const };
  const descriptionLabelProps = {
    text: props.item.description,
    variant: "body2" as const,
    color: "text.secondary",
  };
  const deleteButtonProps = {
    label: "削除",
    variant: "outlined" as const,
    color: "error" as const,
    isLoading: props.isLoading,
    onClick: () => props.onDelete(props.item.id),
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        p: 1,
        border: "1px solid",
        borderColor: props.isSelected ? "primary.main" : "divider",
        borderRadius: 1,
        bgcolor: props.isSelected ? "primary.50" : "background.paper",
        cursor: "pointer",
      }}
      onClick={() => props.onSelect(props.item)}
    >
      <Stack spacing={0.5} flex={1} mr={1}>
        <LabelAtom props={titleLabelProps} />
        <LabelAtom props={descriptionLabelProps} />
      </Stack>
      <span onClick={(e) => e.stopPropagation()}>
        <ButtonAtom props={deleteButtonProps} />
      </span>
    </Stack>
  );
}
