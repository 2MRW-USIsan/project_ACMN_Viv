"use client";

import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const APPBAR_HEIGHT = 64;

interface AppBarAtomProps {
  props: {
    title: string;
    onMenuOpen: () => void;
  };
}

export function AppBarAtom({ props }: AppBarAtomProps) {
  return (
    <AppBar position="fixed" sx={{ height: APPBAR_HEIGHT }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={props.onMenuOpen}
          sx={{ mr: 2 }}
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
