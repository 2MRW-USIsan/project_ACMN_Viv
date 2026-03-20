"use client";

import { ListAtom } from "@/components/atoms/ListAtom";
import { AddPanelButtonAtom } from "@/components/atoms/AddPanelButtonAtom";
import { PanelItemMolecule } from "@/components/molecules/PanelItemMolecule";

interface YamlPanelListOrganismProps {
  props: {
    todoPanelList: { id: string; expanded: boolean }[];
    todoOnPanelToggle: (id: string) => void;
    todoOnPanelAdd: () => void;
  };
}

export function YamlPanelListOrganism({ props }: YamlPanelListOrganismProps) {
  return (
    <ListAtom>
      {props.todoPanelList.map((panel) => (
        <PanelItemMolecule
          key={panel.id}
          props={{ id: panel.id, expanded: panel.expanded, onToggle: props.todoOnPanelToggle }}
        />
      ))}
      <AddPanelButtonAtom
        props={{ onAdd: props.todoOnPanelAdd, hasItems: props.todoPanelList.length > 0 }}
      />
    </ListAtom>
  );
}
