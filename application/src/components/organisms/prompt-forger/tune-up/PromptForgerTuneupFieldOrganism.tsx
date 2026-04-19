import { RadioOptionItem } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { DividerAtom } from "../../../atoms/display/DividerLine";
import { Label, LabelProps } from "../../../atoms/display/Label";
import { ChipRadioAtom } from "../../../atoms/inputs/ChipRadio";
import { AlignLayout } from "../../../atoms/layout/AlignLayout";

interface PromptForgerTuneupFieldOrganismProps {
  props: {
    anglesLabel: LabelProps["props"];
    anglesOptions: RadioOptionItem[];
    directionsLabel: LabelProps["props"];
    directionsOptions: RadioOptionItem[];
  };
}

export function PromptForgerTuneupFieldOrganism({
  props,
}: PromptForgerTuneupFieldOrganismProps) {
  return (
    <AlignLayout column={1}>
      <AlignLayout column={0.5}>
        <Label props={props.anglesLabel} style={"LABEL"} />
        <DividerAtom />
        <AlignLayout>
          {props.anglesOptions.map((option) => (
            <AlignLayout key={option.key}>
              <ChipRadioAtom props={option.radio} />
              <Label props={option.label} />
            </AlignLayout>
          ))}
        </AlignLayout>
      </AlignLayout>

      <AlignLayout column={0.5}>
        <Label props={props.directionsLabel} style={"LABEL"} />
        <DividerAtom />
        <AlignLayout>
          {props.directionsOptions.map((option) => (
            <AlignLayout key={option.key}>
              <ChipRadioAtom props={option.radio} />
              <Label props={option.label} />
            </AlignLayout>
          ))}
        </AlignLayout>
      </AlignLayout>
    </AlignLayout>
  );
}
