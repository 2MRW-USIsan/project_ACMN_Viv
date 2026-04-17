import { DividerAtom } from "@/components/atoms/display/DividerAtom";
import { LabelAtom } from "@/components/atoms/display/LabelAtom";
import { ChipCheckboxAtom } from "@/components/atoms/inputs/ChipCheckboxAtom";
import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { GridLayout } from "@/components/atoms/layout/GridLayout";
import { SectionSelectorProps } from "@/types/configurations/blocs";

export function SectionSelector({ props }: SectionSelectorProps) {
  return (
    <AlignLayout column={0.1}>
      <GridLayout style={{ size: "CONTAINER" }}>
        <GridLayout style={{ size: 3 }}>
          <LabelAtom
            props={props.label.sectionSelect}
            style={"HEADER"}
            primary
          />
        </GridLayout>
        {props.sectionSelect.map((section) => (
          <GridLayout style={{ size: 2 }} key={section.key}>
            <ChipCheckboxAtom props={section.props} />
          </GridLayout>
        ))}
      </GridLayout>
      <DividerAtom />
    </AlignLayout>
  );
}
