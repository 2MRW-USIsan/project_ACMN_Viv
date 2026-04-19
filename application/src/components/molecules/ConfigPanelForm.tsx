import { LabelAtomType, TextFieldAtomType } from "@/types/ui";
import { DeletionMark, IconButtonType } from "../atoms/display/DeletionMark";
import { ExpandMark } from "../atoms/display/ExpandMark";
import { Label } from "../atoms/display/Label";
import { TextField } from "../atoms/inputs/TextField";
import { AlignLayout } from "../atoms/layout/AlignLayout";
import { GridLayout } from "../atoms/layout/GridLayout";
import { PanelItem, PanelItemType } from "../atoms/layout/PanelItem";

export type ConfigPanelFormType = {
  onToggle: PanelItemType;
  label: {
    value: LabelAtomType;
    key: LabelAtomType;
    panel: LabelAtomType;
  };
  field: {
    value: TextFieldAtomType;
    key: TextFieldAtomType;
  };
  remove: IconButtonType;
  isExpanded: boolean;
};
interface ConfigPanelFormProps {
  props: ConfigPanelFormType;
}
export function ConfigPanelForm({ props }: ConfigPanelFormProps) {
  return (
    <GridLayout style={{ size: "CONTAINER" }}>
      <PanelItem props={props.onToggle}>
        {/* Label */}
        <GridLayout style={{ size: 2 }}>
          <AlignLayout style={"START"}>
            <Label props={props.label.panel} style={"LABEL"} />
          </AlignLayout>
        </GridLayout>
        {/* Panel */}
        <GridLayout style={{ size: 9 }}>
          {/* Forms */}
          <GridLayout style={{ size: 11 }}>
            {/* Key Forms */}
            <GridLayout style={{ size: 4 }}>
              <GridLayout style={{ size: 3 }}>
                <Label props={props.label.key} />
              </GridLayout>
              <GridLayout style={{ size: 9 }}>
                <TextField props={props.field.key} />
              </GridLayout>
            </GridLayout>
            {/* Value Forms */}
            <GridLayout style={{ size: 8 }}>
              <GridLayout style={{ size: 2 }}>
                <Label props={props.label.value} />
              </GridLayout>
              <GridLayout style={{ size: 10 }}>
                <TextField props={props.field.value} />
              </GridLayout>
            </GridLayout>
          </GridLayout>
          {/* Deletion */}
          <GridLayout style={{ size: 1 }}>
            <AlignLayout style={"START"}>
              <DeletionMark props={props.remove} />
            </AlignLayout>
          </GridLayout>
        </GridLayout>
        {/* Icon */}
        <GridLayout style={{ size: 1 }}>
          <AlignLayout style={"END"}>
            <ExpandMark props={props.isExpanded} />
          </AlignLayout>
        </GridLayout>
      </PanelItem>
    </GridLayout>
  );
}
