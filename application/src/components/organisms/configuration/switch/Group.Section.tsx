import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { PanelList } from "@/components/atoms/layout/PanelList";
import { AddPanelButton } from "@/components/molecules/AddPanelButton";
import { SwitchItemForm } from "@/components/molecules/SwitchItemForm";
import { Selector } from "./Group.Selector";
import { SectionType } from "@/types/components/configurations/switch.group.types";

interface SectionProps {
  props: SectionType;
}
export function Section({ props }: SectionProps) {
  return (
    <AlignLayout column={0.1} indent>
      <Selector props={props.selector} />
      <PanelList>
        {props.panels.map((panel) => (
          <SwitchItemForm props={panel.props} key={panel.key} />
        ))}
        <AddPanelButton props={props.add} />
      </PanelList>
    </AlignLayout>
  );
}
