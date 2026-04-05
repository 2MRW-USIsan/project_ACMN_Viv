"use client";

import { Box, Stack } from "@mui/material";
import { SwitchItem } from "@/types/presetBuilder";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { DividerAtom } from "@/components/atoms/DividerAtom";
import { ButtonAtom } from "@/components/atoms/ButtonAtom";
import { RandomizeRowMolecule } from "@/components/molecules/RandomizeRowMolecule";
import { SwitchItemRowMolecule } from "@/components/molecules/SwitchItemRowMolecule";

interface SwitchItemSectionOrganismProps {
  props: {
    isRandomize: boolean;
    onRandomizeChange: (value: boolean) => void;
    items: SwitchItem[];
    onItemLabelBlur: (id: string, value: string) => void;
    onItemValueBlur: (id: string, value: string) => void;
    onItemAltBlur: (id: string, value: string) => void;
    onRemoveItem: (id: string) => void;
    onAddItem: () => void;
  };
}

export function SwitchItemSectionOrganism({ props }: SwitchItemSectionOrganismProps) {
  return (
    <Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1, p: 2 }}>
      <Stack spacing={1.5}>
        <LabelAtom props={{ text: "Switch Items:", variant: "subtitle2", fontWeight: "bold" }} />
        <DividerAtom />
        <RandomizeRowMolecule
          props={{
            isRandomize: props.isRandomize,
            onRandomizeChange: props.onRandomizeChange,
          }}
        />
        <DividerAtom />
        <Stack spacing={1}>
          {props.items.map((item) => (
            <SwitchItemRowMolecule
              key={item.id}
              props={{
                label: item.label,
                value: item.value,
                alt: item.alt,
                onLabelBlur: (value) => props.onItemLabelBlur(item.id, value),
                onValueBlur: (value) => props.onItemValueBlur(item.id, value),
                onAltBlur: (value) => props.onItemAltBlur(item.id, value),
                onRemove: () => props.onRemoveItem(item.id),
              }}
            />
          ))}
        </Stack>
        <DividerAtom />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <ButtonAtom
            props={{ label: "Add Switch: +", onClick: props.onAddItem }}
          />
        </Box>
      </Stack>
    </Box>
  );
}
