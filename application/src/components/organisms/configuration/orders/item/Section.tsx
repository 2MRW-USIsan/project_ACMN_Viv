import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { ItemSectionProps } from "@/types/configurations/orders/types";
import { Section as ColorsSection } from "../colors/Section";
import { Section as ComplexSection } from "../complex/Section";
import { Section as RandomSection } from "../random/Section";
import { Section as ScriptsSection } from "../scripts/Section";
import { Selector } from "./Selector";

export function Section({ props }: ItemSectionProps) {
  return (
    <AlignLayout column={0.1} indent>
      <Selector props={props.sectionSelector} />
      {props.randomSection && <RandomSection props={props.randomSection} />}
      {props.complexSection && <ComplexSection props={props.complexSection} />}
      {props.colorsSection && <ColorsSection props={props.colorsSection} />}
      {props.scriptsSection && <ScriptsSection props={props.scriptsSection} />}
    </AlignLayout>
  );
}
