import { ChipRadioType, ConfigPanelFormType, LabelType } from "../ui";
import { SectionType as ColorsSectionType } from "./orders.colors.types";
import { SectionType as ComplexSectionType } from "./orders.complex.types";
import { SectionType as RandomSectionType } from "./orders.random.types";
import { SectionType as ScriptsSectionType } from "./orders.scripts.types";

export interface PanelType {
  section: SectionType;
  panel: ConfigPanelFormType;
}
export interface SectionType {
  selector: SelectorType;
  randomSection: RandomSectionType | undefined;
  complexSection: ComplexSectionType | undefined;
  colorsSection: ColorsSectionType | undefined;
  scriptsSection: ScriptsSectionType | undefined;
}
export interface SelectorType {
  label: LabelType;
  sections: { props: ChipRadioType; key: string }[];
}
