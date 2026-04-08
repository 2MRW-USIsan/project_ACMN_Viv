"use client";

import { IconButtonAtom } from "@/components/atoms/IconButtonAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { SwitchAtom } from "@/components/atoms/SwitchAtom";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { SelectItemSection } from "@/hooks/configurations/viewModel/useConfigurationsComposer";
import { Box, Collapse, Divider, List, ListItem, Stack } from "@mui/material";

interface SelectItemSectionOrganismProps {
  props: SelectItemSection;
}

export function SelectItemSectionOrganism({
  props,
}: SelectItemSectionOrganismProps) {
  return (
    <Box>
      {/* Shuffle row */}
      <ListItem
        disablePadding
        sx={{ px: 0, py: 1, display: "flex", alignItems: "center", gap: 1 }}
      >
        <LabelAtom props={props.shuffleLabel} />
        <SwitchAtom props={props.shuffleSwitch} />
      </ListItem>

      <Divider />

      {/* Selectors label */}
      <Box sx={{ py: 1 }}>
        <LabelAtom props={props.selectorsLabel} />
      </Box>

      {/* Selector panels */}
      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <List disablePadding>
          {props.selectorPanels.map((selector, index) => (
            <Box key={selector.key}>
              {index > 0 && <Divider />}

              {/* Selector header row */}
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
                <LabelAtom props={selector.panelLabel} />
                <LabelAtom props={selector.keyLabel} />
                <Box sx={{ width: 160 }}>
                  <TextFieldAtom props={selector.keyField} />
                </Box>

                <LabelAtom props={selector.labelLabel} />
                <Box sx={{ flex: 1, minWidth: 160 }}>
                  <TextFieldAtom props={selector.labelField} />
                </Box>

                <IconButtonAtom props={selector.removeButton} />
                <IconButtonAtom props={selector.toggleButton} />
              </ListItem>

              {/* Expanded content: List Items */}
              <Collapse in={selector.isExpanded} timeout="auto" unmountOnExit>
                <Box
                  sx={{
                    borderTop: "1px solid",
                    borderColor: "divider",
                    px: 3,
                    py: 2,
                  }}
                >
                  <LabelAtom props={selector.listItemsLabel} />

                  {selector.listItemPanels.map((item) => (
                    <ListItem
                      key={item.key}
                      disablePadding
                      sx={{
                        px: 0,
                        py: 0.5,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      <LabelAtom props={item.valueLabel} />
                      <Box sx={{ width: 160 }}>
                        <TextFieldAtom props={item.valueField} />
                      </Box>

                      <LabelAtom props={item.promptLabel} />
                      <Box sx={{ flex: 1, minWidth: 160 }}>
                        <TextFieldAtom props={item.promptField} />
                      </Box>

                      <IconButtonAtom props={item.removeButton} />
                    </ListItem>
                  ))}

                  {/* Add list item row */}
                  <Divider sx={{ mt: 1 }} />
                  <Box
                    sx={{
                      pt: 1,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <LabelAtom props={selector.addListItemRowLabel} />
                      <IconButtonAtom props={selector.addListItemButton} />
                    </Stack>
                  </Box>
                </Box>
              </Collapse>
            </Box>
          ))}

          {/* Add Selector row */}
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
              <LabelAtom props={props.addSelectorRowLabel} />
              <IconButtonAtom props={props.addSelectorButton} />
            </Stack>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
