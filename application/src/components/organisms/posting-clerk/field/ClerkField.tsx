import { ClerkFieldType } from "@/types/posting-clerk";
import { LabelAtom } from "../../../atoms/display/LabelAtom";
import { TextFieldAtom } from "../../../atoms/inputs/TextFieldAtom";
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
          <LabelAtom props={props.titleJpLabel} style={"LABEL"} />
        </GridLayout>
        <GridLayout style={{ size: 10 }}>
          <AlignLayout style={"START"}>
            <TextFieldAtom props={props.titleJpField} />
          </AlignLayout>
        </GridLayout>
      </GridLayout>
      <GridLayout style={{ size: 12 }}>
        <GridLayout style={{ size: 2 }}>
          <LabelAtom props={props.titleEnLabel} style={"LABEL"} />
        </GridLayout>
        <GridLayout style={{ size: 10 }}>
          <AlignLayout style={"START"}>
            <TextFieldAtom props={props.titleEnField} />
          </AlignLayout>
        </GridLayout>
      </GridLayout>
      <GridLayout style={{ size: 6 }}>
        <GridLayout style={{ size: 4 }}>
          <LabelAtom props={props.symbolLabel} style={"LABEL"} />
        </GridLayout>
        <GridLayout style={{ size: 8 }}>
          <GridLayout style={{ size: 4 }}>
            <AlignLayout style={"START"}>
              <TextFieldAtom props={props.symbolField} />
            </AlignLayout>
          </GridLayout>
        </GridLayout>
      </GridLayout>
      <GridLayout style={{ size: 6 }}>
        <GridLayout style={{ size: 4 }}>
          <LabelAtom props={props.picsLabel} style={"LABEL"} />
        </GridLayout>
        <GridLayout style={{ size: 8 }}>
          <GridLayout style={{ size: 4 }}>
            <AlignLayout style={"START"}>
              <TextFieldAtom props={props.picsField} />
            </AlignLayout>
          </GridLayout>
        </GridLayout>
      </GridLayout>
    </GridLayout>
  );
}
