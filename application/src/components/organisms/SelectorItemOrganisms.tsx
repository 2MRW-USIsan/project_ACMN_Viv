"use client";

import { FlexLayoutAtom } from "@/components/atoms/FlexLayoutAtom";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { LabelAtom } from "../atoms/LabelAtom";
import { PanelListMolecule } from "../molecules/PanelListMolecule";
import type { ComponentProps } from "react";

type PanelListProps = ComponentProps<typeof PanelListMolecule>["props"];
type LabelProps = ComponentProps<typeof LabelAtom>["props"];
type TextFieldProps = ComponentProps<typeof TextFieldAtom>["props"];

interface SelectorItemOrganismsProps {
  props: {
    panelListProps: PanelListProps;
    listItems: {
      id: string;
      labelProps: LabelProps;
      labelFieldProps: TextFieldProps;
      promptFieldProps: TextFieldProps;
    }[];
  };
}

export function SelectorItemOrganisms({ props }: SelectorItemOrganismsProps) {
  return (
    <PanelListMolecule props={props.panelListProps}>
      {props.listItems.map((listItem) => {
        return (
          <FlexLayoutAtom key={listItem.id}>
            <LabelAtom props={listItem.labelProps} />
            <TextFieldAtom props={listItem.labelFieldProps} />
            <TextFieldAtom props={listItem.promptFieldProps} />
          </FlexLayoutAtom>
        );
      })}
    </PanelListMolecule>
  );
}
