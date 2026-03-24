"use client";

import { ConfigurationsAddBlocMolecule } from "@/components/molecules/ConfigurationsAddBlocMolecule";
import { ConfigurationsBlocFrameMolecule } from "@/components/molecules/ConfigurationsBlocFrameMolecule";
import { BlocItem } from "@/types/configurationsItem";
import { ConfigurationsBlocListOrganism } from "./ConfigurationsBlocListOrganism";

interface ConfigurationsBlocInfoPanelsOrganismProps {
  props: {
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
}

export function ConfigurationsBlocInfoPanelsOrganism({
  props,
}: ConfigurationsBlocInfoPanelsOrganismProps) {
  return (
    <ConfigurationsBlocFrameMolecule props={props.frame}>
      <ConfigurationsBlocListOrganism props={props.blocs} />
      <ConfigurationsAddBlocMolecule props={props.addPanel} />
    </ConfigurationsBlocFrameMolecule>
  );
}
