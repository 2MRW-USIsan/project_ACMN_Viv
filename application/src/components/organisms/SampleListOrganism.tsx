"use client";

import { Stack, CircularProgress } from "@mui/material";
import { SampleItem } from "@/types/sampleItem";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { SampleListItemMolecule } from "@/components/molecules/SampleListItemMolecule";

interface SampleListOrganismProps {
  props: {
    items: SampleItem[];
    selectedItem: SampleItem | null;
    isLoading: boolean;
    onSelectItem: (item: SampleItem) => void;
    onDeleteItem: (id: string) => Promise<void>;
  };
}

export function SampleListOrganism({ props }: SampleListOrganismProps) {
  return (
    <Stack spacing={1}>
      <LabelAtom
        props={{ text: "データリスト", variant: "h6", fontWeight: "bold" }}
      />
      {props.isLoading && props.items.length === 0 ? (
        <Stack alignItems="center" p={2}>
          <CircularProgress size={24} />
        </Stack>
      ) : props.items.length === 0 ? (
        <LabelAtom
          props={{
            text: "データがありません。",
            variant: "body2",
            color: "text.secondary",
          }}
        />
      ) : (
        props.items.map((item) => (
          <SampleListItemMolecule
            key={item.id}
            props={{
              item,
              isSelected: props.selectedItem?.id === item.id,
              isLoading: props.isLoading,
              onSelect: props.onSelectItem,
              onDelete: props.onDeleteItem,
            }}
          />
        ))
      )}
    </Stack>
  );
}
