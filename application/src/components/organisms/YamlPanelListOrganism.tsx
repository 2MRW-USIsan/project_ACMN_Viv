"use client";

import { ListAtom } from "@/components/atoms/ListAtom";
import { AddPanelButtonAtom } from "@/components/atoms/AddPanelButtonAtom";
import { PanelItemMolecule } from "@/components/molecules/PanelItemMolecule";

interface YamlPanelListOrganismProps {
  props: {
    todoPanelList: {
      id: string;
      panelKey: string;
      panelLabel: string;
      expanded: boolean;
    }[];
    todoOnPanelToggle: (id: string) => void;
    todoOnPanelKeyChange: (id: string, value: string) => void;
    todoOnPanelLabelChange: (id: string, value: string) => void;
    todoOnPanelDelete: (id: string) => void;
    todoOnPanelAdd: () => void;
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
        />
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
