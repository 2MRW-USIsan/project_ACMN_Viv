import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { CollapseContainer } from "@/components/atoms/layout/CollapseContainer";
import { ConfigPanelForm } from "@/components/molecules/ConfigPanelForm";
import { BodyProps } from "@/types/configurations/types";
import { BodyFrame } from "../../atoms/layout/BodyFrame";
import { PanelList } from "../../atoms/layout/PanelList";
import { AddPanelButton } from "../../molecules/AddPanelButton";
import { SectionLabel } from "../../molecules/SectionLabel";
import { Section as BlocSection } from "./Section";

export function Body({ props }: BodyProps) {
  return (
    <BodyFrame>
      <SectionLabel props={props.headerLabel} />
      <PanelList>
        {props.blocPanels.map((bloc) => (
          <AlignLayout column={0.1} key={bloc.key}>
            <ConfigPanelForm props={bloc.panel} />
            <CollapseContainer props={bloc.panel.isExpanded}>
              <BlocSection props={bloc.bloc} />
            </CollapseContainer>
          </AlignLayout>
        ))}
        <AddPanelButton props={props.add} />
      </PanelList>
    </BodyFrame>
  );
}
