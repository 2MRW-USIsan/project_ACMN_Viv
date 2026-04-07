"use client";

import { ChipCheckboxAtom } from "@/components/atoms/ChipCheckboxAtom";
import { CollapseAtom } from "@/components/atoms/CollapseAtom";
import { DividerAtom } from "@/components/atoms/DividerAtom";
import { GridLayoutAtom } from "@/components/atoms/GridLayoutAtom";
import { IconButtonAtom, IconButtonAtomProps } from "@/components/atoms/IconButtonAtom";
import { LabelAtom, LabelAtomProps } from "@/components/atoms/LabelAtom";
import { ListFrameAtom } from "@/components/atoms/ListFrameAtom";
import { ListRowAtom } from "@/components/atoms/ListRowAtom";
import { PanelContentAtom } from "@/components/atoms/PanelContentAtom";
import { PanelFrameAtom } from "@/components/atoms/PanelFrameAtom";
import { StackAtom } from "@/components/atoms/StackAtom";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { ToolbarSpacerAtom } from "@/components/atoms/ToolbarSpacerAtom";
import { ConfigBodyBlocPanel } from "@/hooks/configurations/viewModel/useConfigurationsComposer";
import { ConfigurationOrdersSectionOrganism } from "@/components/organisms/ConfigurationOrdersSectionOrganism";
import { ConfigurationSelectSectionOrganism } from "@/components/organisms/ConfigurationSelectSectionOrganism";
import { ConfigurationSwitchSectionOrganism } from "@/components/organisms/ConfigurationSwitchSectionOrganism";

interface ConfigurationBodyOrganismProps {
  props: {
    headerLabel: LabelAtomProps["props"];
    blocPanels: ConfigBodyBlocPanel[];
    addRowLabel: LabelAtomProps["props"];
    addButton: IconButtonAtomProps["props"];
  };
}

export function ConfigurationBodyOrganism({
  props,
}: ConfigurationBodyOrganismProps) {
  return (
    <GridLayoutAtom props={{ container: true }}>
      <ToolbarSpacerAtom />
      <StackAtom props={{ direction: "row", alignItems: "center", spacing: 1 }}>
        <LabelAtom props={props.headerLabel} />
      </StackAtom>
      <DividerAtom />

      <PanelFrameAtom>
        <ListFrameAtom>
          {props.blocPanels.map((bloc, index) => {
            return (
              <GridLayoutAtom key={bloc.key}>
                {index > 0 && <DividerAtom />}

                {/* Panel header */}
                <ListRowAtom props={{ variant: "item" }}>
                  <LabelAtom props={bloc.panelLabel} />
                  <LabelAtom props={bloc.keyLabel} />
                  <GridLayoutAtom props={{ width: 160 }}>
                    <TextFieldAtom props={bloc.keyField} />
                  </GridLayoutAtom>

                  <LabelAtom props={bloc.labelLabel} />
                  <GridLayoutAtom props={{ flex: 1, minWidth: 160 }}>
                    <TextFieldAtom props={bloc.labelField} />
                  </GridLayoutAtom>

                  <IconButtonAtom props={bloc.removeButton} />
                  <IconButtonAtom props={bloc.toggleButton} />
                </ListRowAtom>

                {/* Expanded panel content */}
                <CollapseAtom props={{ isOpen: bloc.isExpanded }}>
                  <PanelContentAtom>
                    {/* Bloc Select chips */}
                    <StackAtom props={{ direction: "row", alignItems: "center", spacing: 1, mb: 2 }}>
                      <LabelAtom props={bloc.blocSelectLabel} />
                      <StackAtom props={{ direction: "row", spacing: 1, flexWrap: "wrap" }}>
                        {bloc.blocTypeChips.map(({ key, ...chipProps }) => (
                          <ChipCheckboxAtom
                            key={key}
                            props={chipProps}
                          />
                        ))}
                      </StackAtom>
                    </StackAtom>

                    <DividerAtom />

                    {/* Sub-sections for each checked bloc type */}
                    {bloc.sections.map((section) => (
                      <GridLayoutAtom key={section.key}>
                        {section.type === "Orders" && (
                          <ConfigurationOrdersSectionOrganism props={section} />
                        )}
                        {section.type === "Switch" && (
                          <ConfigurationSwitchSectionOrganism props={section} />
                        )}
                        {section.type === "Select" && (
                          <ConfigurationSelectSectionOrganism props={section} />
                        )}
                      </GridLayoutAtom>
                    ))}
                  </PanelContentAtom>
                </CollapseAtom>
              </GridLayoutAtom>
            );
          })}

          {/* Add Bloc row */}
          <DividerAtom />
          <ListRowAtom props={{ variant: "footer" }}>
            <StackAtom props={{ direction: "row", alignItems: "center", spacing: 0.5 }}>
              <LabelAtom props={props.addRowLabel} />
              <IconButtonAtom props={props.addButton} />
            </StackAtom>
          </ListRowAtom>
        </ListFrameAtom>
      </PanelFrameAtom>
    </GridLayoutAtom>
  );
}
