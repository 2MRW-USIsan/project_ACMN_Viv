import { BuildersSectionType } from "@/types/preset-builder";
import { Label } from "../../atoms/display/Label";
import { Button } from "../../atoms/inputs/Button";
import { TextArea } from "../../atoms/inputs/TextArea";
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
            <Button props={props.shuffleButton} />
            <Button props={props.copyButton} />
          </AlignLayout>
        </GridLayout>
        <GridLayout style={{ size: 6 }}>
          <AlignLayout style={"END"}>
            <Button props={props.pasteButton} />
            <Button props={props.resetButton} />
            <Button props={props.clearButton} />
          </AlignLayout>
        </GridLayout>
      </GridLayout>
      <GridLayout style={{ size: "CONTAINER" }}>
        <GridLayout style={{ size: 6 }}>
          <AlignLayout column={0.5}>
            <Label props={props.presetsTemplateLabel} style={"LABEL"} />
            <TextArea props={props.presetsTemplateField} style={{ rows: 14 }} />
          </AlignLayout>
        </GridLayout>
        <GridLayout style={{ size: 6 }}>
          <AlignLayout column={0.5}>
            <Label props={props.orderPresetsLabel} style={"LABEL"} />
            <TextArea props={props.orderPresetsField} style={{ rows: 14 }} />
          </AlignLayout>
        </GridLayout>
      </GridLayout>
    </AlignLayout>
  );
}
