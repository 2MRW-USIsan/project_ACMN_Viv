"use client";

import { ListItem, ListItemButton, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface AddPanelButtonAtomProps {
  props: {
    onAdd: () => void;
    hasItems: boolean;
    label: string;
  };
}

export function AddPanelButtonAtom({ props }: AddPanelButtonAtomProps) {
  return (
    <ListItem disablePadding sx={{ mt: props.hasItems ? 1 : 0 }}>
      <ListItemButton
        onClick={props.onAdd}
        aria-label={props.label ?? "Add panel"}
        sx={{ justifyContent: "center" }}
      >
        <Stack direction="row" alignItems="center" justifyContent="center" gap={0.5}>
          <AddIcon />
          <Typography variant="body2">{props.label}</Typography>
        </Stack>
      </ListItemButton>
    </ListItem>
  );
}
