"use client";

import { Box, Collapse, Divider, Stack } from "@mui/material";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { DividerAtom } from "@/components/atoms/DividerAtom";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { ButtonAtom } from "@/components/atoms/ButtonAtom";
import { IconButtonAtom } from "@/components/atoms/IconButtonAtom";
import { ForgerOrdersSection } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";

interface PromptForgerOrdersSectionOrganismProps {
  props: ForgerOrdersSection;
}

export function PromptForgerOrdersSectionOrganism({
  props,
}: PromptForgerOrdersSectionOrganismProps) {
  return (
    <Box mt={1}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <LabelAtom props={props.titleLabel} />
        <IconButtonAtom props={props.toggleButton} />
      </Stack>
      <DividerAtom />

      <Collapse in={props.isExpanded} timeout="auto" unmountOnExit>
        <Stack spacing={2} pt={1}>
          {props.grpPanels.map((grp) => (
            <Box key={grp.key}>
              <LabelAtom props={grp.grpLabel} />
              <Divider sx={{ my: 0.5 }} />

              <Stack spacing={0.5} pl={1} pt={0.5}>
                {grp.displayLines.map((line, i) => (
                  <LabelAtom key={i} props={line} />
                ))}
                <LabelAtom props={grp.scriptsLabel} />
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1} pt={1}>
                <LabelAtom props={grp.promptLabel} />
                <Box sx={{ flex: 1 }}>
                  <TextFieldAtom props={grp.promptField} />
                </Box>
                <ButtonAtom props={grp.resetButton} />
                <ButtonAtom props={grp.clearButton} />
              </Stack>
            </Box>
          ))}
        </Stack>
      </Collapse>
    </Box>
  );
}
