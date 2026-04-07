"use client";

import { DividerAtom } from "@/components/atoms/DividerAtom";
import { GridLayoutAtom } from "@/components/atoms/GridLayoutAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { StackAtom } from "@/components/atoms/StackAtom";
import { ScriptsSection } from "@/hooks/configurations/viewModel/useConfigurationsComposer";

interface ConfigurationOrdersItemScriptsOrganismProps {
  props: ScriptsSection;
}

export function ConfigurationOrdersItemScriptsOrganism({
  props,
}: ConfigurationOrdersItemScriptsOrganismProps) {
  return (
    <GridLayoutAtom>
      <StackAtom props={{ direction: "row", alignItems: "center", spacing: 2, py: 1 }}>
        <LabelAtom props={props.scriptLabel} />
        <GridLayoutAtom props={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <LabelAtom props={props.scriptInfoLabel} />
        </GridLayoutAtom>
      </StackAtom>
      <DividerAtom />
    </GridLayoutAtom>
  );
}
