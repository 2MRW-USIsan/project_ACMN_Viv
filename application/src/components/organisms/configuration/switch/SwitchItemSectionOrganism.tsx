import { DividerAtom } from "@/components/atoms/display/DividerAtom";
import { LabelAtom } from "@/components/atoms/display/LabelAtom";
import { IconButtonAtom } from "@/components/atoms/inputs/IconButtonAtom";
import { SwitchAtom } from "@/components/atoms/inputs/SwitchAtom";
import { TextFieldAtom } from "@/components/atoms/inputs/TextFieldAtom";
import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { GridLayout } from "@/components/atoms/layout/GridLayout";
import { PanelItem } from "@/components/atoms/layout/PanelItem";
import { PanelList } from "@/components/atoms/layout/PanelList";
import type { SwitchItemSectionOrganismProps } from "@/types/configuration";

export function SwitchItemSectionOrganism({
  props,
}: SwitchItemSectionOrganismProps) {
  return (
    <AlignLayout column={0.1}>
      <AlignLayout>
        <LabelAtom props={props.randomizeLabel} />
        <SwitchAtom props={props.randomizeSwitch} />
      </AlignLayout>
      <DividerAtom />
      <PanelList>
        {props.switchItemPanels.map((item) => (
          <PanelItem key={item.key}>
            <GridLayout style={{ size: "CONTAINER" }}>
              <GridLayout style={{ size: 1 }}>
                <LabelAtom props={item.labelLabel} />
              </GridLayout>
              <GridLayout style={{ size: 2 }}>
                <TextFieldAtom props={item.labelField} />
              </GridLayout>
              <GridLayout style={{ size: 1 }}>
                <LabelAtom props={item.valueLabel} />
              </GridLayout>
              <GridLayout style={{ size: 3 }}>
                <TextFieldAtom props={item.valueField} />
              </GridLayout>
              <GridLayout style={{ size: 1 }}>
                <LabelAtom props={item.altLabel} />
              </GridLayout>
              <GridLayout style={{ size: 3 }}>
                <TextFieldAtom props={item.altField} />
              </GridLayout>
              <GridLayout style={{ size: 1 }}>
                <IconButtonAtom props={item.removeButton} />
              </GridLayout>
            </GridLayout>
          </PanelItem>
        ))}
        <PanelItem>
          <AlignLayout style={"CENTER"}>
            <LabelAtom props={props.addSwitchRowLabel} style={"LABEL"} primary />
            <IconButtonAtom props={props.addSwitchButton} />
          </AlignLayout>
        </PanelItem>
      </PanelList>
    </AlignLayout>
  );
}
