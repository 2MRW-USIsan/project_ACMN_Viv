import { ConfigPanelFormType } from "@/types/components/ui";
import { DeletionMark } from "../atoms/display/DeletionMark";
import { ExpandMark } from "../atoms/display/ExpandMark";
import { Label } from "../atoms/display/Label";
import { TextField } from "../atoms/inputs/TextField";
import { AlignLayout } from "../atoms/layout/AlignLayout";
import { GridLayout } from "../atoms/layout/GridLayout";
import { PanelItem } from "../atoms/layout/PanelItem";

interface ConfigPanelFormProps {
  props: ConfigPanelFormType;
}
export function ConfigPanelForm({ props }: ConfigPanelFormProps) {
  return (
    <GridLayout style={"CONTAINER"}>
      <PanelItem props={props.onToggle}>
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
            {/* Key Forms */}
            <GridLayout style={4}>
              <GridLayout style={3}>
                <Label props={props.label.key} />
              </GridLayout>
              <GridLayout style={9}>
                <TextField props={props.field.key} />
              </GridLayout>
            </GridLayout>
            {/* Value Forms */}
            <GridLayout style={8}>
              <GridLayout style={2}>
                <Label props={props.label.value} />
              </GridLayout>
              <GridLayout style={10}>
                <TextField props={props.field.value} />
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
        {/* Icon */}
        <GridLayout style={1}>
          <AlignLayout style={"END"}>
            <ExpandMark props={props.isExpanded} />
          </AlignLayout>
        </GridLayout>
      </PanelItem>
    </GridLayout>
  );
}
