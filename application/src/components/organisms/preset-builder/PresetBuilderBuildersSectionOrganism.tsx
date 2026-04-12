import { BuildersSectionType } from "@/types/preset-builder";
import { LabelAtom } from "../../atoms/display/LabelAtom";
import { ButtonAtom } from "../../atoms/inputs/ButtonAtom";
import { TextAreaAtom } from "../../atoms/inputs/TextAreaAtom";
import { AlignLayout } from "../../atoms/layout/AlignLayout";
import { GridLayout } from "../../atoms/layout/GridLayout";
import { SectionLabel } from "../../molecules/SectionLabel";

interface PresetBuilderBuildersSectionOrganismProps {
  props: BuildersSectionType;
}
export function PresetBuilderBuildersSectionOrganism({
  props,
}: PresetBuilderBuildersSectionOrganismProps) {
  return (
    <AlignLayout column={0.5}>
      <SectionLabel props={props.label} />
      <GridLayout style={{ size: "CONTAINER" }}>
        <GridLayout style={{ size: 6 }}>
          <AlignLayout style={"START"}>
            <ButtonAtom props={props.shuffleButton} />
            <ButtonAtom props={props.copyButton} />
          </AlignLayout>
        </GridLayout>
        <GridLayout style={{ size: 6 }}>
          <AlignLayout style={"END"}>
            <ButtonAtom props={props.pasteButton} />
            <ButtonAtom props={props.resetButton} />
            <ButtonAtom props={props.clearButton} />
          </AlignLayout>
        </GridLayout>
      </GridLayout>
      <GridLayout style={{ size: "CONTAINER" }}>
        <GridLayout style={{ size: 6 }}>
          <AlignLayout column={0.5}>
            <LabelAtom props={props.presetsTemplateLabel} style={"LABEL"} />
            <TextAreaAtom
              props={props.presetsTemplateField}
              style={{ rows: 14 }}
            />
          </AlignLayout>
        </GridLayout>
        <GridLayout style={{ size: 6 }}>
          <AlignLayout column={0.5}>
            <LabelAtom props={props.orderPresetsLabel} style={"LABEL"} />
            <TextAreaAtom
              props={props.orderPresetsField}
              style={{ rows: 14 }}
            />
          </AlignLayout>
        </GridLayout>
      </GridLayout>
    </AlignLayout>
  );
}
