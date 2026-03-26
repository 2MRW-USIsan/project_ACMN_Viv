"use client";

import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface AppBarAtomProps {
  props: {
    title: string;
    onMenuClick: () => void;
  };
}

export function AppBarAtom({ props }: AppBarAtomProps) {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={props.onMenuClick}
          sx={{ mr: 1 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          {props.title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
