"use client";

import { PanelItemMolecule } from "@/components/molecules/PanelItemMolecule";
import { SelectorItemOrganisms } from "@/components/organisms/SelectorItemOrganisms";
import { PanelListMolecule } from "../molecules/PanelListMolecule";
import type { ComponentProps } from "react";

type PanelListProps = ComponentProps<typeof PanelListMolecule>["props"];
type PanelItemProps = ComponentProps<typeof PanelItemMolecule>["props"];
type SelectorItemProps = ComponentProps<typeof SelectorItemOrganisms>["props"];

interface SelectorListItem {
  id: string;
  panelItemProps: PanelItemProps;
  itemProps: SelectorItemProps;
}

interface SelectorListOrganismsProps {
  props: {
    selectorList: SelectorListItem[];
    panelListProps: PanelListProps;
  };
}

export function SelectorListOrganisms({ props }: SelectorListOrganismsProps) {
  return (
    <PanelListMolecule props={props.panelListProps}>
      {props.selectorList.map((selector) => {
        return (
          <PanelItemMolecule key={selector.id} props={selector.panelItemProps}>
            <SelectorItemOrganisms props={selector.itemProps} />
          </PanelItemMolecule>
        );
      })}
    </PanelListMolecule>
  );
}
