import { DeletionMark } from "@/components/atoms/display/DeletionMark";
import { Label } from "@/components/atoms/display/Label";
import { TextField } from "@/components/atoms/inputs/TextField";
import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { GridLayout } from "@/components/atoms/layout/GridLayout";
import { ListItemFormType } from "@/types/components/ui";

interface ListItemFormProps {
  props: ListItemFormType;
}
export function ListItemForm({ props }: ListItemFormProps) {
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
          <GridLayout style={9}>
            <GridLayout style={2}>
              <Label props={props.label.prompt} />
            </GridLayout>
            <GridLayout style={10}>
              <TextField props={props.field.prompt} />
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
