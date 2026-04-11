import { LabelAtom } from "@/components/atoms/display/LabelAtom";
import { ButtonAtom } from "@/components/atoms/inputs/ButtonAtom";
import { IconButtonAtom } from "@/components/atoms/inputs/IconButtonAtom";
import { TextAreaAtom } from "@/components/atoms/inputs/TextAreaAtom";
import { TextFieldAtom } from "@/components/atoms/inputs/TextFieldAtom";
import { ExpandFrame } from "@/components/atoms/layout/ExpandFrame";
import { GridLayout } from "@/components/atoms/layout/GridLayout";
import { SectionLabel } from "@/components/molecules/SectionLabel";
import { postingClerkTheme } from "@/theme/postingClerk";
import {
  ButtonAtomType,
  IconButtonAtomType,
  LabelAtomType,
  TextAreaAtomType,
  TextFieldAtomType,
} from "@/types/ui";

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
    <>
      <SectionLabel props={props.postingPreviewLabel} />
      <GridLayout style={{ size: "CONTAINER" }}>
        {props.platformPreviews.map((platform) => (
          <GridLayout style={{ size: 12 }} key={platform.key}>
            <ExpandFrame props={platform.frame}>
              <GridLayout style={{ size: "CONTAINER" }}>
                <GridLayout style={{ size: 12 }}>
                  <GridLayout style={{ size: 10 }}>
                    <LabelAtom
                      props={platform.titleLabel}
                      style={postingClerkTheme.fieldLabel}
                    />
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
                    <LabelAtom
                      props={platform.descLabel}
                      style={postingClerkTheme.fieldLabel}
                    />
                  </GridLayout>
                  <GridLayout style={{ size: 2 }}>
                    <ButtonAtom
                      props={platform.descCopyButton}
                      style={postingClerkTheme.standardButton}
                    />
                  </GridLayout>
                </GridLayout>

                <GridLayout style={{ size: 12 }}>
                  <GridLayout style={{ size: 10 }}>
                    <LabelAtom
                      props={platform.urlsLabel}
                      style={postingClerkTheme.fieldLabel}
                    />
                  </GridLayout>
                  <GridLayout style={{ size: 2 }}>
                    <ButtonAtom
                      props={platform.urlsAddButton}
                      style={postingClerkTheme.standardButton}
                    />
                  </GridLayout>
                  <GridLayout style={{ size: 12 }}>
                    {platform.urlItems.map((urlItem) => (
                      <GridLayout style={{ size: 12 }} key={urlItem.key}>
                        <GridLayout style={{ size: 5 }}>
                          <GridLayout style={{ size: 2 }}>
                            <LabelAtom
                              props={urlItem.nameLabel}
                              style={postingClerkTheme.fieldLabel}
                            />
                          </GridLayout>
                          <GridLayout style={{ size: 10 }}>
                            <TextFieldAtom props={urlItem.nameField} />
                          </GridLayout>
                        </GridLayout>
                        <GridLayout style={{ size: 6 }}>
                          <GridLayout style={{ size: 2 }}>
                            <LabelAtom
                              props={urlItem.urlLabel}
                              style={postingClerkTheme.fieldLabel}
                            />
                          </GridLayout>
                          <GridLayout style={{ size: 10 }}>
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
                  </GridLayout>
                </GridLayout>

                <GridLayout style={{ size: 12 }}>
                  <LabelAtom
                    props={platform.previewLabel}
                    style={postingClerkTheme.fieldLabel}
                  />
                </GridLayout>
                <GridLayout style={{ size: 12 }}>
                  <TextAreaAtom
                    props={{
                      ...platform.previewField,
                      rows: postingClerkTheme.previewRows,
                    }}
                  />
                </GridLayout>
              </GridLayout>
            </ExpandFrame>
          </GridLayout>
        ))}
      </GridLayout>
    </>
  );
}
