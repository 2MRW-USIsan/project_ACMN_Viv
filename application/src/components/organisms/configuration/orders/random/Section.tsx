import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { PanelList } from "@/components/atoms/layout/PanelList";
import {
  AddPanelButton,
  AddPanelButtonType,
} from "@/components/molecules/AddPanelButton";
import { SectionLabel } from "@/components/molecules/SectionLabel";
import { LabelAtomType } from "@/types/ui";
import { RandomItemForm } from "../../../../molecules/RandomItemForm";

type SectionType = {
  label: LabelAtomType;
  panels: any[];
  add: AddPanelButtonType;
};
interface SectionProps {
  props: SectionType;
}
export function Section({ props }: SectionProps) {
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

