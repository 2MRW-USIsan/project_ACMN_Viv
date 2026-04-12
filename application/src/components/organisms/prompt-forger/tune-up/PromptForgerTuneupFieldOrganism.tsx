import { RadioOptionItem } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { Stack } from "@mui/material";
import { DividerAtom } from "../../../atoms/display/DividerAtom";
import { LabelAtom, LabelAtomProps } from "../../../atoms/display/LabelAtom";
import { ChipRadioAtom } from "../../../atoms/inputs/RadioButtonAtom";

interface PromptForgerTuneupFieldOrganismProps {
  props: {
    anglesLabel: LabelAtomProps["props"];
    anglesOptions: RadioOptionItem[];
    directionsLabel: LabelAtomProps["props"];
    directionsOptions: RadioOptionItem[];
  };
}

export function PromptForgerTuneupFieldOrganism({
  props,
}: PromptForgerTuneupFieldOrganismProps) {
  return (
    <Stack spacing={1} pl={2} pt={1}>
      <Stack spacing={0.5}>
        <LabelAtom props={props.anglesLabel} />
        <DividerAtom />
        <Stack direction="row" alignItems="center" spacing={1}>
          {props.anglesOptions.map((option) => (
            <Stack key={option.key} direction="row" alignItems="center">
              <ChipRadioAtom props={option.radio} />
              <LabelAtom props={option.label} />
            </Stack>
          ))}
        </Stack>
      </Stack>

      <Stack spacing={0.5}>
        <LabelAtom props={props.directionsLabel} />
        <DividerAtom />
        <Stack direction="row" alignItems="center" spacing={1}>
          {props.directionsOptions.map((option) => (
            <Stack key={option.key} direction="row" alignItems="center">
              <ChipRadioAtom props={option.radio} />
              <LabelAtom props={option.label} />
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
