import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { CollapseContainer } from "@/components/atoms/layout/CollapseContainer";
import { ConfigPanelForm } from "@/components/molecules/ConfigPanelForm";
import { SectionPanelProps } from "@/types/configurations/types";
import { Section as BlocSection } from "./Section";

export function Panel({ props }: SectionPanelProps) {
  return (
    <AlignLayout column={0.1}>
      <ConfigPanelForm props={props.panel} />
      <CollapseContainer props={props.panel.isExpanded}>
        <BlocSection props={props.bloc} />
      </CollapseContainer>
    </AlignLayout>
  );
}
