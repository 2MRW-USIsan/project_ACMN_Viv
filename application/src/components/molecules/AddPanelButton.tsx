import { LabelAtomType } from "@/types/ui";
import { LabelAtom } from "../atoms/display/LabelAtom";
import { PlusMark } from "../atoms/display/PlusMark";
import { AlignLayout } from "../atoms/layout/AlignLayout";
import { PanelItem } from "../atoms/layout/PanelItem";

export type AddPanelButtonType = {
  label: LabelAtomType;
  onClick: () => void;
};
interface AddPanelButtonProps {
  props: AddPanelButtonType;
}
export function AddPanelButton({ props }: AddPanelButtonProps) {
  return (
    <AlignLayout style={"CENTER"}>
      <PanelItem props={{ onClick: props.onClick }}>
        <AlignLayout style={"CENTER"}>
          <LabelAtom props={props.label} style={"LABEL"} primary />
          <PlusMark />
        </AlignLayout>
      </PanelItem>
    </AlignLayout>
  );
}
