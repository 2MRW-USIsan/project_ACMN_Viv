"use client";

import { Box, Stack } from "@mui/material";
import { SwitchGrp } from "@/types/presetBuilder";
import { DividerAtom } from "@/components/atoms/DividerAtom";
import { SwitchGrpHeaderMolecule } from "@/components/molecules/SwitchGrpHeaderMolecule";
import { SwitchItemSectionOrganism } from "@/components/organisms/preset-builder/SwitchItemSectionOrganism";

interface SwitchGrpPanelOrganismProps {
  props: {
    grp: SwitchGrp;
    onKeyBlur: (id: string, value: string) => void;
    onLabelBlur: (id: string, value: string) => void;
    onRemove: (id: string) => void;
    onToggleExpand: (id: string) => void;
    onRandomizeChange: (grpId: string, value: boolean) => void;
    onAddItem: (grpId: string) => void;
    onRemoveItem: (grpId: string, itemId: string) => void;
    onItemLabelBlur: (grpId: string, itemId: string, value: string) => void;
    onItemValueBlur: (grpId: string, itemId: string, value: string) => void;
    onItemAltBlur: (grpId: string, itemId: string, value: string) => void;
  };
}

export function SwitchGrpPanelOrganism({ props }: SwitchGrpPanelOrganismProps) {
  const { grp } = props;

  return (
    <Box>
      <SwitchGrpHeaderMolecule
        props={{
          grpKey: grp.key,
          grpLabel: grp.label,
          isExpanded: grp.isExpanded,
          onKeyBlur: (value) => props.onKeyBlur(grp.id, value),
          onLabelBlur: (value) => props.onLabelBlur(grp.id, value),
          onRemove: () => props.onRemove(grp.id),
          onToggleExpand: () => props.onToggleExpand(grp.id),
        }}
      />
      {grp.isExpanded && (
        <Stack spacing={1} sx={{ px: 2, pb: 2 }}>
          <DividerAtom />
          <SwitchItemSectionOrganism
            props={{
              isRandomize: grp.isRandomize,
              onRandomizeChange: (value) => props.onRandomizeChange(grp.id, value),
              items: grp.items,
              onItemLabelBlur: (itemId, value) => props.onItemLabelBlur(grp.id, itemId, value),
              onItemValueBlur: (itemId, value) => props.onItemValueBlur(grp.id, itemId, value),
              onItemAltBlur: (itemId, value) => props.onItemAltBlur(grp.id, itemId, value),
              onRemoveItem: (itemId) => props.onRemoveItem(grp.id, itemId),
              onAddItem: () => props.onAddItem(grp.id),
            }}
          />
        </Stack>
      )}
    </Box>
  );
}
