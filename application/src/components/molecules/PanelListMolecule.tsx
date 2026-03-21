"use client";

import { AddPanelButtonAtom } from "@/components/atoms/AddPanelButtonAtom";
import { DividerAtom } from "@/components/atoms/DividerAtom";
import { IndentedBoxAtom } from "@/components/atoms/IndentedBoxAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { ListAtom } from "@/components/atoms/ListAtom";

export interface PanelListMoleculeProps {
  props: {
    headingText?: string;
    todoOnPanelAdd: () => void;
    hasItems: boolean;
  };
  children?: React.ReactNode;
}

export function PanelListMolecule({ props, children }: PanelListMoleculeProps) {
  const headingLabelProps = { text: props.headingText ?? "Blocs Items:" };
  const addButtonProps = {
    onAdd: props.todoOnPanelAdd,
    hasItems: props.hasItems,
    label: "Add Panel",
  };

  return (
    <ListAtom>
      <LabelAtom props={headingLabelProps} />
      <DividerAtom />
      <IndentedBoxAtom>{children}</IndentedBoxAtom>
      <AddPanelButtonAtom props={addButtonProps} />
      <DividerAtom />
    </ListAtom>
  );
}
