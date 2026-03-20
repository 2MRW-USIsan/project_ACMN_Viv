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
    itemLabel: string;
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

  const labelProps = { text: props.itemLabel };
  const keyFieldProps = {
    label: "Key",
    defaultValue: props.panelKey,
    onBlur: handleKeyChange,
  };
  const labelFieldProps = {
    label: "Label",
    defaultValue: props.panelLabel,
    onBlur: handleLabelChange,
  };
  const deleteButtonProps = { onClick: handleDelete };
  const expandButtonProps = { expanded: props.expanded, onClick: handleToggle };
  const collapseProps = { in: props.expanded };

  return (
    <>
      <ListItemAtom>
        <PanelHeaderLayoutAtom>
          <LabelAtom props={labelProps} />
          <TextFieldAtom props={keyFieldProps} />
          <TextFieldAtom props={labelFieldProps} />
          <DeleteIconButtonAtom props={deleteButtonProps} />
          <ExpandIconButtonAtom props={expandButtonProps} />
        </PanelHeaderLayoutAtom>
      </ListItemAtom>
      <CollapseAtom props={collapseProps}>{children}</CollapseAtom>
    </>
  );
}
