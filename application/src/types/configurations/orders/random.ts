import { IconButtonType } from "@/components/atoms/display/DeletionMark";
import { AddPanelButtonType } from "@/components/molecules/AddPanelButton";
import { LabelAtomType, TextFieldAtomType } from "../../ui";

export type RandomItemFormType = {
  field: {
    value: TextFieldAtomType;
    prompt: TextFieldAtomType;
    weight: TextFieldAtomType;
  };
  remove: IconButtonType;
  label: {
    item: LabelAtomType;
    value: LabelAtomType;
    prompt: LabelAtomType;
    weight: LabelAtomType;
  };
};

export type RandomPanelListType = {
  key: string;
  props: RandomItemFormType;
}[];

export type SectionType = {
  add: AddPanelButtonType;
  panels: RandomPanelListType;
  label: LabelAtomType;
};

export interface SectionProps {
  props: SectionType;
}
