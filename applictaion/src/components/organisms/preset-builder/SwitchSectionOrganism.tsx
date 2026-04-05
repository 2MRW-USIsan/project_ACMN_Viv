"use client";

import { Box, Stack } from "@mui/material";
import { SwitchGrp } from "@/types/presetBuilder";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { DividerAtom } from "@/components/atoms/DividerAtom";
import { ButtonAtom } from "@/components/atoms/ButtonAtom";
import { SwitchGrpPanelOrganism } from "@/components/organisms/preset-builder/SwitchGrpPanelOrganism";

interface SwitchSectionOrganismProps {
  props: {
    switchGrps: SwitchGrp[];
    onAddSwitchGrp: () => void;
    onRemoveSwitchGrp: (id: string) => void;
    onToggleSwitchGrpExpand: (id: string) => void;
    onSwitchGrpKeyBlur: (id: string, value: string) => void;
    onSwitchGrpLabelBlur: (id: string, value: string) => void;
    onSwitchGrpRandomizeChange: (grpId: string, value: boolean) => void;
    onAddSwitchItem: (grpId: string) => void;
    onRemoveSwitchItem: (grpId: string, itemId: string) => void;
    onSwitchItemLabelBlur: (grpId: string, itemId: string, value: string) => void;
    onSwitchItemValueBlur: (grpId: string, itemId: string, value: string) => void;
    onSwitchItemAltBlur: (grpId: string, itemId: string, value: string) => void;
  };
}

export function SwitchSectionOrganism({ props }: SwitchSectionOrganismProps) {
  return (
    <Stack spacing={1}>
      <LabelAtom props={{ text: "Switch:", variant: "subtitle1", fontWeight: "bold" }} />
      <DividerAtom />
      <Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1 }}>
        <Stack divider={<DividerAtom />}>
          {props.switchGrps.map((grp) => (
            <SwitchGrpPanelOrganism
              key={grp.id}
              props={{
                grp,
                onKeyBlur: props.onSwitchGrpKeyBlur,
                onLabelBlur: props.onSwitchGrpLabelBlur,
                onRemove: props.onRemoveSwitchGrp,
                onToggleExpand: props.onToggleSwitchGrpExpand,
                onRandomizeChange: props.onSwitchGrpRandomizeChange,
                onAddItem: props.onAddSwitchItem,
                onRemoveItem: props.onRemoveSwitchItem,
                onItemLabelBlur: props.onSwitchItemLabelBlur,
                onItemValueBlur: props.onSwitchItemValueBlur,
                onItemAltBlur: props.onSwitchItemAltBlur,
              }}
            />
          ))}
        </Stack>
        <DividerAtom />
        <Box sx={{ display: "flex", justifyContent: "center", py: 1 }}>
          <ButtonAtom
            props={{ label: "Add Switch Grp: +", onClick: props.onAddSwitchGrp }}
          />
        </Box>
      </Box>
    </Stack>
  );
}
