import { AddPanelButtonType } from "@/components/molecules/AddPanelButton";
import { LabelAtomType } from "../ui";
import { GroupListType } from "./orders";

export type SectionType = {
  add: AddPanelButtonType;
  panels: GroupListType;
  label: LabelAtomType;
};