import { CONST } from "@/const/constants";
import { AppBarType } from "@/types/ui";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar } from "@mui/material";

export interface AppBarAtomProps {
  props: AppBarType;
  children: React.ReactNode;
}

export function AppBarAtom({ props, children }: AppBarAtomProps) {
  return (
    <AppBar position="fixed" sx={{ height: CONST.AppBar.height, zIndex: 9999 }}>
      <Toolbar sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={props.onMenuOpen}
          sx={{ paddingBottom: "0.75rem" }}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
        {children}
      </Toolbar>
    </AppBar>
  );
}
