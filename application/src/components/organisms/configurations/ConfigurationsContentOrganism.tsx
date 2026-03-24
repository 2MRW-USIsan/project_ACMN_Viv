"use client";

import { BackgroundAtom } from "@/components/atoms/BackgroundAtom";
import { BlocItem } from "@/types/configurationsItem";
import { ConfigurationsHeaderOrganism } from "@/components/organisms/configurations/ConfigurationsHeaderOrganism";
import { ConfigurationsBlocInfoPanelsOrganism } from "@/components/organisms/configurations/ConfigurationsBlocInfoPanelsOrganism";

interface ConfigurationsContentOrganismProps {
  props: {
    header: {
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
    blocPanelInfo: {
      frame: {
        label: {
          text: string;
          variant?: "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "caption";
        };
      };
      blocs: {
        items: BlocItem[];
      };
      addPanel: {
        onAddBloc: () => void;
      };
    };
  };
}

export function ConfigurationsContentOrganism({
  props,
}: ConfigurationsContentOrganismProps) {
  return (
    <BackgroundAtom>
      {/* Header Section */}
      <ConfigurationsHeaderOrganism props={props.header} />
      {/* Bloc Info Panels Section */}
      <ConfigurationsBlocInfoPanelsOrganism props={props.blocPanelInfo} />
    </BackgroundAtom>
  );
}
