"use client";

import { ChipCheckboxAtom } from "@/components/atoms/ChipCheckboxAtom";
import { IconButtonAtom } from "@/components/atoms/IconButtonAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { ConfigurationComplexSectionOrganism } from "../ConfigurationComplexSectionOrganism";
import { OrdersRandomSectionOrganism } from "./OrdersRandomSectionOrganism";
import { ConfigurationOrdersItemColorsOrganism } from "./ConfigurationOrdersItemColorsOrganism";
import { ConfigurationOrdersItemScriptsOrganism } from "./ConfigurationOrdersItemScriptsOrganism";
import { OrdersItemSection } from "@/hooks/configurations/viewModel/useConfigurationsComposer";
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  Stack,
} from "@mui/material";

const BLANK_LABEL = { text: "Blank", variant: "body1" as const, fontWeight: "bold" as const };

interface ConfigurationOrdersItemSectionOrganismProps {
  props: OrdersItemSection;
}

export function ConfigurationOrdersItemSectionOrganism({
  props,
}: ConfigurationOrdersItemSectionOrganismProps) {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        overflow: "hidden",
        mt: 1,
      }}
    >
      <List disablePadding>
        {props.ordersItemPanels.map((item, index) => (
          <Box key={item.key}>
            {index > 0 && <Divider />}

            {/* Item panel header */}
            <ListItem
              disablePadding
              sx={{
                px: 2,
                py: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              <LabelAtom props={item.panelLabel} />
              <LabelAtom props={item.keyLabel} />
              <Box sx={{ width: 160 }}>
                <TextFieldAtom props={item.keyField} />
              </Box>

              <LabelAtom props={item.labelLabel} />
              <Box sx={{ flex: 1, minWidth: 160 }}>
                <TextFieldAtom props={item.labelField} />
              </Box>

              <IconButtonAtom props={item.removeButton} />
              <IconButtonAtom props={item.toggleButton} />
            </ListItem>

            {/* Expanded content: Orders Type chips + selected type label + section */}
            <Collapse in={item.isExpanded} timeout="auto" unmountOnExit>
              <Box
                sx={{
                  borderTop: "1px solid",
                  borderColor: "divider",
                  px: 3,
                  py: 2,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
                  <LabelAtom props={item.ordersTypeLabel} />
                  {item.ordersTypeChips.map((chip) => (
                    <ChipCheckboxAtom key={chip.key} props={chip} />
                  ))}
                </Stack>

                {(item.randomSection || item.complexSection || item.scriptsSection || item.colorsSection || item.selectedTypeLabel) && (
                  <Box mt={1}>
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
                  </Box>
                )}
              </Box>
            </Collapse>
          </Box>
        ))}

        {/* Add Orders Item row */}
        <Divider />
        <ListItem
          disablePadding
          sx={{
            px: 2,
            py: 1.5,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <LabelAtom props={props.addItemRowLabel} />
            <IconButtonAtom props={props.addItemButton} />
          </Stack>
        </ListItem>
      </List>
    </Box>
  );
}
