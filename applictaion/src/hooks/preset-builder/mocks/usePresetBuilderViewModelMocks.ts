"use client";

import { useState } from "react";
import { SwitchGrp, SwitchItem } from "@/types/presetBuilder";
import { PresetBuilderViewModel } from "@/hooks/preset-builder/viewModel/usePresetBuilderComposer";

function createSwitchItem(id: string): SwitchItem {
  return { id, label: "", value: "", alt: "" };
}

function createSwitchGrp(id: string): SwitchGrp {
  return {
    id,
    key: "",
    label: "",
    isExpanded: false,
    isRandomize: false,
    items: [createSwitchItem(`${id}-item-1`)],
  };
}

interface PresetBuilderViewModelMocksReturns {
  viewModel: PresetBuilderViewModel;
}

export function usePresetBuilderViewModelMocks(): PresetBuilderViewModelMocksReturns {
  const [switchGrps, setSwitchGrps] = useState<SwitchGrp[]>([
    {
      id: "grp-1",
      key: "",
      label: "",
      isExpanded: false,
      isRandomize: false,
      items: [],
    },
    {
      id: "grp-2",
      key: "",
      label: "",
      isExpanded: false,
      isRandomize: false,
      items: [],
    },
    {
      id: "grp-3",
      key: "",
      label: "",
      isExpanded: true,
      isRandomize: true,
      items: [
        { id: "item-1", label: "", value: "", alt: "" },
        { id: "item-2", label: "", value: "", alt: "" },
        { id: "item-3", label: "", value: "", alt: "" },
        { id: "item-4", label: "", value: "", alt: "" },
      ],
    },
    {
      id: "grp-4",
      key: "",
      label: "",
      isExpanded: false,
      isRandomize: false,
      items: [],
    },
  ]);

  const onAddSwitchGrp = () => {
    const id = `grp-${Date.now()}`;
    setSwitchGrps((prev) => [...prev, createSwitchGrp(id)]);
  };

  const onRemoveSwitchGrp = (id: string) => {
    setSwitchGrps((prev) => prev.filter((g) => g.id !== id));
  };

  const onToggleSwitchGrpExpand = (id: string) => {
    setSwitchGrps((prev) =>
      prev.map((g) => (g.id === id ? { ...g, isExpanded: !g.isExpanded } : g))
    );
  };

  const onSwitchGrpKeyBlur = (id: string, value: string) => {
    setSwitchGrps((prev) =>
      prev.map((g) => (g.id === id ? { ...g, key: value } : g))
    );
  };

  const onSwitchGrpLabelBlur = (id: string, value: string) => {
    setSwitchGrps((prev) =>
      prev.map((g) => (g.id === id ? { ...g, label: value } : g))
    );
  };

  const onSwitchGrpRandomizeChange = (grpId: string, value: boolean) => {
    setSwitchGrps((prev) =>
      prev.map((g) => (g.id === grpId ? { ...g, isRandomize: value } : g))
    );
  };

  const onAddSwitchItem = (grpId: string) => {
    const itemId = `item-${Date.now()}`;
    setSwitchGrps((prev) =>
      prev.map((g) =>
        g.id === grpId
          ? { ...g, items: [...g.items, createSwitchItem(itemId)] }
          : g
      )
    );
  };

  const onRemoveSwitchItem = (grpId: string, itemId: string) => {
    setSwitchGrps((prev) =>
      prev.map((g) =>
        g.id === grpId
          ? { ...g, items: g.items.filter((i) => i.id !== itemId) }
          : g
      )
    );
  };

  const onSwitchItemLabelBlur = (grpId: string, itemId: string, value: string) => {
    setSwitchGrps((prev) =>
      prev.map((g) =>
        g.id === grpId
          ? {
              ...g,
              items: g.items.map((i) =>
                i.id === itemId ? { ...i, label: value } : i
              ),
            }
          : g
      )
    );
  };

  const onSwitchItemValueBlur = (grpId: string, itemId: string, value: string) => {
    setSwitchGrps((prev) =>
      prev.map((g) =>
        g.id === grpId
          ? {
              ...g,
              items: g.items.map((i) =>
                i.id === itemId ? { ...i, value: value } : i
              ),
            }
          : g
      )
    );
  };

  const onSwitchItemAltBlur = (grpId: string, itemId: string, value: string) => {
    setSwitchGrps((prev) =>
      prev.map((g) =>
        g.id === grpId
          ? {
              ...g,
              items: g.items.map((i) =>
                i.id === itemId ? { ...i, alt: value } : i
              ),
            }
          : g
      )
    );
  };

  const viewModel: PresetBuilderViewModel = {
    switchGrps,
    onAddSwitchGrp,
    onRemoveSwitchGrp,
    onToggleSwitchGrpExpand,
    onSwitchGrpKeyBlur,
    onSwitchGrpLabelBlur,
    onSwitchGrpRandomizeChange,
    onAddSwitchItem,
    onRemoveSwitchItem,
    onSwitchItemLabelBlur,
    onSwitchItemValueBlur,
    onSwitchItemAltBlur,
  };

  return { viewModel };
}
