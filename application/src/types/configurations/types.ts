import { LabelAtomProps } from "@/components/atoms/display/LabelAtom";
import { IconButtonAtomProps } from "@/components/atoms/inputs/IconButtonAtom";
import { AddPanelButtonType } from "@/components/molecules/AddPanelButton";
import { BlocPanelItemType } from "@/components/organisms/configuration/PanelItem";

export interface BodyType {
  add: AddPanelButtonType;
  headerLabel: LabelAtomProps["props"];
  blocPanels: BlocPanelItemType[];
  addRowLabel: LabelAtomProps["props"];
  addButton: IconButtonAtomProps["props"];
}

export interface BodyProps {
  props: BodyType;
}
