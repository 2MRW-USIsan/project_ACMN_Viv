"use client";

import { Box, Collapse, Divider, Stack } from "@mui/material";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { DividerAtom } from "@/components/atoms/DividerAtom";
import { SwitchAtom } from "@/components/atoms/SwitchAtom";
import { IconButtonAtom } from "@/components/atoms/IconButtonAtom";
import { ForgerSwitchSection } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";

interface PromptForgerSwitchSectionOrganismProps {
  props: ForgerSwitchSection;
}

export function PromptForgerSwitchSectionOrganism({
  props,
}: PromptForgerSwitchSectionOrganismProps) {
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

              <Box
                sx={{ display: "flex", flexWrap: "wrap", pt: 0.5 }}
              >
                {grp.switchItems.map((item) => (
                  <Box key={item.key} sx={{ width: "50%", minWidth: 160 }}>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <LabelAtom props={item.itemLabel} />
                      <SwitchAtom props={item.switchControl} />
                    </Stack>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Stack>
      </Collapse>
    </Box>
  );
}
