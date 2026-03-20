"use client";

import { Accordion, AccordionDetails, AccordionSummary, Box, Paper, Stack } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { LabelAtom } from "@/components/atoms/LabelAtom";

interface YamlPanelListOrganismProps {
  props: {
    todoPanelList: { id: string; expanded: boolean }[];
    todoOnPanelToggle: (id: string) => void;
    todoOnPanelAdd: () => void;
  };
}

export function YamlPanelListOrganism({ props }: YamlPanelListOrganismProps) {
  return (
    <Box>
      {props.todoPanelList.map((panel) => (
        <Accordion
          key={panel.id}
          expanded={panel.expanded}
          onChange={() => props.todoOnPanelToggle(panel.id)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <LabelAtom props={{ text: panel.id }} />
          </AccordionSummary>
          <AccordionDetails>
            {/* TODO: YAML editor content will be added in a future step */}
          </AccordionDetails>
        </Accordion>
      ))}
      <Paper
        variant="outlined"
        role="button"
        aria-label="Add panel"
        tabIndex={0}
        sx={{ mt: props.todoPanelList.length > 0 ? 1 : 0, cursor: "pointer" }}
        onClick={props.todoOnPanelAdd}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") props.todoOnPanelAdd();
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="center" sx={{ p: 1 }}>
          <AddIcon />
        </Stack>
      </Paper>
    </Box>
  );
}
