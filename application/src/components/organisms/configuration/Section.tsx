import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { InformProps } from "@/types/configurations/blocs";
// import { Section as SelectSection } from "../select/Section";
// import { Section as SwitchSection } from "../switch/Section";
import { Section as OrdersSection } from "./orders/Section";
import { SectionSelector } from "./SectionSelector";

export function Section({ props }: InformProps) {
  return (
    <AlignLayout column={0.1}>
      <SectionSelector props={props.sectionSelector} />
      {props.ordersSection && <OrdersSection props={props.ordersSection} />}
      {/* {props.switchSection && <SwitchSection props={props.switchSection} />}
      {props.selectSection && <SelectSection props={props.selectSection} />} */}
    </AlignLayout>
  );
}
