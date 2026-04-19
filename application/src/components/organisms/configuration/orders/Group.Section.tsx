import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { PanelList } from "@/components/atoms/layout/PanelList";
import { AddPanelButton } from "@/components/molecules/AddPanelButton";
import { SectionLabel } from "@/components/molecules/SectionLabel";
import { SectionType } from "@/types/components/configurations/orders.group.types";
import { Panel as ItemPanel } from "./Item.Panel";

interface SectionProps {
  props: SectionType;
}
export function Section({ props }: SectionProps) {
  return (
    <AlignLayout column={0.1} indent>
      <SectionLabel props={props.label} />
      <PanelList>
        {props.panels.map((panel) => (
          <ItemPanel key={panel.key} props={panel.props} />
        ))}
        <AddPanelButton props={props.add} />
      </PanelList>
    </AlignLayout>
  );
}
