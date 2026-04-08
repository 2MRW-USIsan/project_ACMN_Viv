"use client";

import { PresetBuilderContexts } from "@/hooks/preset-builder/state/usePresetBuilderContext";
import { usePresetBuilderProperties } from "@/hooks/preset-builder/viewModel/usePresetBuilderProperties";
import { usePresetBuilderHandlers } from "@/hooks/preset-builder/viewModel/usePresetBuilderHandlers";
import { NavigationOrganismProps } from "@/components/organisms/navigation/NavigationOrganism";
import { PresetBuilderBodyViewModel } from "@/components/organisms/preset-builder/PresetBuilderBodyOrganism";

export type { PresetBuilderBodyViewModel };

export interface PresetBuilderViewModel {
  navigationLayout: {
    appBar: {
      title: string;
      onMenuOpen: () => void;
    };
    drawer: {
      open: boolean;
      onClose: () => void;
    };
    navigation: NavigationOrganismProps["props"];
  };
  presetBuilderBody: PresetBuilderBodyViewModel;
}

export function usePresetBuilderComposer(contexts: PresetBuilderContexts) {
  const { properties: _properties } = usePresetBuilderProperties(contexts);
  const { handlers: _handlers } = usePresetBuilderHandlers(contexts);

  return {
    viewModel: {
      navigationLayout: {
        appBar: {
          title: "ACMN",
          onMenuOpen: () => {},
        },
        drawer: {
          open: false,
          onClose: () => {},
        },
        navigation: {
          activeItemLabel: undefined,
          links: [],
        },
      },
      presetBuilderBody: {
        infoSectionLabel: {
          text: "Information Field:",
          variant: "subtitle1" as const,
        },
        idLabel: { text: "ID:", variant: "body2" as const },
        idValueLabel: { text: "#01 - [uuid]", variant: "body2" as const },
        titleLabel: { text: "Title:", variant: "body2" as const },
        titleField: {
          placeholder: "text field...",
          defaultValue: "",
          onBlur: () => {},
          size: "small" as const,
          fullWidth: true,
        },
        statusLabel: { text: "Status:", variant: "body2" as const },
        statusValueLabel: {
          text: "- there are some changes... -",
          variant: "body2" as const,
        },
        saveButton: {
          label: "Save",
          onClick: () => {},
          size: "small" as const,
        },
        buildersSectionLabel: {
          text: "Builders Field:",
          variant: "subtitle1" as const,
        },
        shuffleButton: {
          label: "Shuffle",
          onClick: () => {},
          size: "small" as const,
        },
        copyButton: {
          label: "Copy",
          onClick: () => {},
          size: "small" as const,
        },
        pasteButton: {
          label: "Paste",
          onClick: () => {},
          size: "small" as const,
        },
        resetButton: {
          label: "Reset",
          onClick: () => {},
          size: "small" as const,
        },
        clearButton: {
          label: "Clear",
          onClick: () => {},
          size: "small" as const,
        },
        presetsTemplateLabel: {
          text: "Presets Template:",
          variant: "body2" as const,
        },
        presetsTemplateField: {
          placeholder: "Text area Field...",
          defaultValue: "",
          onBlur: () => {},
          multiline: true,
          rows: 14,
          fullWidth: true,
        },
        orderPresetsLabel: {
          text: "Order Presets:",
          variant: "body2" as const,
        },
        orderPresetsField: {
          placeholder: "Text area Field...",
          defaultValue: "",
          onBlur: () => {},
          multiline: true,
          rows: 14,
          fullWidth: true,
        },
      },
    } satisfies PresetBuilderViewModel,
  };
}
