import { LabelAtomType } from "../ui";

export type SectionType = {
  label: LabelAtomType;
  message: LabelAtomType;
};

export interface SectionProps {
  props: SectionType;
}
