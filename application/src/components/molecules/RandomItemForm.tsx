import { DeletionMark } from "@/components/atoms/display/DeletionMark";
import { Label } from "@/components/atoms/display/Label";
import { TextField } from "@/components/atoms/inputs/TextField";
import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { GridLayout } from "@/components/atoms/layout/GridLayout";
import { RandomItemFormType } from "@/types/components/ui";

interface RandomItemFormProps {
  props: RandomItemFormType;
}
export function RandomItemForm({ props }: RandomItemFormProps) {
  return (
    <GridLayout style={"CONTAINER"}>
      {/* Label */}
      <GridLayout style={2}>
        <AlignLayout style={"START"}>
          <Label props={props.label.title} style={"LABEL"} />
        </AlignLayout>
      </GridLayout>
      {/* Panel */}
      <GridLayout style={9}>
        {/* Forms */}
        <GridLayout style={11}>
          {/* Value Forms */}
          <GridLayout style={3}>
            <GridLayout style={3}>
              <Label props={props.label.value} />
            </GridLayout>
            <GridLayout style={9}>
              <TextField props={props.field.value} />
            </GridLayout>
          </GridLayout>
          {/* Prompt Forms */}
          <GridLayout style={6}>
            <GridLayout style={3}>
              <Label props={props.label.prompt} />
            </GridLayout>
            <GridLayout style={9}>
              <TextField props={props.field.prompt} />
            </GridLayout>
          </GridLayout>
          {/* Weight Forms */}
          <GridLayout style={3}>
            <GridLayout style={6}>
              <Label props={props.label.weight} />
            </GridLayout>
            <GridLayout style={6}>
              <TextField props={props.field.weight} />
            </GridLayout>
          </GridLayout>
        </GridLayout>
        {/* Deletion */}
        <GridLayout style={1}>
          <AlignLayout style={"START"}>
            <DeletionMark props={props.remove} />
          </AlignLayout>
        </GridLayout>
      </GridLayout>
    </GridLayout>
  );
}
