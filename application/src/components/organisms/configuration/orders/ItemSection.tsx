import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { PanelList } from "@/components/atoms/layout/PanelList";
import { AddPanelButton, AddPanelButtonType } from "@/components/molecules/AddPanelButton";
import { SectionLabel } from "@/components/molecules/SectionLabel";
import { GroupListType, ItemSectionProps } from "@/types/configurations/orders";
import { LabelAtomType } from "@/types/ui";
import { GroupPanel } from "./GroupPanel";
import { SectionSelector } from "./SectionSelector";

export function ItemSection({ props }: ItemSectionProps) {
  return (
    <AlignLayout column={0.1}>
      <SectionSelector props={props.sectionSelector} />
      {props.randomSection && <SubSection props={props.randomSection} />}
      {props.complexSection && <SubSection props={props.complexSection} />}
      {props.colorsSection && <SubSection props={props.colorsSection} />}
      {props.scriptsSection && <SubSection props={props.scriptsSection} />}
    </AlignLayout>
  );
}

type SubSectionType = {
  add: AddPanelButtonType;
  panels: GroupListType;
  label: LabelAtomType;
};

function SubSection({ props }: { props: SubSectionType }) {
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
