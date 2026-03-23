"use client";

import { NavItem } from "@/types/navigation";
import { PresetBuilderContexts } from "@/hooks/preset-builder/state/usePresetBuilderContext";
import { usePresetBuilderProperties } from "@/hooks/preset-builder/viewModel/usePresetBuilderProperties";
import { usePresetBuilderHandlers } from "@/hooks/preset-builder/viewModel/usePresetBuilderHandlers";

export interface PresetBuilderViewModel {
  navigation: {
    appBarTitle: string;
    isDrawerOpen: boolean;
    navItems: NavItem[];
    onMenuClick: () => void;
    onNavItemClick: (href: string) => void;
  };
  header: {
    presetOptions: string[];
    selectedPreset: string;
    onPresetChange: (value: string) => void;
    onLoad: () => void;
    presetName: string;
    hasChanges: boolean;
    onChange: () => void;
    onSave: () => void;
  };
  presetSheet: {
    value: string;
    onValueChange: (value: string) => void;
    onShuffle: () => void;
    onCopy: () => void;
  };
  ordersSheet: {
    value: string;
    onValueChange: (value: string) => void;
    onPaste: () => void;
    onReset: () => void;
    onClear: () => void;
  };
}

export function usePresetBuilderComposer(contexts: PresetBuilderContexts) {
  const { properties: _properties } = usePresetBuilderProperties(contexts);
  const { handlers: _handlers } = usePresetBuilderHandlers(contexts);

  // Stub: state management will be implemented in a subsequent step.
  return {
    viewModel: {
      navigation: {
        appBarTitle: "",
        isDrawerOpen: false,
        navItems: [],
        onMenuClick: () => {},
        onNavItemClick: (_href: string) => {},
      },
      header: {
        presetOptions: [],
        selectedPreset: "",
        onPresetChange: (_value: string) => {},
        onLoad: () => {},
        presetName: "",
        hasChanges: false,
        onChange: () => {},
        onSave: () => {},
      },
      presetSheet: {
        value: "",
        onValueChange: (_value: string) => {},
        onShuffle: () => {},
        onCopy: () => {},
      },
      ordersSheet: {
        value: "",
        onValueChange: (_value: string) => {},
        onPaste: () => {},
        onReset: () => {},
        onClear: () => {},
      },
    } satisfies PresetBuilderViewModel,
  };
}
