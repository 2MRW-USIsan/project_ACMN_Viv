import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { CollapseContainer } from "@/components/atoms/layout/CollapseContainer";
import { ConfigPanelForm } from "@/components/molecules/ConfigPanelForm";
import { PanelProps } from "@/types/configurations/orders/complex";
import { Section as GroupSection } from "./Section";

export function Panel({ props }: PanelProps) {
  return (
    <AlignLayout column={0.1}>
      <ConfigPanelForm props={props.panel} />
      <CollapseContainer props={props.panel.isExpanded}>
        <GroupSection props={props.itemSection} />
      </CollapseContainer>
    </AlignLayout>
  );
}
