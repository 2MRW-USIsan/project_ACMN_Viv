import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { PanelList } from "@/components/atoms/layout/PanelList";
import { AddPanelButton } from "@/components/molecules/AddPanelButton";
import { SectionLabel } from "@/components/molecules/SectionLabel";
import { SectionProps } from "@/types/configurations/select";
import { Panel as GroupPanel } from "./group/Panel";

export function Section({ props }: SectionProps) {
  return (
    <AlignLayout column={0.1} indent>
      <SectionLabel props={props.label} />
      <PanelList>
        {props.panels.map((panel) => (
          <GroupPanel props={panel.props} key={panel.key} />
        ))}
        <AddPanelButton props={props.add} />
      </PanelList>
    </AlignLayout>
  );
}
