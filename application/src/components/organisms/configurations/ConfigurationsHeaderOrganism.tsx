"use client";

import { Box, Stack } from "@mui/material";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { ButtonAtom } from "@/components/atoms/ButtonAtom";
import { SelectAtom } from "@/components/atoms/SelectAtom";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";

interface ConfigurationsHeaderOrganismProps {
  props: {
    isLoaded: boolean;
    sets: {
      options: string[];
      selectedSet: string;
      onSetChange: (value: string) => void;
      onLoad: () => void;
    };
    name: {
      nameValue: string;
      hasChanges: boolean;
      onNameBlur: (value: string) => void;
      onSave: () => void;
    };
  };
}

export function ConfigurationsHeaderOrganism({
  props,
}: ConfigurationsHeaderOrganismProps) {
  const { isLoaded, sets, name } = props;

  return (
    <Box sx={{ px: 2, pt: 1, pb: 0.5 }}>
      {!isLoaded ? (
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
          <LabelAtom props={{ text: "Sets:", variant: "body2" }} />
          <SelectAtom
            props={{
              value: sets.selectedSet,
              options: sets.options,
              onChange: sets.onSetChange,
              fullWidth: true,
            }}
          />
          <ButtonAtom props={{ label: "Load", onClick: sets.onLoad }} />
        </Stack>
      ) : (
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
          <LabelAtom props={{ text: "Name:", variant: "body2" }} />
          <TextFieldAtom
            props={{
              label: "Name",
              defaultValue: name.nameValue,
              onBlur: name.onNameBlur,
              fullWidth: true,
              size: "small",
            }}
          />
          {name.hasChanges && (
            <LabelAtom
              props={{
                text: "having some changes",
                variant: "body2",
                color: "text.secondary",
              }}
            />
          )}
          <ButtonAtom props={{ label: "Save", onClick: name.onSave }} />
        </Stack>
      )}
    </Box>
  );
}
