"use client";

import { DividerAtom } from "@/components/atoms/DividerAtom";
import { IconButtonAtom } from "@/components/atoms/IconButtonAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { SwitchItemSectionOrganism } from "./SwitchItemSectionOrganism";
import { ConfigBodySection } from "@/hooks/configurations/viewModel/useConfigurationsComposer";
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  Stack,
} from "@mui/material";

interface ConfigurationSwitchSectionOrganismProps {
  props: ConfigBodySection;
}

export function ConfigurationSwitchSectionOrganism({
  props,
}: ConfigurationSwitchSectionOrganismProps) {
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
          {props.switchGrpPanels?.map((grp, index) => (
            <Box key={grp.key}>
              {index > 0 && <Divider />}

              {/* Switch Grp panel header */}
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

              {/* Expanded content: Switch Items section */}
              <Collapse in={grp.isExpanded} timeout="auto" unmountOnExit>
                <Box
                  sx={{
                    borderTop: "1px solid",
                    borderColor: "divider",
                    px: 3,
                    py: 2,
                  }}
                >
                  <LabelAtom props={grp.switchItemsLabel} />
                  <SwitchItemSectionOrganism props={grp.switchItemSection} />
                </Box>
              </Collapse>
            </Box>
          ))}

          {/* Add Switch Grp row */}
          {props.addSwitchGrpRowLabel && props.addSwitchGrpButton && (
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
                  <LabelAtom props={props.addSwitchGrpRowLabel} />
                  <IconButtonAtom props={props.addSwitchGrpButton} />
                </Stack>
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Box>
  );
}

