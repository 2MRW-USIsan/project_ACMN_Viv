import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { CollapseContainer } from "@/components/atoms/layout/CollapseContainer";
import { ConfigPanelForm } from "@/components/molecules/ConfigPanelForm";
import { PanelType } from "@/types/components/configurations/select.list.types";
import { Section as ListSection } from "./List.Section";

interface PanelProps {
  props: PanelType;
}
export function Panel({ props }: PanelProps) {
  return (
    <AlignLayout column={0.1}>
      <ConfigPanelForm props={props.panel} />
      <CollapseContainer props={props.panel.isExpanded}>
        <ListSection props={props.section} />
      </CollapseContainer>
    </AlignLayout>
  );
}
