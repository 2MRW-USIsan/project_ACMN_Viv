import { CONST } from "@/const/constants";
import { AppBarType } from "@/types/components/ui";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, AppBar as MuiAppBar, Toolbar } from "@mui/material";

export interface AppBarProps {
  props: AppBarType;
  children: React.ReactNode;
}

export function AppBar({ props, children }: AppBarProps) {
  return (
    <MuiAppBar
      position="fixed"
      sx={{ height: CONST.AppBar.height, zIndex: 9999 }}
    >
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
    </MuiAppBar>
  );
}
