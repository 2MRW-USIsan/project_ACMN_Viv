import { LabelAtom } from "@/components/atoms/display/LabelAtom";
import { TextFieldAtom } from "@/components/atoms/inputs/TextFieldAtom";
import { GridLayout } from "@/components/atoms/layout/GridLayout";
import { postingClerkTheme } from "@/theme/postingClerk";
import { LabelAtomType, TextFieldAtomType } from "@/types/ui";

export type ClerkFieldType = {
  titleJpLabel: LabelAtomType;
  titleJpField: TextFieldAtomType;
  titleEnLabel: LabelAtomType;
  titleEnField: TextFieldAtomType;
  symbolLabel: LabelAtomType;
  symbolField: TextFieldAtomType;
  picsLabel: LabelAtomType;
  picsField: TextFieldAtomType;
};
interface ClerkFieldProps {
  props: ClerkFieldType;
}
export function ClerkField({ props }: ClerkFieldProps) {
  return (
    <GridLayout style={{ size: "CONTAINER" }}>
      <GridLayout style={{ size: 12 }}>
        <GridLayout style={{ size: 2 }}>
          <LabelAtom
            props={props.titleJpLabel}
            style={postingClerkTheme.fieldLabel}
          />
        </GridLayout>
        <GridLayout style={{ size: 10 }}>
          <TextFieldAtom props={props.titleJpField} />
        </GridLayout>
      </GridLayout>
      <GridLayout style={{ size: 12 }}>
        <GridLayout style={{ size: 2 }}>
          <LabelAtom
            props={props.titleEnLabel}
            style={postingClerkTheme.fieldLabel}
          />
        </GridLayout>
        <GridLayout style={{ size: 10 }}>
          <TextFieldAtom props={props.titleEnField} />
        </GridLayout>
      </GridLayout>
      <GridLayout style={{ size: 12 }}>
        <GridLayout style={{ size: 6 }}>
          <GridLayout style={{ size: 2 }}>
            <LabelAtom
              props={props.symbolLabel}
              style={postingClerkTheme.fieldLabel}
            />
          </GridLayout>
          <GridLayout style={{ size: 2 }}>
            <TextFieldAtom props={props.symbolField} />
          </GridLayout>
        </GridLayout>
        <GridLayout style={{ size: 6 }}>
          <GridLayout style={{ size: 2 }}>
            <LabelAtom
              props={props.picsLabel}
              style={postingClerkTheme.fieldLabel}
            />
          </GridLayout>
          <GridLayout style={{ size: 2 }}>
            <TextFieldAtom props={props.picsField} />
          </GridLayout>
        </GridLayout>
      </GridLayout>
    </GridLayout>
  );
}
