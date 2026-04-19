import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { CollapseContainer } from "@/components/atoms/layout/CollapseContainer";
import { ConfigPanelForm } from "@/components/molecules/ConfigPanelForm";
import { SubSection } from "./Complex.SubSection";
import { PanelType } from "@/types/components/configurations/orders.complex.types";

interface PanelProps {
  props: PanelType;
}
export function Panel({ props }: PanelProps) {
  return (
    <AlignLayout column={0.1}>
      <ConfigPanelForm props={props.panel} />
      <CollapseContainer props={props.panel.isExpanded}>
        <SubSection props={props.section} />
      </CollapseContainer>
    </AlignLayout>
  );
}
