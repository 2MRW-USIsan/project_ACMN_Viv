import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { PanelList } from "@/components/atoms/layout/PanelList";
import { AddPanelButton } from "@/components/molecules/AddPanelButton";
import { SectionLabel } from "@/components/molecules/SectionLabel";
import { SectionProps } from "@/types/configurations/orders";
import { GroupPanel } from "./GroupPanel";

export function Section({ props }: SectionProps) {
  return (
    <AlignLayout column={0.1}>
      <SectionLabel props={props.label} style={"HEADER"} />
      <PanelList>
        {props.panels.map((panel) => (
          <GroupPanel key={panel.key} props={panel.props} />
        ))}
        <AddPanelButton props={props.add} />
      </PanelList>
    </AlignLayout>
  );
}
