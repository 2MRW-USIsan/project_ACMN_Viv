import { DividerAtom } from "@/components/atoms/display/DividerAtom";
import { LabelAtom } from "@/components/atoms/display/LabelAtom";
import { IconButtonAtom } from "@/components/atoms/inputs/IconButtonAtom";
import { SwitchAtom } from "@/components/atoms/inputs/SwitchAtom";
import { TextFieldAtom } from "@/components/atoms/inputs/TextFieldAtom";
import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { CollapseContainer } from "@/components/atoms/layout/CollapseContainer";
import { GridLayout } from "@/components/atoms/layout/GridLayout";
import { PanelItem } from "@/components/atoms/layout/PanelItem";
import { PanelList } from "@/components/atoms/layout/PanelList";
import { SectionLabel } from "@/components/molecules/SectionLabel";
import type { SelectItemSectionOrganismProps } from "@/types/configuration";

export function SelectItemSectionOrganism({
  props,
}: SelectItemSectionOrganismProps) {
  return (
    <AlignLayout column={0.1}>
      <AlignLayout>
        <LabelAtom props={props.shuffleLabel} />
        <SwitchAtom props={props.shuffleSwitch} />
      </AlignLayout>
      <DividerAtom />
      <SectionLabel props={props.selectorsLabel} />
      <PanelList>
        {props.selectorPanels.map((selector) => (
          <AlignLayout column={0.1} key={selector.key}>
            <PanelItem>
              <GridLayout style={{ size: "CONTAINER" }}>
                <GridLayout style={{ size: 2 }}>
                  <LabelAtom props={selector.panelLabel} style={"LABEL"} />
                </GridLayout>
                <GridLayout style={{ size: 1 }}>
                  <LabelAtom props={selector.keyLabel} />
                </GridLayout>
                <GridLayout style={{ size: 2 }}>
                  <TextFieldAtom props={selector.keyField} />
                </GridLayout>
                <GridLayout style={{ size: 1 }}>
                  <LabelAtom props={selector.labelLabel} />
                </GridLayout>
                <GridLayout style={{ size: 4 }}>
                  <TextFieldAtom props={selector.labelField} />
                </GridLayout>
                <GridLayout style={{ size: 2 }}>
                  <AlignLayout style={"END"}>
                    <IconButtonAtom props={selector.removeButton} />
                    <IconButtonAtom props={selector.toggleButton} />
                  </AlignLayout>
                </GridLayout>
              </GridLayout>
            </PanelItem>
            <CollapseContainer props={selector.isExpanded}>
              <AlignLayout column={0.1}>
                <SectionLabel props={selector.listItemsLabel} />
                <PanelList>
                  {selector.listItemPanels.map((item) => (
                    <PanelItem key={item.key}>
                      <GridLayout style={{ size: "CONTAINER" }}>
                        <GridLayout style={{ size: 1 }}>
                          <LabelAtom props={item.valueLabel} />
                        </GridLayout>
                        <GridLayout style={{ size: 3 }}>
                          <TextFieldAtom props={item.valueField} />
                        </GridLayout>
                        <GridLayout style={{ size: 1 }}>
                          <LabelAtom props={item.promptLabel} />
                        </GridLayout>
                        <GridLayout style={{ size: 6 }}>
                          <TextFieldAtom props={item.promptField} />
                        </GridLayout>
                        <GridLayout style={{ size: 1 }}>
                          <IconButtonAtom props={item.removeButton} />
                        </GridLayout>
                      </GridLayout>
                    </PanelItem>
                  ))}
                  <PanelItem>
                    <AlignLayout style={"CENTER"}>
                      <LabelAtom props={selector.addListItemRowLabel} style={"LABEL"} primary />
                      <IconButtonAtom props={selector.addListItemButton} />
                    </AlignLayout>
                  </PanelItem>
                </PanelList>
              </AlignLayout>
            </CollapseContainer>
          </AlignLayout>
        ))}
        <PanelItem>
          <AlignLayout style={"CENTER"}>
            <LabelAtom props={props.addSelectorRowLabel} style={"LABEL"} primary />
            <IconButtonAtom props={props.addSelectorButton} />
          </AlignLayout>
        </PanelItem>
      </PanelList>
    </AlignLayout>
  );
}
