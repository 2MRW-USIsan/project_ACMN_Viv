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
import { SwitchAtom } from "@/components/atoms/SwitchAtom";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { SelectItemSection } from "@/hooks/configurations/viewModel/useConfigurationsComposer";

interface SelectItemSectionOrganismProps {
  props: SelectItemSection;
}

export function SelectItemSectionOrganism({
  props,
}: SelectItemSectionOrganismProps) {
  return (
    <GridLayoutAtom>
      {/* Shuffle row */}
      <ListRowAtom props={{ variant: "plain" }}>
        <LabelAtom props={props.shuffleLabel} />
        <SwitchAtom props={props.shuffleSwitch} />
      </ListRowAtom>

      <DividerAtom />

      {/* Selectors label */}
      <GridLayoutAtom props={{ py: 1 }}>
        <LabelAtom props={props.selectorsLabel} />
      </GridLayoutAtom>

      {/* Selector panels */}
      <PanelFrameAtom>
        <ListFrameAtom>
          {props.selectorPanels.map((selector, index) => (
            <GridLayoutAtom key={selector.key}>
              {index > 0 && <DividerAtom />}

              {/* Selector header row */}
              <ListRowAtom>
                <LabelAtom props={selector.panelLabel} />
                <LabelAtom props={selector.keyLabel} />
                <GridLayoutAtom props={{ width: 160 }}>
                  <TextFieldAtom props={selector.keyField} />
                </GridLayoutAtom>

                <LabelAtom props={selector.labelLabel} />
                <GridLayoutAtom props={{ flex: 1, minWidth: 160 }}>
                  <TextFieldAtom props={selector.labelField} />
                </GridLayoutAtom>

                <IconButtonAtom props={selector.removeButton} />
                <IconButtonAtom props={selector.toggleButton} />
              </ListRowAtom>

              {/* Expanded content: List Items */}
              <CollapseAtom props={{ isOpen: selector.isExpanded }}>
                <PanelContentAtom>
                  <LabelAtom props={selector.listItemsLabel} />

                  {selector.listItemPanels.map((item) => (
                    <ListRowAtom key={item.key} props={{ variant: "compact" }}>
                      <LabelAtom props={item.valueLabel} />
                      <GridLayoutAtom props={{ width: 160 }}>
                        <TextFieldAtom props={item.valueField} />
                      </GridLayoutAtom>

                      <LabelAtom props={item.promptLabel} />
                      <GridLayoutAtom props={{ flex: 1, minWidth: 160 }}>
                        <TextFieldAtom props={item.promptField} />
                      </GridLayoutAtom>

                      <IconButtonAtom props={item.removeButton} />
                    </ListRowAtom>
                  ))}

                  {/* Add list item row */}
                  <DividerAtom props={{ mt: 1 }} />
                  <StackAtom props={{ justifyContent: "center", pt: 1 }}>
                    <StackAtom props={{ direction: "row", alignItems: "center", spacing: 0.5 }}>
                      <LabelAtom props={selector.addListItemRowLabel} />
                      <IconButtonAtom props={selector.addListItemButton} />
                    </StackAtom>
                  </StackAtom>
                </PanelContentAtom>
              </CollapseAtom>
            </GridLayoutAtom>
          ))}

          {/* Add Selector row */}
          <DividerAtom />
          <ListRowAtom props={{ variant: "footer" }}>
            <StackAtom props={{ direction: "row", alignItems: "center", spacing: 0.5 }}>
              <LabelAtom props={props.addSelectorRowLabel} />
              <IconButtonAtom props={props.addSelectorButton} />
            </StackAtom>
          </ListRowAtom>
        </ListFrameAtom>
      </PanelFrameAtom>
    </GridLayoutAtom>
  );
}

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
                <GridLayoutAtom props={{ width: 160 }}>
                  <TextFieldAtom props={selector.keyField} />
                </GridLayoutAtom>

                <LabelAtom props={selector.labelLabel} />
                <GridLayoutAtom props={{ flex: 1, minWidth: 160 }}>
                  <TextFieldAtom props={selector.labelField} />
                </GridLayoutAtom>

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
                      <GridLayoutAtom props={{ width: 160 }}>
                        <TextFieldAtom props={item.valueField} />
                      </GridLayoutAtom>

                      <LabelAtom props={item.promptLabel} />
                      <GridLayoutAtom props={{ flex: 1, minWidth: 160 }}>
                        <TextFieldAtom props={item.promptField} />
                      </GridLayoutAtom>

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
