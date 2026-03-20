"use client";

import { useState } from "react";
import { AddPanelButtonAtom } from "@/components/atoms/AddPanelButtonAtom";
import { DividerAtom } from "@/components/atoms/DividerAtom";
import { IndentedBoxAtom } from "@/components/atoms/IndentedBoxAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { LabeledSwitchAtom } from "@/components/atoms/LabeledSwitchAtom";
import { ListAtom } from "@/components/atoms/ListAtom";
import { ListItemAtom } from "@/components/atoms/ListItemAtom";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { PanelItemMolecule } from "@/components/molecules/PanelItemMolecule";
import { SelectItem } from "@/types/subPanel";

interface SelectSubPanelContentMoleculeProps {
  props: {
    selectItems: SelectItem[];
    onAddItem: () => void;
    onDeleteItem: (itemId: string) => void;
    onToggle: (itemId: string) => void;
    onKeyChange: (itemId: string, value: string) => void;
    onItemLabelChange: (itemId: string, value: string) => void;
    onLabelChange: (itemId: string, value: string) => void;
    onPromptChange: (itemId: string, value: string) => void;
  };
}

export function SelectSubPanelContentMolecule({
  props,
}: SelectSubPanelContentMoleculeProps) {
  const [isShuffled, setIsShuffled] = useState(false);
  const selectItems = props.selectItems ?? [];

  const shuffleSwitchProps = {
    label: "Shuffle",
    checked: isShuffled,
    onChange: setIsShuffled,
  };
  const headingLabelProps = { text: "List Items:" };
  const addButtonProps = {
    onAdd: props.onAddItem,
    hasItems: selectItems.length > 0,
  };

  return (
    <IndentedBoxAtom>
      <ListAtom>
        <LabeledSwitchAtom props={shuffleSwitchProps} />
        <LabelAtom props={headingLabelProps} />
        <DividerAtom />
        {selectItems.map((item) => {
          const panelItemProps = {
            id: item.id,
            itemLabel: "Item:",
            panelKey: item.panelKey,
            panelLabel: item.panelLabel,
            expanded: item.expanded,
            onToggle: (_id: string) => props.onToggle(item.id),
            onKeyChange: (_id: string, value: string) =>
              props.onKeyChange(item.id, value),
            onLabelChange: (_id: string, value: string) =>
              props.onItemLabelChange(item.id, value),
            onDelete: () => props.onDeleteItem(item.id),
          };
          const labelFieldProps = {
            label: "Label",
            defaultValue: item.label,
            onBlur: (value: string) => props.onLabelChange(item.id, value),
          };
          const promptFieldProps = {
            label: "Prompt",
            defaultValue: item.prompt,
            onBlur: (value: string) => props.onPromptChange(item.id, value),
          };
          return (
            <PanelItemMolecule key={item.id} props={panelItemProps}>
              <IndentedBoxAtom>
                <ListAtom>
                  <ListItemAtom>
                    <TextFieldAtom props={labelFieldProps} />
                  </ListItemAtom>
                  <ListItemAtom>
                    <TextFieldAtom props={promptFieldProps} />
                  </ListItemAtom>
                </ListAtom>
              </IndentedBoxAtom>
            </PanelItemMolecule>
          );
        })}
        <AddPanelButtonAtom props={addButtonProps} />
      </ListAtom>
    </IndentedBoxAtom>
  );
}
