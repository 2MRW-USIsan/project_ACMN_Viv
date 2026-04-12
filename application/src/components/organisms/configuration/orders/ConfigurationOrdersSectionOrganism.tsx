import { ConfigBodySection } from "@/hooks/configurations/viewModel/useConfigurationsComposer";
import { Box, Collapse, Divider, List, ListItem, Stack } from "@mui/material";
import { DividerAtom } from "../../../atoms/display/DividerAtom";
import { LabelAtom } from "../../../atoms/display/LabelAtom";
import { IconButtonAtom } from "../../../atoms/inputs/IconButtonAtom";
import { TextFieldAtom } from "../../../atoms/inputs/TextFieldAtom";
import { ConfigurationOrdersItemSectionOrganism } from "./ConfigurationOrdersItemSectionOrganism";

interface ConfigurationOrdersSectionOrganismProps {
  props: ConfigBodySection;
}

export function ConfigurationOrdersSectionOrganism({
  props,
}: ConfigurationOrdersSectionOrganismProps) {
  return (
    <Box mt={2}>
      <LabelAtom props={props.titleLabel} />
      <DividerAtom />

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
          {props.ordersGrpPanels?.map((grp, index) => (
            <Box key={grp.key}>
              {index > 0 && <Divider />}

              {/* Orders Grp panel header */}
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
                <LabelAtom props={grp.panelLabel} />
                <LabelAtom props={grp.keyLabel} />
                <Box sx={{ width: 160 }}>
                  <TextFieldAtom props={grp.keyField} />
                </Box>

                <LabelAtom props={grp.labelLabel} />
                <Box sx={{ flex: 1, minWidth: 160 }}>
                  <TextFieldAtom props={grp.labelField} />
                </Box>

                <IconButtonAtom props={grp.removeButton} />
                <IconButtonAtom props={grp.toggleButton} />
              </ListItem>

              {/* Expanded content: Order Items section */}
              <Collapse in={grp.isExpanded} timeout="auto" unmountOnExit>
                <Box
                  sx={{
                    borderTop: "1px solid",
                    borderColor: "divider",
                    px: 3,
                    py: 2,
                  }}
                >
                  <LabelAtom props={grp.orderItemsLabel} />
                  <ConfigurationOrdersItemSectionOrganism
                    props={grp.ordersItemSection}
                  />
                </Box>
              </Collapse>
            </Box>
          ))}

          {/* Add Orders Grp row */}
          {props.addGrpRowLabel && props.addGrpButton && (
            <>
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
                  <LabelAtom props={props.addGrpRowLabel} />
                  <IconButtonAtom props={props.addGrpButton} />
                </Stack>
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Box>
  );
}
