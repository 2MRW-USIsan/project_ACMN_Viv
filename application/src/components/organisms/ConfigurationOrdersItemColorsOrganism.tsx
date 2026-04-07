"use client";

import { DividerAtom } from "@/components/atoms/DividerAtom";
import { GridLayoutAtom } from "@/components/atoms/GridLayoutAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { StackAtom } from "@/components/atoms/StackAtom";
import { ColorsSection } from "@/hooks/configurations/viewModel/useConfigurationsComposer";

interface ConfigurationOrdersItemColorsOrganismProps {
  props: ColorsSection;
}

export function ConfigurationOrdersItemColorsOrganism({
  props,
}: ConfigurationOrdersItemColorsOrganismProps) {
  return (
    <GridLayoutAtom>
      <StackAtom props={{ direction: "row", alignItems: "center", spacing: 2, py: 1 }}>
        <LabelAtom props={props.colorLabel} />
        <GridLayoutAtom props={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <LabelAtom props={props.colorInfoLabel} />
        </GridLayoutAtom>
      </StackAtom>
      <DividerAtom />
    </GridLayoutAtom>
  );
}
