

import { CONST } from "@/const/constants";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import { AppBarAtomType } from "@/types/ui";

export interface AppBarAtomProps {
  props: AppBarAtomType;
  children: React.ReactNode;
}

export function AppBarAtom({ props, children }: AppBarAtomProps) {
  return (
    <AppBar position="fixed" sx={{ height: CONST.AppBar.height }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="primary"
          aria-label="menu"
          onClick={props.onMenuOpen}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        {children}
      </Toolbar>
    </AppBar>
  );
}
