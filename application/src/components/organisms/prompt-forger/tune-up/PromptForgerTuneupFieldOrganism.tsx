import { RadioOptionItem } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { DividerAtom } from "../../../atoms/display/DividerAtom";
import { LabelAtom, LabelAtomProps } from "../../../atoms/display/LabelAtom";
import { ChipRadioAtom } from "../../../atoms/inputs/RadioButtonAtom";
import { AlignLayout } from "../../../atoms/layout/AlignLayout";

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
    <AlignLayout column={1}>
      <AlignLayout column={0.5}>
        <LabelAtom props={props.anglesLabel} style={"LABEL"} />
        <DividerAtom />
        <AlignLayout>
          {props.anglesOptions.map((option) => (
            <AlignLayout key={option.key}>
              <ChipRadioAtom props={option.radio} />
              <LabelAtom props={option.label} />
            </AlignLayout>
          ))}
        </AlignLayout>
      </AlignLayout>

      <AlignLayout column={0.5}>
        <LabelAtom props={props.directionsLabel} style={"LABEL"} />
        <DividerAtom />
        <AlignLayout>
          {props.directionsOptions.map((option) => (
            <AlignLayout key={option.key}>
              <ChipRadioAtom props={option.radio} />
              <LabelAtom props={option.label} />
            </AlignLayout>
          ))}
        </AlignLayout>
      </AlignLayout>
    </AlignLayout>
  );
}
