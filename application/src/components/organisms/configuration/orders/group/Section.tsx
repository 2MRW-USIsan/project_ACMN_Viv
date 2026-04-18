import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { PanelList } from "@/components/atoms/layout/PanelList";
import { AddPanelButton } from "@/components/molecules/AddPanelButton";
import { SectionLabel } from "@/components/molecules/SectionLabel";
import { ItemSectionProps } from "@/types/configurations/orders/types";
import { Panel as ItemPanel } from "../item/Panel";

export function Section({ props }: ItemSectionProps) {
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
