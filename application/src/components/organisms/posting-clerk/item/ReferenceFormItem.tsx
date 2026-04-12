import { DividerAtom } from "@/components/atoms/display/DividerAtom";
import { LabelAtom } from "@/components/atoms/display/LabelAtom";
import { ButtonAtom } from "@/components/atoms/inputs/ButtonAtom";
import { IconButtonAtom } from "@/components/atoms/inputs/IconButtonAtom";
import { TextFieldAtom } from "@/components/atoms/inputs/TextFieldAtom";
import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { GridLayout } from "@/components/atoms/layout/GridLayout";
import { postingClerkTheme } from "@/theme/postingClerk";
import { ReferenceFormItemType } from "@/types/posting-clerk";
interface ReferenceFormItemProps {
  props: ReferenceFormItemType;
}
export function ReferenceFormItem({ props }: ReferenceFormItemProps) {
  return (
    <GridLayout style={{ size: "CONTAINER" }}>
      <AlignLayout column={0.1}>
        <GridLayout style={{ size: "CONTAINER" }}>
          <GridLayout style={{ size: 12 }}>
            <GridLayout style={{ size: 10 }}>
              <LabelAtom props={props.urlsLabel} style={"LABEL"} />
            </GridLayout>
            <GridLayout style={{ size: 2 }}>
              <ButtonAtom
                props={props.urlsAddButton}
                style={postingClerkTheme.standardButton}
              />
            </GridLayout>
          </GridLayout>
          <GridLayout style={{ size: 12 }}>
            <AlignLayout column={0.1}>
              <DividerAtom />
            </AlignLayout>
          </GridLayout>
        </GridLayout>

        {props.urlItems.map((urlItem) => (
          <GridLayout style={{ size: "CONTAINER" }} key={urlItem.key}>
            <GridLayout style={{ size: 4 }}>
              <GridLayout style={{ size: 3 }}>
                <LabelAtom props={urlItem.nameLabel} style={"LABEL"} />
              </GridLayout>
              <GridLayout style={{ size: 9 }}>
                <TextFieldAtom props={urlItem.nameField} />
              </GridLayout>
            </GridLayout>
            <GridLayout style={{ size: 7 }}>
              <GridLayout style={{ size: 3 }}>
                <LabelAtom props={urlItem.urlLabel} style={"LABEL"} />
              </GridLayout>
              <GridLayout style={{ size: 9 }}>
                <TextFieldAtom props={urlItem.urlField} />
              </GridLayout>
            </GridLayout>
            <GridLayout style={{ size: 1 }}>
              <IconButtonAtom
                props={urlItem.removeButton}
                style={postingClerkTheme.smallIconButton}
              />
            </GridLayout>
          </GridLayout>
        ))}
      </AlignLayout>
    </GridLayout>
  );
}
