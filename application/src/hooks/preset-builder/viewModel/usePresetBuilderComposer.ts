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
        informProps: {
          infoSectionLabel: {
            text: "",
            variant: undefined,
            color: undefined,
            fontWeight: undefined,
            style: undefined,
          },
          idLabel: {
            text: "",
            variant: undefined,
            color: undefined,
            fontWeight: undefined,
            style: undefined,
          },
          idValueLabel: {
            text: "",
            variant: undefined,
            color: undefined,
            fontWeight: undefined,
            style: undefined,
          },
          titleLabel: {
            text: "",
            variant: undefined,
            color: undefined,
            fontWeight: undefined,
            style: undefined,
          },
          titleField: {
            label: undefined,
            placeholder: undefined,
            value: undefined,
            defaultValue: undefined,
            onChange: undefined,
            onBlur: undefined,
            size: undefined,
            fullWidth: undefined,
            multiline: undefined,
            rows: undefined,
          },
          statusLabel: {
            text: "",
            variant: undefined,
            color: undefined,
            fontWeight: undefined,
            style: undefined,
          },
          statusValueLabel: {
            text: "",
            variant: undefined,
            color: undefined,
            fontWeight: undefined,
            style: undefined,
          },
          saveButton: {
            label: "",
            onClick: function (): void {
              throw new Error("Function not implemented.");
            },
            disabled: undefined,
            isLoading: undefined,
            size: undefined,
            variant: undefined,
            color: undefined,
            style: undefined,
          },
        },
        builderProps: {
          buildersSectionLabel: {
            text: "",
            variant: undefined,
            color: undefined,
            fontWeight: undefined,
            style: undefined,
          },
          shuffleButton: {
            label: "",
            onClick: function (): void {
              throw new Error("Function not implemented.");
            },
            disabled: undefined,
            isLoading: undefined,
            size: undefined,
            variant: undefined,
            color: undefined,
            style: undefined,
          },
          copyButton: {
            label: "",
            onClick: function (): void {
              throw new Error("Function not implemented.");
            },
            disabled: undefined,
            isLoading: undefined,
            size: undefined,
            variant: undefined,
            color: undefined,
            style: undefined,
          },
          pasteButton: {
            label: "",
            onClick: function (): void {
              throw new Error("Function not implemented.");
            },
            disabled: undefined,
            isLoading: undefined,
            size: undefined,
            variant: undefined,
            color: undefined,
            style: undefined,
          },
          resetButton: {
            label: "",
            onClick: function (): void {
              throw new Error("Function not implemented.");
            },
            disabled: undefined,
            isLoading: undefined,
            size: undefined,
            variant: undefined,
            color: undefined,
            style: undefined,
          },
          clearButton: {
            label: "",
            onClick: function (): void {
              throw new Error("Function not implemented.");
            },
            disabled: undefined,
            isLoading: undefined,
            size: undefined,
            variant: undefined,
            color: undefined,
            style: undefined,
          },
          presetsTemplateLabel: {
            text: "",
            variant: undefined,
            color: undefined,
            fontWeight: undefined,
            style: undefined,
          },
          presetsTemplateField: {
            label: undefined,
            placeholder: undefined,
            value: undefined,
            defaultValue: undefined,
            onChange: undefined,
            onBlur: undefined,
            rows: undefined,
            multiline: undefined,
            fullWidth: undefined,
          },
          orderPresetsLabel: {
            text: "",
            variant: undefined,
            color: undefined,
            fontWeight: undefined,
            style: undefined,
          },
          orderPresetsField: {
            label: undefined,
            placeholder: undefined,
            value: undefined,
            defaultValue: undefined,
            onChange: undefined,
            onBlur: undefined,
            rows: undefined,
            multiline: undefined,
            fullWidth: undefined,
          },
        },
      },
    } satisfies PresetBuilderViewModel,
  };
}
