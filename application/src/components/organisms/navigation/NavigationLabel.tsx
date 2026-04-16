import { DividerAtom } from "@/components/atoms/display/DividerAtom";
import { LabelAtom } from "@/components/atoms/display/LabelAtom";
import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { GridLayout } from "@/components/atoms/layout/GridLayout";
import { NavigationLabelType } from "@/types/navigation";
import { CheckMark } from "../../atoms/display/CheckMark";
import { NavMark } from "../../atoms/display/NavMark";

interface NavigationLabelProps {
  props: NavigationLabelType;
}
export function NavigationLabel({ props }: NavigationLabelProps) {
  return (
    <GridLayout style={{ size: 6 }}>
      <AlignLayout column={1}>
        <AlignLayout>
          {props.isCurrent ? <CheckMark /> : <NavMark />}
          <LabelAtom
            props={props.title}
            style={props.isCurrent ? "HEADER" : "LABEL"}
            primary={!props.isCurrent}
          />
        </AlignLayout>
        <DividerAtom />
      </AlignLayout>
    </GridLayout>
  );
}
