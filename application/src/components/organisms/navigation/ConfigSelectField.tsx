import { LabelAtom } from "@/components/atoms/display/LabelAtom";
import { ButtonAtom } from "@/components/atoms/inputs/ButtonAtom";
import { SelectAtom } from "@/components/atoms/inputs/SelectAtom";
import { TextFieldAtom } from "@/components/atoms/inputs/TextFieldAtom";
import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { GridLayout } from "@/components/atoms/layout/GridLayout";
import { ConfigSelectFieldType } from "@/types/navigation";

interface ConfigSelectFieldProps {
  props: ConfigSelectFieldType;
}
export function ConfigSelectField({ props }: ConfigSelectFieldProps) {
  return (
    <AlignLayout column={1}>
      <GridLayout style={{ size: "CONTAINER" }}>
        <GridLayout style={{ size: 12 }}>
          <GridLayout style={{ size: 6 }}>
            <GridLayout style={{ size: 4 }}>
              <LabelAtom props={props.label.group} style={"LABEL"} />
            </GridLayout>
            <GridLayout style={{ size: 8 }}>
              <SelectAtom props={props.configSelect} />
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
    </AlignLayout>
  );
}
