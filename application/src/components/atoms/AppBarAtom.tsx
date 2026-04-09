"use client";

import { CONST } from "@/const/constants";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

interface AppBarAtomProps {
  props: {
    title: string;
    onMenuOpen: () => void;
  };
}

export function AppBarAtom({ props }: AppBarAtomProps) {
  return (
    <AppBar position="fixed" sx={{ height: CONST.AppBar.height }}>
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
