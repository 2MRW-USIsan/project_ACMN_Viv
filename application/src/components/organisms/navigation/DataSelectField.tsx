import { DividerAtom } from "@/components/atoms/display/DividerAtom";
import { LabelAtom } from "@/components/atoms/display/LabelAtom";
import { ButtonAtom } from "@/components/atoms/inputs/ButtonAtom";
import { ChipRadioAtom } from "@/components/atoms/inputs/RadioButtonAtom";
import { SelectAtom } from "@/components/atoms/inputs/SelectAtom";
import { TextFieldAtom } from "@/components/atoms/inputs/TextFieldAtom";
import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { GridLayout } from "@/components/atoms/layout/GridLayout";
import { DataSelectFieldType } from "@/types/navigation";

interface DataSelectFieldProps {
  props: DataSelectFieldType;
}
export function DataSelectField({ props }: DataSelectFieldProps) {
  return (
    <AlignLayout column={1}>
      <GridLayout style={{ size: "CONTAINER" }}>
        <GridLayout style={{ size: 12 }}>
          <GridLayout style={{ size: 6 }}>
            <GridLayout style={{ size: 4 }}>
              <LabelAtom props={props.label.group} style={"LABEL"} />
            </GridLayout>
            <GridLayout style={{ size: 8 }}>
              <SelectAtom props={props.groupSelect} />
            </GridLayout>
          </GridLayout>
          <GridLayout style={{ size: 6 }}>
            <GridLayout style={{ size: 6 }}>
              <ButtonAtom props={props.button.load} />
            </GridLayout>
            <GridLayout style={{ size: 6 }}>
              <ButtonAtom props={props.button.new} />
            </GridLayout>
          </GridLayout>
        </GridLayout>
        <GridLayout style={{ size: 12 }}>
          <GridLayout style={{ size: 6 }}>
            <GridLayout style={{ size: 4 }}>
              <LabelAtom props={props.label.name} style={"LABEL"} />
            </GridLayout>
            <GridLayout style={{ size: 8 }}>
              <TextFieldAtom props={props.nameField} />
            </GridLayout>
          </GridLayout>
          <GridLayout style={{ size: 6 }}>
            <GridLayout style={{ size: 6 }}>
              <ButtonAtom props={props.button.load} />
            </GridLayout>
            <GridLayout style={{ size: 6 }}>
              <ButtonAtom props={props.button.new} />
            </GridLayout>
          </GridLayout>
          <GridLayout style={{ size: 12 }}>
            <AlignLayout style={"END"}>
              <ButtonAtom props={props.button.deletion} />
            </AlignLayout>
          </GridLayout>
        </GridLayout>
      </GridLayout>
      <DividerAtom />
      <AlignLayout column={1}>
        {props.radioGroup.map((item) => (
          <ChipRadioAtom props={item.radio} key={item.key} />
        ))}
      </AlignLayout>
    </AlignLayout>
  );
}
