

import { IconButtonAtom } from "@/components/atoms/inputs/IconButtonAtom";
import { LabelAtom } from "@/components/atoms/display/LabelAtom";
import { TextFieldAtom } from "@/components/atoms/inputs/TextFieldAtom";
import { RandomSection } from "@/hooks/configurations/viewModel/useConfigurationsComposer";
import { Box, Divider, List, ListItem, Stack } from "@mui/material";

interface OrdersRandomSectionOrganismProps {
  props: RandomSection;
}

export function OrdersRandomSectionOrganism({
  props,
}: OrdersRandomSectionOrganismProps) {
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
      <Box sx={{ px: 2, py: 1 }}>
        <LabelAtom props={props.headerLabel} />
      </Box>
      <Divider />
      <List disablePadding>
        {props.randomRows.map((row) => (
          <ListItem
            key={row.key}
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
            <LabelAtom props={row.valueLabel} />
            <Box sx={{ width: 160 }}>
              <TextFieldAtom props={row.valueField} />
            </Box>

            <LabelAtom props={row.promptLabel} />
            <Box sx={{ width: 160 }}>
              <TextFieldAtom props={row.promptField} />
            </Box>

            <LabelAtom props={row.weightLabel} />
            <Box sx={{ width: 100 }}>
              <TextFieldAtom props={row.weightField} />
            </Box>

            <IconButtonAtom props={row.removeButton} />
          </ListItem>
        ))}
      </List>
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
          <IconButtonAtom props={props.addRowButton} />
        </Stack>
      </ListItem>
    </Box>
  );
}
