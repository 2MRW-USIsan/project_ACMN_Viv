import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { SectionType } from "@/types/components/configurations/orders.item.types";
import { Section as ColorsSection } from "./Colors.Section";
import { Section as ComplexSection } from "./Complex.Section";
import { Section as RandomSection } from "./Random.Section";
import { Section as ScriptsSection } from "./Scripts.Section";
import { Selector } from "./Item.Selector";

interface SectionProps {
  props: SectionType;
}
export function Section({ props }: SectionProps) {
  return (
    <AlignLayout column={0.1} indent>
      <Selector props={props.selector} />
      {props.randomSection && <RandomSection props={props.randomSection} />}
      {props.complexSection && <ComplexSection props={props.complexSection} />}
      {props.colorsSection && <ColorsSection props={props.colorsSection} />}
      {props.scriptsSection && <ScriptsSection props={props.scriptsSection} />}
    </AlignLayout>
  );
}
