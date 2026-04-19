import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { CollapseContainer } from "@/components/atoms/layout/CollapseContainer";
import { ConfigPanelForm } from "@/components/molecules/ConfigPanelForm";
import { PanelType } from "@/types/components/configurations/select.group.types";
import { Section as GroupSection } from "./Group.Section";

interface PanelProps {
  props: PanelType;
}
export function Panel({ props }: PanelProps) {
  return (
    <AlignLayout column={0.1}>
      <ConfigPanelForm props={props.panel} />
      <CollapseContainer props={props.panel.isExpanded}>
        <GroupSection props={props.section} />
      </CollapseContainer>
    </AlignLayout>
  );
}
