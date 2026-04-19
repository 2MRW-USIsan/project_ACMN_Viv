import { ClerkFieldType } from "@/types/posting-clerk";
import { Label } from "../../../atoms/display/Label";
import { TextField } from "../../../atoms/inputs/TextField";
import { AlignLayout } from "../../../atoms/layout/AlignLayout";
import { GridLayout } from "../../../atoms/layout/GridLayout";

interface ClerkFieldProps {
  props: ClerkFieldType;
}
export function ClerkField({ props }: ClerkFieldProps) {
  return (
    <GridLayout style={{ size: "CONTAINER" }}>
      <GridLayout style={{ size: 12 }}>
        <GridLayout style={{ size: 2 }}>
          <Label props={props.titleJpLabel} style={"LABEL"} />
        </GridLayout>
        <GridLayout style={{ size: 10 }}>
          <AlignLayout style={"START"}>
            <TextField props={props.titleJpField} />
          </AlignLayout>
        </GridLayout>
      </GridLayout>
      <GridLayout style={{ size: 12 }}>
        <GridLayout style={{ size: 2 }}>
          <Label props={props.titleEnLabel} style={"LABEL"} />
        </GridLayout>
        <GridLayout style={{ size: 10 }}>
          <AlignLayout style={"START"}>
            <TextField props={props.titleEnField} />
          </AlignLayout>
        </GridLayout>
      </GridLayout>
      <GridLayout style={{ size: 6 }}>
        <GridLayout style={{ size: 4 }}>
          <Label props={props.symbolLabel} style={"LABEL"} />
        </GridLayout>
        <GridLayout style={{ size: 8 }}>
          <GridLayout style={{ size: 4 }}>
            <AlignLayout style={"START"}>
              <TextField props={props.symbolField} />
            </AlignLayout>
          </GridLayout>
        </GridLayout>
      </GridLayout>
      <GridLayout style={{ size: 6 }}>
        <GridLayout style={{ size: 4 }}>
          <Label props={props.picsLabel} style={"LABEL"} />
        </GridLayout>
        <GridLayout style={{ size: 8 }}>
          <GridLayout style={{ size: 4 }}>
            <AlignLayout style={"START"}>
              <TextField props={props.picsField} />
            </AlignLayout>
          </GridLayout>
        </GridLayout>
      </GridLayout>
    </GridLayout>
  );
}
