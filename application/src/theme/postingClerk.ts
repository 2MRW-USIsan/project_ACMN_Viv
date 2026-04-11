import { LabelAtomType, ButtonAtomType, IconButtonAtomType } from "@/types/ui";

type LabelStyleType = NonNullable<LabelAtomType["style"]>;
type ButtonStyleType = NonNullable<ButtonAtomType["style"]>;
type IconButtonStyleType = NonNullable<IconButtonAtomType["style"]>;

export const postingClerkTheme = {
  sectionLabel: { size: "LABEL", color: "text.primary" } satisfies LabelStyleType,
  fieldLabel: { size: "CAPTION", color: "text.secondary" } satisfies LabelStyleType,
  standardButton: { shape: "OUTLINED", color: "PRIMARY", size: "NORMAL" } satisfies ButtonStyleType,
  smallIconButton: { color: "DEFAULT", size: "SMALL" } satisfies IconButtonStyleType,
  previewRows: 8,
};
