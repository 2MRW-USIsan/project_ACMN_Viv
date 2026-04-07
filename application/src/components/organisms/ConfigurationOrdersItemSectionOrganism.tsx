"use client";

import { Box } from "@mui/material";
import { ChipCheckboxAtom } from "@/components/atoms/ChipCheckboxAtom";
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
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { ConfigurationComplexSectionOrganism } from "@/components/organisms/ConfigurationComplexSectionOrganism";
import { OrdersRandomSectionOrganism } from "@/components/organisms/OrdersRandomSectionOrganism";
import { ConfigurationOrdersItemColorsOrganism } from "@/components/organisms/ConfigurationOrdersItemColorsOrganism";
import { ConfigurationOrdersItemScriptsOrganism } from "@/components/organisms/ConfigurationOrdersItemScriptsOrganism";
import { OrdersItemSection } from "@/hooks/configurations/viewModel/useConfigurationsComposer";

const BLANK_LABEL = { text: "Blank", variant: "body1" as const, fontWeight: "bold" as const };

interface ConfigurationOrdersItemSectionOrganismProps {
  props: OrdersItemSection;
}

export function ConfigurationOrdersItemSectionOrganism({
  props,
}: ConfigurationOrdersItemSectionOrganismProps) {
  return (
    <PanelFrameAtom props={{ mt: 1 }}>
      <ListFrameAtom>
        {props.ordersItemPanels.map((item, index) => (
          <GridLayoutAtom key={item.key}>
            {index > 0 && <DividerAtom />}

            {/* Item panel header */}
            <ListRowAtom props={{ variant: "item" }}>
              <LabelAtom props={item.panelLabel} />
              <LabelAtom props={item.keyLabel} />
              <GridLayoutAtom props={{ width: 160 }}>
                <TextFieldAtom props={item.keyField} />
              </GridLayoutAtom>

              <LabelAtom props={item.labelLabel} />
              <GridLayoutAtom props={{ flex: 1, minWidth: 160 }}>
                <TextFieldAtom props={item.labelField} />
              </GridLayoutAtom>

              <IconButtonAtom props={item.removeButton} />
              <IconButtonAtom props={item.toggleButton} />
            </ListRowAtom>

            {/* Expanded content: Orders Type chips + selected type label + section */}
            <CollapseAtom props={{ isOpen: item.isExpanded }}>
              <PanelContentAtom>
                <StackAtom props={{ direction: "row", alignItems: "center", spacing: 1, flexWrap: "wrap" }}>
                  <LabelAtom props={item.ordersTypeLabel} />
                  {item.ordersTypeChips.map((chip) => (
                    <ChipCheckboxAtom key={chip.key} props={chip} />
                  ))}
                </StackAtom>

                {(item.randomSection || item.complexSection || item.scriptsSection || item.colorsSection || item.selectedTypeLabel) && (
                  <GridLayoutAtom props={{ mt: 1 }}>
                    {item.randomSection ? (
                      <OrdersRandomSectionOrganism props={item.randomSection} />
                    ) : item.complexSection ? (
                      <ConfigurationComplexSectionOrganism props={item.complexSection} />
                    ) : item.scriptsSection ? (
                      <ConfigurationOrdersItemScriptsOrganism props={item.scriptsSection} />
                    ) : item.colorsSection ? (
                      <ConfigurationOrdersItemColorsOrganism props={item.colorsSection} />
                    ) : (
                      item.selectedTypeLabel && (
                        <>
                          <LabelAtom props={item.selectedTypeLabel} />
                          <Box
                            sx={{
                              bgcolor: "grey.200",
                              borderRadius: 1,
                              p: 4,
                              mt: 1,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <LabelAtom props={BLANK_LABEL} />
                          </Box>
                        </>
                      )
                    )}
                  </GridLayoutAtom>
                )}
              </PanelContentAtom>
            </CollapseAtom>
          </GridLayoutAtom>
        ))}

        {/* Add Orders Item row */}
        <DividerAtom />
        <ListRowAtom props={{ variant: "footer" }}>
          <StackAtom props={{ direction: "row", alignItems: "center", spacing: 0.5 }}>
            <LabelAtom props={props.addItemRowLabel} />
            <IconButtonAtom props={props.addItemButton} />
          </StackAtom>
        </ListRowAtom>
      </ListFrameAtom>
    </PanelFrameAtom>
  );
}
