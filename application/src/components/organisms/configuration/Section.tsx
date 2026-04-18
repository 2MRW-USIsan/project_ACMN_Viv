import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
// import { Section as SelectSection } from "../select/Section";
// import { Section as SwitchSection } from "../switch/Section";
import { SectionProps } from "@/types/configurations/types";
import { Section as OrdersSection } from "./orders/Section";
import { Selector } from "./Selector";

export function Section({ props }: SectionProps) {
  return (
    <AlignLayout column={0.5} indent>
      <Selector props={props.sectionSelector} />
      {props.ordersSection && <OrdersSection props={props.ordersSection} />}
      {/* {props.switchSection && <SwitchSection props={props.switchSection} />}
      {props.selectSection && <SelectSection props={props.selectSection} />} */}
    </AlignLayout>
  );
}
