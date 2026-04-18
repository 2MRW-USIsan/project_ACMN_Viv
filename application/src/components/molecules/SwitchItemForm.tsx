import {
  DeletionMark,
  IconButtonType,
} from "@/components/atoms/display/DeletionMark";
import { LabelAtom } from "@/components/atoms/display/LabelAtom";
import { TextFieldAtom } from "@/components/atoms/inputs/TextFieldAtom";
import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { GridLayout } from "@/components/atoms/layout/GridLayout";
import { LabelAtomType, TextFieldAtomType } from "@/types/ui";

type ListItemFormType = {
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
interface ListItemFormProps {
  props: ListItemFormType;
}
export function SwitchItemForm({ props }: ListItemFormProps) {
  return (
    <GridLayout style={{ size: "CONTAINER" }}>
      {/* Label */}
      <GridLayout style={{ size: 2 }}>
        <AlignLayout style={"START"}>
          <LabelAtom props={props.label.item} style={"LABEL"} />
        </AlignLayout>
      </GridLayout>
      {/* Panel */}
      <GridLayout style={{ size: 9 }}>
        {/* Forms */}
        <GridLayout style={{ size: 11 }}>
          {/* Value Forms */}
          <GridLayout style={{ size: 3 }}>
            <GridLayout style={{ size: 3 }}>
              <LabelAtom props={props.label.value} />
            </GridLayout>
            <GridLayout style={{ size: 9 }}>
              <TextFieldAtom props={props.field.value} />
            </GridLayout>
          </GridLayout>
          {/* Prompt Forms */}
          <GridLayout style={{ size: 9 }}>
            <GridLayout style={{ size: 2 }}>
              <LabelAtom props={props.label.prompt} />
            </GridLayout>
            <GridLayout style={{ size: 10 }}>
              <TextFieldAtom props={props.field.prompt} />
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
