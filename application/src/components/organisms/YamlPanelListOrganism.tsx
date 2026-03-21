"use client";

import { PanelItemMolecule } from "@/components/molecules/PanelItemMolecule";
import { PanelListMolecule } from "@/components/molecules/PanelListMolecule";
import { YamlPanelItemOrganisms } from "@/components/organisms/YamlPanelItemOrganisms";
import type { ComponentProps } from "react";

type PanelListProps = ComponentProps<typeof PanelListMolecule>["props"];
type PanelItemProps = ComponentProps<typeof PanelItemMolecule>["props"];
type YamlPanelItemProps = ComponentProps<
  typeof YamlPanelItemOrganisms
>["props"];

interface YamlPanelListOrganismProps {
  props: {
    panelListProps: PanelListProps;
    todoPanelList: {
      id: string;
      panelItemProps: PanelItemProps;
      itemProps: YamlPanelItemProps;
    }[];
  };
}

export function YamlPanelListOrganism({ props }: YamlPanelListOrganismProps) {
  return (
    <PanelListMolecule props={props.panelListProps}>
      {props.todoPanelList.map((panel) => {
        return (
          <PanelItemMolecule key={panel.id} props={panel.panelItemProps}>
            <YamlPanelItemOrganisms props={panel.itemProps} />
          </PanelItemMolecule>
        );
      })}
    </PanelListMolecule>
  );
}
