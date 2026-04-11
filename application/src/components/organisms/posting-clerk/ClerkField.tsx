import { LabelAtom } from "@/components/atoms/display/LabelAtom";
import { TextFieldAtom } from "@/components/atoms/inputs/TextFieldAtom";
import { postingClerkTheme } from "@/theme/postingClerk";
import { LabelAtomType, TextFieldAtomType } from "@/types/ui";
import { Box, Stack } from "@mui/material";

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
    <Stack spacing={1} pl={2}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <LabelAtom
          props={props.titleJpLabel}
          style={postingClerkTheme.fieldLabel}
        />
        <Box sx={{ flex: 1, maxWidth: 400 }}>
          <TextFieldAtom props={props.titleJpField} />
        </Box>
      </Stack>

      <Stack direction="row" alignItems="center" spacing={1}>
        <LabelAtom
          props={props.titleEnLabel}
          style={postingClerkTheme.fieldLabel}
        />
        <Box sx={{ flex: 1, maxWidth: 400 }}>
          <TextFieldAtom props={props.titleEnField} />
        </Box>
      </Stack>

      <Stack direction="row" alignItems="center" spacing={1}>
        <LabelAtom
          props={props.symbolLabel}
          style={postingClerkTheme.fieldLabel}
        />
        <Box sx={{ width: 80 }}>
          <TextFieldAtom props={props.symbolField} />
        </Box>
        <LabelAtom
          props={props.picsLabel}
          style={postingClerkTheme.fieldLabel}
        />
        <Box sx={{ width: 80 }}>
          <TextFieldAtom props={props.picsField} />
        </Box>
      </Stack>
    </Stack>
  );
}
