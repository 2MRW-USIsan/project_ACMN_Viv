"use client";

import { Collapse, Stack } from "@mui/material";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { DividerAtom } from "@/components/atoms/DividerAtom";
import { ButtonAtom } from "@/components/atoms/ButtonAtom";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { RadioButtonAtom } from "@/components/atoms/RadioButtonAtom";
import { IconButtonAtom } from "@/components/atoms/IconButtonAtom";
import { GridLayoutAtom } from "@/components/atoms/GridLayoutAtom";
import { SummaryBlocPanel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";

interface PromptForgerSummaryBlocOrganismProps {
  props: SummaryBlocPanel;
}

export function PromptForgerSummaryBlocOrganism({
  props,
}: PromptForgerSummaryBlocOrganismProps) {
  const { tuneupComposition, promptIdea } = props;

  return (
    <GridLayoutAtom>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <LabelAtom props={props.titleLabel} />
        <IconButtonAtom props={props.toggleButton} />
      </Stack>
      <DividerAtom />

      <Collapse in={props.isExpanded} timeout="auto" unmountOnExit>
        <Stack spacing={1} pl={2} pt={1}>

          {/* Tune-up Composition */}
          <GridLayoutAtom>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <LabelAtom props={tuneupComposition.titleLabel} />
              <IconButtonAtom props={tuneupComposition.toggleButton} />
            </Stack>
            <DividerAtom />

            <Collapse in={tuneupComposition.isExpanded} timeout="auto" unmountOnExit>
              <Stack spacing={1} pl={2} pt={1}>
                {/* Angles */}
                <Stack spacing={0.5}>
                  <LabelAtom props={tuneupComposition.anglesLabel} />
                  <DividerAtom />
                  <Stack direction="row" alignItems="center" spacing={1}>
                    {tuneupComposition.anglesOptions.map((option) => (
                      <Stack key={option.key} direction="row" alignItems="center">
                        <RadioButtonAtom props={option.radio} />
                        <LabelAtom props={option.label} />
                      </Stack>
                    ))}
                  </Stack>
                </Stack>

                {/* Directions */}
                <Stack spacing={0.5}>
                  <LabelAtom props={tuneupComposition.directionsLabel} />
                  <DividerAtom />
                  <Stack direction="row" alignItems="center" spacing={1}>
                    {tuneupComposition.directionsOptions.map((option) => (
                      <Stack key={option.key} direction="row" alignItems="center">
                        <RadioButtonAtom props={option.radio} />
                        <LabelAtom props={option.label} />
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </Stack>
            </Collapse>
          </GridLayoutAtom>

          {/* Prompt Idea */}
          <GridLayoutAtom>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <LabelAtom props={promptIdea.titleLabel} />
              <IconButtonAtom props={promptIdea.toggleButton} />
            </Stack>
            <DividerAtom />

            <Collapse in={promptIdea.isExpanded} timeout="auto" unmountOnExit>
              <Stack spacing={1} pl={2} pt={1}>
                <Stack direction="row" spacing={1}>
                  <ButtonAtom props={promptIdea.shuffleButton} />
                  <ButtonAtom props={promptIdea.copyButton} />
                </Stack>
                <LabelAtom props={promptIdea.summaryPromptLabel} />
                <TextFieldAtom props={promptIdea.summaryPromptField} />
              </Stack>
            </Collapse>
          </GridLayoutAtom>

        </Stack>
      </Collapse>
    </GridLayoutAtom>
  );
}
