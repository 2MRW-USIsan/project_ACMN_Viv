import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { PanelList } from "@/components/atoms/layout/PanelList";
import { AddPanelButton } from "@/components/molecules/AddPanelButton";
import { SectionLabel } from "@/components/molecules/SectionLabel";
import { SubSectionType } from "@/types/components/configurations/orders.complex.types";
import { RandomItemForm } from "../../../molecules/RandomItemForm";

interface SubSectionProps {
  props: SubSectionType;
}
export function SubSection({ props }: SubSectionProps) {
  return (
    <AlignLayout column={0.1} indent>
      <SectionLabel props={props.label} style={"HEADER"} />
      <PanelList>
        {props.panels.map((panel) => (
          <RandomItemForm props={panel.props} key={panel.key} />
        ))}
        <AddPanelButton props={props.add} />
      </PanelList>
    </AlignLayout>
  );
}
