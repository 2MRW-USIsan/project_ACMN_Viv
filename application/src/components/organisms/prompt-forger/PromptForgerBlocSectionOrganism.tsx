"use client";

import { Collapse, Stack } from "@mui/material";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { DividerAtom } from "@/components/atoms/DividerAtom";
import { IconButtonAtom } from "@/components/atoms/IconButtonAtom";
import { GridLayoutAtom } from "@/components/atoms/GridLayoutAtom";
import { PromptForgerOrdersSectionOrganism } from "@/components/organisms/prompt-forger/PromptForgerOrdersSectionOrganism";
import { PromptForgerSwitchSectionOrganism } from "@/components/organisms/prompt-forger/PromptForgerSwitchSectionOrganism";
import { PromptForgerSelectSectionOrganism } from "@/components/organisms/prompt-forger/PromptForgerSelectSectionOrganism";
import { ForgerBlocPanel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";

interface PromptForgerBlocSectionOrganismProps {
  props: ForgerBlocPanel;
}

export function PromptForgerBlocSectionOrganism({
  props,
}: PromptForgerBlocSectionOrganismProps) {
  return (
    <GridLayoutAtom>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <LabelAtom props={props.titleLabel} />
        <IconButtonAtom props={props.toggleButton} />
      </Stack>
      <DividerAtom />

      <Collapse in={props.isExpanded} timeout="auto" unmountOnExit>
        <Stack spacing={1} pl={2} pt={1}>
          {props.ordersSection && (
            <PromptForgerOrdersSectionOrganism props={props.ordersSection} />
          )}
          {props.switchSection && (
            <PromptForgerSwitchSectionOrganism props={props.switchSection} />
          )}
          {props.selectSection && (
            <PromptForgerSelectSectionOrganism props={props.selectSection} />
          )}
        </Stack>
      </Collapse>
    </GridLayoutAtom>
  );
}
