"use client";

import { ListItemAtom } from "@/components/atoms/ListItemAtom";
import { ListItemButtonAtom } from "@/components/atoms/ListItemButtonAtom";
import { ListItemTextAtom } from "@/components/atoms/ListItemTextAtom";
import { ExpandIconAtom } from "@/components/atoms/ExpandIconAtom";
import { CollapseAtom } from "@/components/atoms/CollapseAtom";

interface PanelItemMoleculeProps {
  props: {
    id: string;
    expanded: boolean;
    onToggle: (id: string) => void;
  };
  children?: React.ReactNode;
}

export function PanelItemMolecule({ props, children }: PanelItemMoleculeProps) {
  const handleToggle = () => props.onToggle(props.id);

  return (
    <>
      <ListItemAtom>
        <ListItemButtonAtom props={{ onClick: handleToggle }}>
          <ListItemTextAtom props={{ primary: props.id }} />
          <ExpandIconAtom props={{ expanded: props.expanded }} />
        </ListItemButtonAtom>
      </ListItemAtom>
      <CollapseAtom props={{ in: props.expanded }}>
        {/* TODO: YAML editor content will be added in a future step */}
        {children}
      </CollapseAtom>
    </>
  );
}
