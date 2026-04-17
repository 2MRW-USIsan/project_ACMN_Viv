import { LabelAtom } from "@/components/atoms/display/LabelAtom";
import { IconButtonAtom } from "@/components/atoms/inputs/IconButtonAtom";
import { TextFieldAtom } from "@/components/atoms/inputs/TextFieldAtom";
import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { CollapseContainer } from "@/components/atoms/layout/CollapseContainer";
import { GridLayout } from "@/components/atoms/layout/GridLayout";
import { PanelItem } from "@/components/atoms/layout/PanelItem";
import { PanelList } from "@/components/atoms/layout/PanelList";
import { SectionLabel } from "@/components/molecules/SectionLabel";
import type { ConfigurationSelectSectionOrganismProps } from "@/types/configuration";
import { SelectItemSectionOrganism } from "./SelectItemSectionOrganism";

export function ConfigurationSelectSectionOrganism({
  props,
}: ConfigurationSelectSectionOrganismProps) {
  return (
    <AlignLayout column={0.1}>
      <SectionLabel props={props.titleLabel} />
      <PanelList>
        {props.selectGrpPanels?.map((grp) => (
          <AlignLayout column={0.1} key={grp.key}>
            <PanelItem>
              <GridLayout style={{ size: "CONTAINER" }}>
                <GridLayout style={{ size: 2 }}>
                  <LabelAtom props={grp.panelLabel} style={"LABEL"} />
                </GridLayout>
                <GridLayout style={{ size: 1 }}>
                  <LabelAtom props={grp.keyLabel} />
                </GridLayout>
                <GridLayout style={{ size: 2 }}>
                  <TextFieldAtom props={grp.keyField} />
                </GridLayout>
                <GridLayout style={{ size: 1 }}>
                  <LabelAtom props={grp.labelLabel} />
                </GridLayout>
                <GridLayout style={{ size: 4 }}>
                  <TextFieldAtom props={grp.labelField} />
                </GridLayout>
                <GridLayout style={{ size: 2 }}>
                  <AlignLayout style={"END"}>
                    <IconButtonAtom props={grp.removeButton} />
                    <IconButtonAtom props={grp.toggleButton} />
                  </AlignLayout>
                </GridLayout>
              </GridLayout>
            </PanelItem>
            <CollapseContainer props={grp.isExpanded}>
              <AlignLayout column={0.1}>
                <SectionLabel props={grp.selectItemsLabel} />
                <SelectItemSectionOrganism props={grp.selectItemSection} />
              </AlignLayout>
            </CollapseContainer>
          </AlignLayout>
        ))}
        {props.addSelectGrpRowLabel && props.addSelectGrpButton && (
          <PanelItem>
            <AlignLayout style={"CENTER"}>
              <LabelAtom props={props.addSelectGrpRowLabel} style={"LABEL"} primary />
              <IconButtonAtom props={props.addSelectGrpButton} />
            </AlignLayout>
          </PanelItem>
        )}
      </PanelList>
    </AlignLayout>
  );
}
