import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { CollapseContainer } from "@/components/atoms/layout/CollapseContainer";
import { ConfigPanelForm } from "@/components/molecules/ConfigPanelForm";
import { ItemPanelProps } from "@/types/configurations/orders";
import { ItemSection } from "./ItemSection";

export function ItemPanel({ props }: ItemPanelProps) {
  return (
    <AlignLayout column={0.1}>
      <ConfigPanelForm props={props.panel} />
      <CollapseContainer props={props.panel.isExpanded}>
        <ItemSection props={props.itemSection} />
      </CollapseContainer>
    </AlignLayout>
  );
}
