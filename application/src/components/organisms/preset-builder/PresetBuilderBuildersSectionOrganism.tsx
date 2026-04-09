import { ButtonAtomProps, ButtonAtom } from "@/components/atoms/ButtonAtom";
import { DividerAtom } from "@/components/atoms/DividerAtom";
import { LabelAtomProps, LabelAtom } from "@/components/atoms/LabelAtom";
import { TextAreaAtomProps, TextAreaAtom } from "@/components/atoms/TextAreaAtom";
import { Stack } from "@mui/material";

interface PresetBuilderBuildersSectionOrganismProps {
  props: {
    buildersSectionLabel: LabelAtomProps["props"];
    shuffleButton: ButtonAtomProps["props"];
    copyButton: ButtonAtomProps["props"];
    pasteButton: ButtonAtomProps["props"];
    resetButton: ButtonAtomProps["props"];
    clearButton: ButtonAtomProps["props"];
    presetsTemplateLabel: LabelAtomProps["props"];
    presetsTemplateField: TextAreaAtomProps["props"];
    orderPresetsLabel: LabelAtomProps["props"];
    orderPresetsField: TextAreaAtomProps["props"];
  };
}
export function PresetBuilderBuildersSectionOrganism({
  props,
}: PresetBuilderBuildersSectionOrganismProps) {
  return (
    <>
      <LabelAtom props={props.buildersSectionLabel} />
      <DividerAtom />
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={1}>
          <ButtonAtom props={props.shuffleButton} />
          <ButtonAtom props={props.copyButton} />
        </Stack>
        <Stack direction="row" spacing={1}>
          <ButtonAtom props={props.pasteButton} />
          <ButtonAtom props={props.resetButton} />
          <ButtonAtom props={props.clearButton} />
        </Stack>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Stack spacing={1} flex={1}>
          <LabelAtom props={props.presetsTemplateLabel} />
          <TextAreaAtom props={props.presetsTemplateField} />
        </Stack>

        <Stack spacing={1} flex={1}>
          <LabelAtom props={props.orderPresetsLabel} />
          <TextAreaAtom props={props.orderPresetsField} />
        </Stack>
      </Stack>
    </>
  );
}
