"use client";

import { AddPanelButtonAtom } from "@/components/atoms/AddPanelButtonAtom";
import { DividerAtom } from "@/components/atoms/DividerAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { ListAtom } from "@/components/atoms/ListAtom";
import { PanelItemMolecule } from "@/components/molecules/PanelItemMolecule";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { SelectItemPanel } from "@/types/subPanel";

const LABEL = "Select Items:";

interface SelectSubPanelContentMoleculeProps {
  props: {
    selectItems: SelectItemPanel[];
    onToggleExpanded: (itemId: string) => void;
    onKeyChange: (itemId: string, value: string) => void;
    onLabelChange: (itemId: string, value: string) => void;
    onLabelTextChange: (itemId: string, value: string) => void;
    onPromptChange: (itemId: string, value: string) => void;
    onDelete: (itemId: string) => void;
    onAdd: () => void;
  };
}

export function SelectSubPanelContentMolecule({
  props,
}: SelectSubPanelContentMoleculeProps) {
  const headingLabelProps = { text: LABEL };
  const addButtonProps = {
    onAdd: props.onAdd,
    hasItems: props.selectItems.length > 0,
  };

  return (
    <ListAtom>
      <LabelAtom props={headingLabelProps} />
      <DividerAtom />
      {props.selectItems.map((item) => {
        const panelItemProps = {
          id: item.id,
          panelKey: item.panelKey,
          panelLabel: item.panelLabel,
          expanded: item.expanded,
          onToggle: (_id: string) => props.onToggleExpanded(item.id),
          onKeyChange: (_id: string, value: string) =>
            props.onKeyChange(item.id, value),
          onLabelChange: (_id: string, value: string) =>
            props.onLabelChange(item.id, value),
          onDelete: (_id: string) => props.onDelete(item.id),
        };
        const labelTextFieldProps = {
          label: "Label",
          defaultValue: item.labelText,
          onBlur: (value: string) => props.onLabelTextChange(item.id, value),
        };
        const promptTextFieldProps = {
          label: "Prompt",
          defaultValue: item.promptText,
          onBlur: (value: string) => props.onPromptChange(item.id, value),
        };
        return (
          <PanelItemMolecule key={item.id} props={panelItemProps}>
            <TextFieldAtom props={labelTextFieldProps} />
            <TextFieldAtom props={promptTextFieldProps} />
          </PanelItemMolecule>
        );
      })}
      <AddPanelButtonAtom props={addButtonProps} />
    </ListAtom>
  );
}
