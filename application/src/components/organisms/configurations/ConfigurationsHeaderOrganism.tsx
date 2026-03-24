"use client";

import { BoxAtom } from "@/components/atoms/BoxAtom";
import { ConfigurationsNameEditorMolecule } from "@/components/molecules/ConfigurationsNameEditorMolecule";
import { ConfigurationsSetSelectorMolecule } from "@/components/molecules/ConfigurationsSetSelectorMolecule";

interface ConfigurationsHeaderOrganismProps {
  props: {
    isLoaded: boolean;
    sets: {
      options: string[];
      selectedSet: string;
      onSetChange: (value: string) => void;
      onLoad: () => void;
    };
    name: {
      nameValue: string;
      hasChanges: boolean;
      onNameBlur: (value: string) => void;
      onSave: () => void;
    };
  };
}

export function ConfigurationsHeaderOrganism({
  props,
}: ConfigurationsHeaderOrganismProps) {
  const { isLoaded, sets, name } = props;

  return (
    <BoxAtom props={{ sx: { px: 2, pt: 1, pb: 0.5 } }}>
      {!isLoaded ? (
        <ConfigurationsSetSelectorMolecule
          props={{
            styling: {
              direction: "row",
              alignItems: "center",
              spacing: 1,
              sx: { mb: 0.5 },
            },
            label: {
              text: "Sets:",
              variant: "body2",
            },
            selector: {
              value: sets.selectedSet,
              options: sets.options,
              onChange: sets.onSetChange,
              fullWidth: true,
            },
            load: {
              label: "Load",
              onClick: sets.onLoad,
            },
          }}
        />
      ) : (
        <ConfigurationsNameEditorMolecule props={name} />
      )}
    </BoxAtom>
  );
}
