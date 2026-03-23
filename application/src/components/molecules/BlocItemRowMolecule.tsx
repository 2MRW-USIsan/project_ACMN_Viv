"use client";

import { Box, Stack } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { IconButtonAtom } from "@/components/atoms/IconButtonAtom";

interface BlocItemRowMoleculeProps {
  props: {
    shortLabel: string;
    longLabel: string;
    isExpanded: boolean;
    onShortLabelChange: (value: string) => void;
    onLongLabelChange: (value: string) => void;
    onRemove: () => void;
    onToggleExpand: () => void;
  };
}

export function BlocItemRowMolecule({ props }: BlocItemRowMoleculeProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ px: 2, py: 0.5 }}>
      <Box sx={{ flexShrink: 0 }}>
        <LabelAtom props={{ text: "Bloc Item:", variant: "body2" }} />
      </Box>
      <TextFieldAtom
        props={{
          label: "Label",
          defaultValue: props.shortLabel,
          onBlur: props.onShortLabelChange,
          size: "small",
        }}
      />
      <TextFieldAtom
        props={{
          label: "Label",
          defaultValue: props.longLabel,
          onBlur: props.onLongLabelChange,
          size: "small",
          fullWidth: true,
        }}
      />
      <IconButtonAtom
        props={{
          icon: <RemoveCircleOutlineIcon />,
          onClick: props.onRemove,
        }}
      />
      <IconButtonAtom
        props={{
          icon: props.isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />,
          onClick: props.onToggleExpand,
        }}
      />
    </Stack>
  );
}
