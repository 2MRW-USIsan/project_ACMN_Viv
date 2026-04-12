import { NavigationOrganismProps } from "@/components/organisms/navigation/NavigationOrganism";
import { PresetBuilderContexts } from "@/hooks/preset-builder/state/usePresetBuilderContext";
import { BodyType } from "@/types/preset-builder";
import { usePresetBuilderHandlers } from "@/hooks/preset-builder/viewModel/usePresetBuilderHandlers";
import { usePresetBuilderProperties } from "@/hooks/preset-builder/viewModel/usePresetBuilderProperties";

export interface PresetBuilderViewModel {
  navigationLayout: {
    appBar: {
      onMenuOpen: () => void;
    };
    drawer: {
      open: boolean;
      onClose: () => void;
    };
    title: string;
    navigation: NavigationOrganismProps["props"];
  };
  presetBuilderBody: BodyType;
}

export function usePresetBuilderComposer(contexts: PresetBuilderContexts) {
  const { properties: _properties } = usePresetBuilderProperties(contexts);
  const { handlers: _handlers } = usePresetBuilderHandlers(contexts);

  return {
    viewModel: {
      navigationLayout: {
        appBar: {
          onMenuOpen: () => {},
        },
        drawer: {
          open: false,
          onClose: () => {},
        },
        title: "ACMN",
        navigation: {
          activeItemLabel: undefined,
          links: [],
        },
      },
      presetBuilderBody: {
        informProps: {
          infoSectionLabel: { text: "Information Field:" },
          idLabel: { text: "ID:" },
          idValueLabel: { text: "#01 - [uuid]" },
          titleLabel: { text: "Title:" },
          titleField: {
            placeholder: "text field...",
            value: "",
            onChange: () => {},
          },
          statusLabel: { text: "Status:" },
          statusValueLabel: { text: "- there are some changes... -" },
          saveButton: { label: "Save", onClick: () => {} },
        },
        builderProps: {
          label: { text: "Builders Field:" },
          shuffleButton: { label: "Shuffle", onClick: () => {} },
          copyButton: { label: "Copy", onClick: () => {} },
          pasteButton: { label: "Paste", onClick: () => {} },
          resetButton: { label: "Reset", onClick: () => {} },
          clearButton: { label: "Clear", onClick: () => {} },
          presetsTemplateLabel: { text: "Presets Template:" },
          presetsTemplateField: {
            placeholder: "Text area Field...",
            value: "",
            onChange: () => {},
          },
          orderPresetsLabel: { text: "Order Presets:" },
          orderPresetsField: {
            placeholder: "Text area Field...",
            value: "",
            onChange: () => {},
          },
        },
      },
    } satisfies PresetBuilderViewModel,
  };
}
