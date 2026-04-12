import { ConfigBodyBlocPanel } from "@/hooks/configurations/viewModel/useConfigurationsComposer";
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  Stack,
  Toolbar,
} from "@mui/material";
import { DividerAtom } from "../../atoms/display/DividerAtom";
import { LabelAtom, LabelAtomProps } from "../../atoms/display/LabelAtom";
import { ChipCheckboxAtom } from "../../atoms/inputs/ChipCheckboxAtom";
import {
  IconButtonAtom,
  IconButtonAtomProps,
} from "../../atoms/inputs/IconButtonAtom";
import { TextFieldAtom } from "../../atoms/inputs/TextFieldAtom";
import { ConfigurationOrdersSectionOrganism } from "../../organisms/configuration/orders/ConfigurationOrdersSectionOrganism";
import { ConfigurationSelectSectionOrganism } from "../../organisms/configuration/select/ConfigurationSelectSectionOrganism";
import { ConfigurationSwitchSectionOrganism } from "../../organisms/configuration/switch/ConfigurationSwitchSectionOrganism";

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
    <Stack spacing={2} p={3} maxWidth={960} mx="auto">
      <Toolbar />
      <Stack direction="row" alignItems="center" spacing={1}>
        <LabelAtom props={props.headerLabel} />
      </Stack>
      <DividerAtom />

      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <List disablePadding>
          {props.blocPanels.map((bloc, index) => {
            return (
              <Box key={bloc.key}>
                {index > 0 && <Divider />}

                {/* Panel header */}
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
                  <LabelAtom props={bloc.panelLabel} />
                  <LabelAtom props={bloc.keyLabel} />
                  <Box sx={{ width: 160 }}>
                    <TextFieldAtom props={bloc.keyField} />
                  </Box>

                  <LabelAtom props={bloc.labelLabel} />
                  <Box sx={{ flex: 1, minWidth: 160 }}>
                    <TextFieldAtom props={bloc.labelField} />
                  </Box>

                  <IconButtonAtom props={bloc.removeButton} />
                  <IconButtonAtom props={bloc.toggleButton} />
                </ListItem>

                {/* Expanded panel content */}
                <Collapse in={bloc.isExpanded} timeout="auto" unmountOnExit>
                  <Box
                    sx={{
                      borderTop: "1px solid",
                      borderColor: "divider",
                      px: 3,
                      py: 2,
                    }}
                  >
                    {/* Bloc Select chips */}
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      mb={2}
                    >
                      <LabelAtom props={bloc.blocSelectLabel} />
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {bloc.blocTypeChips.map(({ key, ...chipProps }) => (
                          <ChipCheckboxAtom key={key} props={chipProps} />
                        ))}
                      </Stack>
                    </Stack>

                    <DividerAtom />

                    {/* Sub-sections for each checked bloc type */}
                    {bloc.sections.map((section) => (
                      <Box key={section.key}>
                        {section.type === "Orders" && (
                          <ConfigurationOrdersSectionOrganism props={section} />
                        )}
                        {section.type === "Switch" && (
                          <ConfigurationSwitchSectionOrganism props={section} />
                        )}
                        {section.type === "Select" && (
                          <ConfigurationSelectSectionOrganism props={section} />
                        )}
                      </Box>
                    ))}
                  </Box>
                </Collapse>
              </Box>
            );
          })}

          {/* Add Bloc row */}
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
              <LabelAtom props={props.addRowLabel} />
              <IconButtonAtom props={props.addButton} />
            </Stack>
          </ListItem>
        </List>
      </Box>
    </Stack>
  );
}
