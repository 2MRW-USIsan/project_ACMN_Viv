"use client";

import { PanelItemMolecule } from "@/components/molecules/PanelItemMolecule";
import { SelectPanelItemOrganism } from "@/components/organisms/SelectPanelItemOrganism";
import { PanelListMolecule } from "../molecules/PanelListMolecule";
import type { ComponentProps } from "react";

type PanelListProps = ComponentProps<typeof PanelListMolecule>["props"];
type PanelItemProps = ComponentProps<typeof PanelItemMolecule>["props"];
type SelectPanelItemProps = ComponentProps<
  typeof SelectPanelItemOrganism
>["props"];

interface SelectPanelListOrganismProps {
  props: {
    panelListProps: PanelListProps;
    subPanelList: {
      id: string;
      panelItemProps: PanelItemProps;
      itemProps: SelectPanelItemProps;
    }[];
  };
}

export function SelectPanelListOrganism({
  props,
}: SelectPanelListOrganismProps) {
  return (
    <PanelListMolecule props={props.panelListProps}>
      {props.subPanelList.map((subPanel) => {
        return (
          <PanelItemMolecule key={subPanel.id} props={subPanel.panelItemProps}>
            <SelectPanelItemOrganism props={subPanel.itemProps} />
          </PanelItemMolecule>
        );
      })}
    </PanelListMolecule>
  );
}
