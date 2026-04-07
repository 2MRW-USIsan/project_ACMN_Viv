"use client";

import { Box, Collapse, Divider, Stack } from "@mui/material";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { DividerAtom } from "@/components/atoms/DividerAtom";
import { SelectAtom } from "@/components/atoms/SelectAtom";
import { ButtonAtom } from "@/components/atoms/ButtonAtom";
import { IconButtonAtom } from "@/components/atoms/IconButtonAtom";
import { GridLayoutAtom } from "@/components/atoms/GridLayoutAtom";
import { ForgerSelectSection } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";

interface PromptForgerSelectSectionOrganismProps {
  props: ForgerSelectSection;
}

export function PromptForgerSelectSectionOrganism({
  props,
}: PromptForgerSelectSectionOrganismProps) {
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

              <Stack spacing={0.5} pt={0.5}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <LabelAtom props={grp.shuffleAllLabel} />
                  <ButtonAtom props={grp.shuffleButton} />
                </Stack>

                {grp.selectRows.map((row) => (
                  <Stack key={row.key} direction="row" alignItems="center" spacing={1}>
                    <LabelAtom props={row.label} />
                    <GridLayoutAtom props={{ flex: 1 }}>
                      <SelectAtom props={row.select} />
                    </GridLayoutAtom>
                    <ButtonAtom props={row.reloadButton} />
                  </Stack>
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      </Collapse>
    </Box>
  );
}
