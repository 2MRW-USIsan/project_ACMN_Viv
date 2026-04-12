import { ComplexSection } from "@/hooks/configurations/viewModel/useConfigurationsComposer";
import { Box, Collapse, Divider, List, ListItem, Stack } from "@mui/material";
import { DividerAtom } from "../../atoms/display/DividerAtom";
import { LabelAtom } from "../../atoms/display/LabelAtom";
import { IconButtonAtom } from "../../atoms/inputs/IconButtonAtom";
import { TextFieldAtom } from "../../atoms/inputs/TextFieldAtom";

interface ConfigurationComplexSectionOrganismProps {
  props: ComplexSection;
}

export function ConfigurationComplexSectionOrganism({
  props,
}: ConfigurationComplexSectionOrganismProps) {
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
        {props.categoryPanels.map((category, index) => (
          <Box key={category.key}>
            {index > 0 && <Divider />}

            {/* Category row */}
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
              <LabelAtom props={category.categoryLabel} />
              <LabelAtom props={category.valueLabel} />
              <Box sx={{ width: 140 }}>
                <TextFieldAtom props={category.valueField} />
              </Box>

              <LabelAtom props={category.promptLabel} />
              <Box sx={{ flex: 1, minWidth: 140 }}>
                <TextFieldAtom props={category.promptField} />
              </Box>

              <LabelAtom props={category.weightLabel} />
              <Box sx={{ width: 100 }}>
                <TextFieldAtom props={category.weightField} />
              </Box>

              <IconButtonAtom props={category.removeButton} />
              <IconButtonAtom props={category.toggleButton} />
            </ListItem>

            {/* Expanded random sub-section */}
            <Collapse in={category.isExpanded} timeout="auto" unmountOnExit>
              <Box
                sx={{
                  borderTop: "1px solid",
                  borderColor: "divider",
                  px: 3,
                  py: 2,
                }}
              >
                <LabelAtom props={category.randomSectionLabel} />
                <DividerAtom />

                <Stack spacing={1} mt={1}>
                  {category.randomItemPanels.map((item) => (
                    <Stack
                      key={item.key}
                      direction="row"
                      alignItems="center"
                      gap={1}
                      flexWrap="wrap"
                    >
                      <LabelAtom props={item.valueLabel} />
                      <Box sx={{ width: 140 }}>
                        <TextFieldAtom props={item.valueField} />
                      </Box>

                      <LabelAtom props={item.promptLabel} />
                      <Box sx={{ flex: 1, minWidth: 140 }}>
                        <TextFieldAtom props={item.promptField} />
                      </Box>

                      <LabelAtom props={item.weightLabel} />
                      <Box sx={{ width: 100 }}>
                        <TextFieldAtom props={item.weightField} />
                      </Box>

                      <IconButtonAtom props={item.removeButton} />
                    </Stack>
                  ))}
                </Stack>

                {/* Add Random Item row */}
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  spacing={0.5}
                  mt={2}
                >
                  <LabelAtom props={category.addRandomItemRowLabel} />
                  <IconButtonAtom props={category.addRandomItemButton} />
                </Stack>
              </Box>
            </Collapse>
          </Box>
        ))}

        {/* Add Complex Category row */}
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
            <LabelAtom props={props.addCategoryRowLabel} />
            <IconButtonAtom props={props.addCategoryButton} />
          </Stack>
        </ListItem>
      </List>
    </Box>
  );
}
