"use client";

import { ListAtom } from "@/components/atoms/ListAtom";
import { AddPanelButtonAtom } from "@/components/atoms/AddPanelButtonAtom";
import { PanelItemMolecule } from "@/components/molecules/PanelItemMolecule";
import {
  SubPanelSelectorMolecule,
  SubPanelType,
  SubPanelItem,
} from "@/components/molecules/SubPanelSelectorMolecule";

interface YamlPanelListOrganismProps {
  props: {
    todoPanelList: {
      id: string;
      panelKey: string;
      panelLabel: string;
      expanded: boolean;
      subPanels: Partial<Record<SubPanelType, SubPanelItem>>;
    }[];
    todoOnPanelToggle: (id: string) => void;
    todoOnPanelKeyChange: (id: string, value: string) => void;
    todoOnPanelLabelChange: (id: string, value: string) => void;
    todoOnPanelDelete: (id: string) => void;
    todoOnPanelAdd: () => void;
    todoOnSubPanelToggleEnabled: (
      panelId: string,
      subType: SubPanelType,
    ) => void;
    todoOnSubPanelToggleExpanded: (
      panelId: string,
      subType: SubPanelType,
    ) => void;
    todoOnSubPanelKeyChange: (
      panelId: string,
      subType: SubPanelType,
      value: string,
    ) => void;
    todoOnSubPanelLabelChange: (
      panelId: string,
      subType: SubPanelType,
      value: string,
    ) => void;
  };
}

export function YamlPanelListOrganism({ props }: YamlPanelListOrganismProps) {
  return (
    <ListAtom>
      {props.todoPanelList.map((panel) => (
        <PanelItemMolecule
          key={panel.id}
          props={{
            id: panel.id,
            panelKey: panel.panelKey,
            panelLabel: panel.panelLabel,
            expanded: panel.expanded,
            onToggle: props.todoOnPanelToggle,
            onKeyChange: props.todoOnPanelKeyChange,
            onLabelChange: props.todoOnPanelLabelChange,
            onDelete: props.todoOnPanelDelete,
          }}
        >
          <SubPanelSelectorMolecule
            props={{
              panelId: panel.id,
              subPanels: panel.subPanels,
              onToggleEnabled: props.todoOnSubPanelToggleEnabled,
              onToggleExpanded: props.todoOnSubPanelToggleExpanded,
              onKeyChange: props.todoOnSubPanelKeyChange,
              onLabelChange: props.todoOnSubPanelLabelChange,
            }}
          />
        </PanelItemMolecule>
      ))}
      <AddPanelButtonAtom
        props={{
          onAdd: props.todoOnPanelAdd,
          hasItems: props.todoPanelList.length > 0,
        }}
      />
    </ListAtom>
  );
}
