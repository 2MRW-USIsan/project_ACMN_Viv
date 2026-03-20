"use client";

import { useState } from "react";
import { AddPanelButtonAtom } from "@/components/atoms/AddPanelButtonAtom";
import { DeleteIconButtonAtom } from "@/components/atoms/DeleteIconButtonAtom";
import { DividerAtom } from "@/components/atoms/DividerAtom";
import { IndentedBoxAtom } from "@/components/atoms/IndentedBoxAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { LabeledSwitchAtom } from "@/components/atoms/LabeledSwitchAtom";
import { ListAtom } from "@/components/atoms/ListAtom";
import { ListItemAtom } from "@/components/atoms/ListItemAtom";
import { PanelHeaderLayoutAtom } from "@/components/atoms/PanelHeaderLayoutAtom";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { SelectItem } from "@/types/subPanel";

interface SelectSubPanelContentMoleculeProps {
  props: {
    selectItems: SelectItem[];
    onAddItem: () => void;
    onDeleteItem: (itemId: string) => void;
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
          const deleteButtonProps = {
            onClick: () => props.onDeleteItem(item.id),
          };
          return (
            <ListItemAtom key={item.id}>
              <PanelHeaderLayoutAtom>
                <TextFieldAtom props={labelFieldProps} />
                <TextFieldAtom props={promptFieldProps} />
                <DeleteIconButtonAtom props={deleteButtonProps} />
              </PanelHeaderLayoutAtom>
            </ListItemAtom>
          );
        })}
        <AddPanelButtonAtom props={addButtonProps} />
      </ListAtom>
    </IndentedBoxAtom>
  );
}
