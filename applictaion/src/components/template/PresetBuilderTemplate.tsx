"use client";

import { Box } from "@mui/material";
import { PresetBuilderViewModel } from "@/hooks/preset-builder/viewModel/usePresetBuilderComposer";
import { SwitchSectionOrganism } from "@/components/organisms/preset-builder/SwitchSectionOrganism";

interface PresetBuilderTemplateProps {
  props: PresetBuilderViewModel;
}

export function PresetBuilderTemplate({ props }: PresetBuilderTemplateProps) {
  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: "auto" }}>
      <SwitchSectionOrganism
        props={{
          switchGrps: props.switchGrps,
          onAddSwitchGrp: props.onAddSwitchGrp,
          onRemoveSwitchGrp: props.onRemoveSwitchGrp,
          onToggleSwitchGrpExpand: props.onToggleSwitchGrpExpand,
          onSwitchGrpKeyBlur: props.onSwitchGrpKeyBlur,
          onSwitchGrpLabelBlur: props.onSwitchGrpLabelBlur,
          onSwitchGrpRandomizeChange: props.onSwitchGrpRandomizeChange,
          onAddSwitchItem: props.onAddSwitchItem,
          onRemoveSwitchItem: props.onRemoveSwitchItem,
          onSwitchItemLabelBlur: props.onSwitchItemLabelBlur,
          onSwitchItemValueBlur: props.onSwitchItemValueBlur,
          onSwitchItemAltBlur: props.onSwitchItemAltBlur,
        }}
      />
    </Box>
  );
}
