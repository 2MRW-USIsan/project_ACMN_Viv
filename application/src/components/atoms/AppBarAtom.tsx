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
    <AppBar>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={props.onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div">
          {props.title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
