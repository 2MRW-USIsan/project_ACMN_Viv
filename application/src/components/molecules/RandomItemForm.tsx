import {
  DeletionMark,
  IconButtonType,
} from "@/components/atoms/display/DeletionMark";
import { Label } from "@/components/atoms/display/Label";
import { TextField } from "@/components/atoms/inputs/TextField";
import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { GridLayout } from "@/components/atoms/layout/GridLayout";
import { LabelAtomType, TextFieldAtomType } from "@/types/ui";

type RandomItemFormType = {
  field: {
    value: TextFieldAtomType;
    prompt: TextFieldAtomType;
    weight: TextFieldAtomType;
  };
  remove: IconButtonType;
  label: {
    item: LabelAtomType;
    value: LabelAtomType;
    prompt: LabelAtomType;
    weight: LabelAtomType;
  };
};
interface RandomItemFormProps {
  props: RandomItemFormType;
}
export function RandomItemForm({ props }: RandomItemFormProps) {
  return (
    <GridLayout style={{ size: "CONTAINER" }}>
      {/* Label */}
      <GridLayout style={{ size: 2 }}>
        <AlignLayout style={"START"}>
          <Label props={props.label.item} style={"LABEL"} />
        </AlignLayout>
      </GridLayout>
      {/* Panel */}
      <GridLayout style={{ size: 9 }}>
        {/* Forms */}
        <GridLayout style={{ size: 11 }}>
          {/* Value Forms */}
          <GridLayout style={{ size: 3 }}>
            <GridLayout style={{ size: 3 }}>
              <Label props={props.label.value} />
            </GridLayout>
            <GridLayout style={{ size: 9 }}>
              <TextField props={props.field.value} />
            </GridLayout>
          </GridLayout>
          {/* Prompt Forms */}
          <GridLayout style={{ size: 6 }}>
            <GridLayout style={{ size: 3 }}>
              <Label props={props.label.prompt} />
            </GridLayout>
            <GridLayout style={{ size: 9 }}>
              <TextField props={props.field.prompt} />
            </GridLayout>
          </GridLayout>
          {/* Weight Forms */}
          <GridLayout style={{ size: 3 }}>
            <GridLayout style={{ size: 6 }}>
              <Label props={props.label.weight} />
            </GridLayout>
            <GridLayout style={{ size: 6 }}>
              <TextField props={props.field.weight} />
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
    </GridLayout>
  );
}
