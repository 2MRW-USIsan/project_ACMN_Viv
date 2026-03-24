"use client";

import { Box, Toolbar } from "@mui/material";
import { BlocItem } from "@/types/configurationsItem";
import { ConfigurationsHeaderOrganism } from "@/components/organisms/configurations/ConfigurationsHeaderOrganism";
import { ConfigurationsBlocInfoPanelsOrganism } from "@/components/organisms/configurations/ConfigurationsBlocInfoPanelsOrganism";

interface ConfigurationsContentOrganismProps {
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
    blocInfoPanels: {
      items: BlocItem[];
      onRemoveItem: (id: string) => void;
      onToggleExpand: (id: string) => void;
      onAddBloc: () => void;
      onItemShortLabelChange: (id: string, value: string) => void;
      onItemLongLabelChange: (id: string, value: string) => void;
    };
  };
}

export function ConfigurationsContentOrganism({
  props,
}: ConfigurationsContentOrganismProps) {
  const { isLoaded, sets, name, blocInfoPanels } = props;

  return (
    <Box>
      <Toolbar />
      {/* Header Section */}
      <ConfigurationsHeaderOrganism
        props={{ isLoaded, sets, name }}
      />
      {/* Bloc Info Panels Section */}
      <ConfigurationsBlocInfoPanelsOrganism props={blocInfoPanels} />
    </Box>
  );
}
