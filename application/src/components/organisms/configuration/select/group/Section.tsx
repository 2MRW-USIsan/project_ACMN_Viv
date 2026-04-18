import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { PanelList } from "@/components/atoms/layout/PanelList";
import { AddPanelButton } from "@/components/molecules/AddPanelButton";
import { SectionProps } from "@/types/configurations/select";
import { Panel as ListPanel } from "../list/Panel";
import { Selector } from "./Selector";

export function Section({ props }: SectionProps) {
  return (
    <AlignLayout column={0.1} indent>
      <Selector props={props.selector} />
      <PanelList>
        {props.panels.map((panel) => (
          <ListPanel props={panel.props} key={panel.key} /> // <GroupPanel props={panel.props} key={panel.key} />
        ))}
        <AddPanelButton props={props.add} />
      </PanelList>
    </AlignLayout>
  );
}
