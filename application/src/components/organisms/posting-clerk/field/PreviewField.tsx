import { DividerAtom } from "@/components/atoms/display/DividerAtom";
import { postingClerkTheme } from "@/theme/postingClerk";
import {
  ButtonAtomType,
  IconButtonAtomType,
  LabelAtomType,
  TextAreaAtomType,
  TextFieldAtomType,
} from "@/types/ui";
import { LabelAtom } from "../../../atoms/display/LabelAtom";
import { ButtonAtom } from "../../../atoms/inputs/ButtonAtom";
import { IconButtonAtom } from "../../../atoms/inputs/IconButtonAtom";
import { TextAreaAtom } from "../../../atoms/inputs/TextAreaAtom";
import { TextFieldAtom } from "../../../atoms/inputs/TextFieldAtom";
import { AlignLayout } from "../../../atoms/layout/AlignLayout";
import { ExpandFrame } from "../../../atoms/layout/ExpandFrame";
import { GridLayout } from "../../../atoms/layout/GridLayout";
import { SectionLabel } from "../../../molecules/SectionLabel";

export type UrlItem = {
  key: string;
  nameLabel: LabelAtomType;
  nameField: TextFieldAtomType;
  urlLabel: LabelAtomType;
  urlField: TextFieldAtomType;
  removeButton: IconButtonAtomType;
};
export type PreviewItemType = {
  frame: {
    label: LabelAtomType;
    toggle: IconButtonAtomType;
    isExpanded: boolean;
  };
  titleLabel: LabelAtomType;
  titleCopyButton: ButtonAtomType;
  descLabel: LabelAtomType;
  descCopyButton: ButtonAtomType;
  urlsLabel: LabelAtomType;
  urlsAddButton: ButtonAtomType;
  urlItems: UrlItem[];
  previewField: TextAreaAtomType;
  key: string;
  previewLabel: LabelAtomType;
  sectionLabel: LabelAtomType;
};
export type PreviewFieldType = {
  postingPreviewLabel: LabelAtomType;
  platformPreviews: PreviewItemType[];
};
interface PreviewFieldProps {
  props: PreviewFieldType;
}
export function PreviewField({ props }: PreviewFieldProps) {
  return (
    <AlignLayout column={0.5}>
      <SectionLabel props={props.postingPreviewLabel} />
      <AlignLayout column={0.5}>
        {props.platformPreviews.map((platform) => (
          <ExpandFrame props={platform.frame} key={platform.key}>
            <AlignLayout column={0.5}>
              <GridLayout style={{ size: "CONTAINER" }}>
                <GridLayout style={{ size: 12 }}>
                  <GridLayout style={{ size: 10 }}>
                    <LabelAtom props={platform.titleLabel} style={"LABEL"} />
                  </GridLayout>
                  <GridLayout style={{ size: 2 }}>
                    <ButtonAtom
                      props={platform.titleCopyButton}
                      style={postingClerkTheme.standardButton}
                    />
                  </GridLayout>
                </GridLayout>
                <GridLayout style={{ size: 12 }}>
                  <GridLayout style={{ size: 10 }}>
                    <LabelAtom props={platform.descLabel} style={"LABEL"} />
                  </GridLayout>
                  <GridLayout style={{ size: 2 }}>
                    <ButtonAtom
                      props={platform.descCopyButton}
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
              <GridLayout style={{ size: "CONTAINER" }}>
                <AlignLayout column={0.1}>
                  <GridLayout style={{ size: "CONTAINER" }}>
                    <GridLayout style={{ size: 12 }}>
                      <GridLayout style={{ size: 10 }}>
                        <LabelAtom props={platform.urlsLabel} style={"LABEL"} />
                      </GridLayout>
                      <GridLayout style={{ size: 2 }}>
                        <ButtonAtom
                          props={platform.urlsAddButton}
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

                  {platform.urlItems.map((urlItem) => (
                    <GridLayout style={{ size: "CONTAINER" }} key={urlItem.key}>
                      <GridLayout style={{ size: 4 }}>
                        <GridLayout style={{ size: 3 }}>
                          <LabelAtom
                            props={urlItem.nameLabel}
                            style={"LABEL"}
                          />
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

              <GridLayout style={{ size: "CONTAINER" }}>
                <GridLayout style={{ size: 12 }}>
                  <AlignLayout column={0.5}>
                    <LabelAtom props={platform.previewLabel} style={"LABEL"} />
                    <TextAreaAtom
                      props={platform.previewField}
                      style={{ rows: 8 }}
                    />
                  </AlignLayout>
                </GridLayout>
              </GridLayout>
            </AlignLayout>
          </ExpandFrame>
        ))}
      </AlignLayout>
    </AlignLayout>
  );
}
