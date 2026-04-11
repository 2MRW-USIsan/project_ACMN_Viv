import { LabelAtom } from "@/components/atoms/display/LabelAtom";
import { ButtonAtom } from "@/components/atoms/inputs/ButtonAtom";
import { TextFieldAtom } from "@/components/atoms/inputs/TextFieldAtom";
import { GridLayout } from "@/components/atoms/layout/GridLayout";
import { SectionLabel } from "@/components/molecules/SectionLabel";
import { postingClerkTheme } from "@/theme/postingClerk";
import { ButtonAtomType, LabelAtomType, TextFieldAtomType } from "@/types/ui";

export interface InformSectionType {
  infoSectionLabel: LabelAtomType;
  idLabel: LabelAtomType;
  idValueLabel: LabelAtomType;
  titleLabel: LabelAtomType;
  titleField: Pick<
    TextFieldAtomType,
    "placeholder" | "value" | "onChange" | "label"
  >;
  statusLabel: LabelAtomType;
  statusValueLabel: LabelAtomType;
  saveButton: Pick<
    ButtonAtomType,
    "label" | "onClick" | "disabled" | "isLoading"
  >;
}

interface InformSectionProps {
  props: InformSectionType;
}

export function InformSection({ props }: InformSectionProps) {
  return (
    <>
      <SectionLabel props={props.infoSectionLabel} />
      <GridLayout style={{ size: "CONTAINER" }}>
        <GridLayout style={{ size: 12 }}>
          <GridLayout style={{ size: 3 }}>
            <LabelAtom
              props={props.idLabel}
              style={postingClerkTheme.fieldLabel}
            />
          </GridLayout>
          <GridLayout style={{ size: 9 }}>
            <LabelAtom
              props={props.idValueLabel}
              style={postingClerkTheme.fieldLabel}
            />
          </GridLayout>
        </GridLayout>
        <GridLayout style={{ size: 12 }}>
          <GridLayout style={{ size: 3 }}>
            <LabelAtom
              props={props.titleLabel}
              style={postingClerkTheme.fieldLabel}
            />
          </GridLayout>
          <GridLayout style={{ size: 9 }}>
            <TextFieldAtom props={props.titleField} />
          </GridLayout>
        </GridLayout>
        <GridLayout style={{ size: 12 }}>
          <GridLayout style={{ size: 3 }}>
            <LabelAtom
              props={props.statusLabel}
              style={postingClerkTheme.fieldLabel}
            />
          </GridLayout>
          <GridLayout style={{ size: 6 }}>
            <LabelAtom
              props={props.statusValueLabel}
              style={postingClerkTheme.fieldLabel}
            />
          </GridLayout>
          <GridLayout style={{ size: 3 }}>
            <ButtonAtom
              props={props.saveButton}
              style={postingClerkTheme.standardButton}
            />
          </GridLayout>
        </GridLayout>
      </GridLayout>
    </>
  );
}
