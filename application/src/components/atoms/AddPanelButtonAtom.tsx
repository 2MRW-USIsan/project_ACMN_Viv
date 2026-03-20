"use client";

import { ListItem, ListItemButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface AddPanelButtonAtomProps {
  props: {
    onAdd: () => void;
    hasItems: boolean;
  };
}

export function AddPanelButtonAtom({ props }: AddPanelButtonAtomProps) {
  return (
    <ListItem disablePadding sx={{ mt: props.hasItems ? 1 : 0 }}>
      <ListItemButton
        onClick={props.onAdd}
        aria-label="Add panel"
        sx={{ justifyContent: "center" }}
      >
        <Stack direction="row" alignItems="center" justifyContent="center">
          <AddIcon />
        </Stack>
      </ListItemButton>
    </ListItem>
  );
}
