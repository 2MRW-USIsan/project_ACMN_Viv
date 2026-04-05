"use client";

import { SwitchGrp } from "@/types/presetBuilder";

export interface PresetBuilderViewModel {
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
}
