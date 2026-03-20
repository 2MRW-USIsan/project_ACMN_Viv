"use client";

import { ListItemAtom } from "@/components/atoms/ListItemAtom";
import { PanelHeaderLayoutAtom } from "@/components/atoms/PanelHeaderLayoutAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { DeleteIconButtonAtom } from "@/components/atoms/DeleteIconButtonAtom";
import { ExpandIconButtonAtom } from "@/components/atoms/ExpandIconButtonAtom";
import { CollapseAtom } from "@/components/atoms/CollapseAtom";

interface PanelItemMoleculeProps {
  props: {
    id: string;
    panelKey: string;
    panelLabel: string;
    expanded: boolean;
    onToggle: (id: string) => void;
    onKeyChange: (id: string, value: string) => void;
    onLabelChange: (id: string, value: string) => void;
    onDelete: (id: string) => void;
  };
  children?: React.ReactNode;
}

export function PanelItemMolecule({ props, children }: PanelItemMoleculeProps) {
  const handleToggle = () => props.onToggle(props.id);
  const handleKeyChange = (value: string) => props.onKeyChange(props.id, value);
  const handleLabelChange = (value: string) =>
    props.onLabelChange(props.id, value);
  const handleDelete = () => props.onDelete(props.id);

  return (
    <>
      <ListItemAtom>
        <PanelHeaderLayoutAtom>
          <LabelAtom props={{ text: "Blocs:" }} />
          <TextFieldAtom
            props={{
              label: "Key",
              defaultValue: props.panelKey,
              onBlur: handleKeyChange,
            }}
          />
          <TextFieldAtom
            props={{
              label: "Label",
              defaultValue: props.panelLabel,
              onBlur: handleLabelChange,
            }}
          />
          <DeleteIconButtonAtom props={{ onClick: handleDelete }} />
          <ExpandIconButtonAtom
            props={{ expanded: props.expanded, onClick: handleToggle }}
          />
        </PanelHeaderLayoutAtom>
      </ListItemAtom>
      <CollapseAtom props={{ in: props.expanded }}>{children}</CollapseAtom>
    </>
  );
}
