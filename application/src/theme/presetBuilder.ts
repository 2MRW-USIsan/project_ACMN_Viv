import { ButtonAtomType } from "@/types/ui";

type ButtonStyleType = NonNullable<ButtonAtomType["style"]>;

export const presetBuilderTheme = {
  standardButton: {
    shape: "OUTLINED",
    color: "PRIMARY",
    size: "NORMAL",
  } satisfies ButtonStyleType,
};
