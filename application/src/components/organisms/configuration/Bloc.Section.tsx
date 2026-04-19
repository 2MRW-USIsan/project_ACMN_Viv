import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { SectionType } from "@/types/components/configurations/types";
import { Section as OrdersSection } from "./orders/Section";
import { Section as SelectSection } from "./select/Section";
import { Section as SwitchSection } from "./switch/Section";
import { Selector } from "./Bloc.Selector";

interface SectionProps {
  props: SectionType;
}
export function Section({ props }: SectionProps) {
  return (
    <AlignLayout column={0.5} indent>
      <Selector props={props.selector} />
      {props.ordersSection && <OrdersSection props={props.ordersSection} />}
      {props.switchSection && <SwitchSection props={props.switchSection} />}
      {props.selectSection && <SelectSection props={props.selectSection} />}
    </AlignLayout>
  );
}
