"use client";

import { LabeledSwitchAtom } from "@/components/atoms/LabeledSwitchAtom";
import { SelectItem } from "@/types/subPanel";
import type { ComponentProps } from "react";
import { DividerAtom } from "../atoms/DividerAtom";
import { IndentedBoxAtom } from "../atoms/IndentedBoxAtom";
import { SelectorListOrganisms } from "./SelectorListOrganisms";

type LabeledSwitchProps = ComponentProps<typeof LabeledSwitchAtom>["props"];
type SelectorListOrganismsProps = ComponentProps<
  typeof SelectorListOrganisms
>["props"];

interface SelectPanelItemOrganismProps {
  props: {
    selectItems: SelectItem[];
    shuffle: LabeledSwitchProps;
    selectorListProps: SelectorListOrganismsProps;
    onDeleteItem: (itemId: string) => void;
    onToggle: (itemId: string) => void;
    onKeyChange: (itemId: string, value: string) => void;
    onItemLabelChange: (itemId: string, value: string) => void;
    onLabelChange: (itemId: string, value: string) => void;
    onPromptChange: (itemId: string, value: string) => void;
  };
}

export function SelectPanelItemOrganism({
  props,
}: SelectPanelItemOrganismProps) {
  return (
    <>
      <LabeledSwitchAtom props={props.shuffle} />
      <DividerAtom />
      <SelectorListOrganisms props={props.selectorListProps} />
    </>
  );
}
