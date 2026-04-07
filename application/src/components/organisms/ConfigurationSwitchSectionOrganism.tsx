"use client";

import { CollapseAtom } from "@/components/atoms/CollapseAtom";
import { DividerAtom } from "@/components/atoms/DividerAtom";
import { GridLayoutAtom } from "@/components/atoms/GridLayoutAtom";
import { IconButtonAtom } from "@/components/atoms/IconButtonAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { ListFrameAtom } from "@/components/atoms/ListFrameAtom";
import { ListRowAtom } from "@/components/atoms/ListRowAtom";
import { PanelContentAtom } from "@/components/atoms/PanelContentAtom";
import { PanelFrameAtom } from "@/components/atoms/PanelFrameAtom";
import { StackAtom } from "@/components/atoms/StackAtom";
import { SwitchItemSectionOrganism } from "@/components/organisms/SwitchItemSectionOrganism";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { ConfigBodySection } from "@/hooks/configurations/viewModel/useConfigurationsComposer";

interface ConfigurationSwitchSectionOrganismProps {
  props: ConfigBodySection;
}

export function ConfigurationSwitchSectionOrganism({
  props,
}: ConfigurationSwitchSectionOrganismProps) {
  return (
    <GridLayoutAtom props={{ mt: 2 }}>
      <LabelAtom props={props.titleLabel} />
      <DividerAtom />

      <PanelFrameAtom props={{ mt: 1 }}>
        <ListFrameAtom>
          {props.switchGrpPanels?.map((grp, index) => (
            <GridLayoutAtom key={grp.key}>
              {index > 0 && <DividerAtom />}

              {/* Switch Grp panel header */}
              <ListRowAtom props={{ variant: "item" }}>
                <LabelAtom props={grp.panelLabel} />
                <LabelAtom props={grp.keyLabel} />
                <GridLayoutAtom props={{ width: 160 }}>
                  <TextFieldAtom props={grp.keyField} />
                </GridLayoutAtom>

                <LabelAtom props={grp.labelLabel} />
                <GridLayoutAtom props={{ flex: 1, minWidth: 160 }}>
                  <TextFieldAtom props={grp.labelField} />
                </GridLayoutAtom>

                <IconButtonAtom props={grp.removeButton} />
                <IconButtonAtom props={grp.toggleButton} />
              </ListRowAtom>

              {/* Expanded content: Switch Items section */}
              <CollapseAtom props={{ isOpen: grp.isExpanded }}>
                <PanelContentAtom>
                  <LabelAtom props={grp.switchItemsLabel} />
                  <SwitchItemSectionOrganism props={grp.switchItemSection} />
                </PanelContentAtom>
              </CollapseAtom>
            </GridLayoutAtom>
          ))}

          {/* Add Switch Grp row */}
          {props.addSwitchGrpRowLabel && props.addSwitchGrpButton && (
            <>
              <DividerAtom />
              <ListRowAtom props={{ variant: "footer" }}>
                <StackAtom props={{ direction: "row", alignItems: "center", spacing: 0.5 }}>
                  <LabelAtom props={props.addSwitchGrpRowLabel} />
                  <IconButtonAtom props={props.addSwitchGrpButton} />
                </StackAtom>
              </ListRowAtom>
            </>
          )}
        </ListFrameAtom>
      </PanelFrameAtom>
    </GridLayoutAtom>
  );
}

