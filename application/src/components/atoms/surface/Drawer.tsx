import { DrawerType } from "@/types/components/ui";
import { List, Drawer as MuiDrawer, Toolbar } from "@mui/material";

export interface DrawerAtomProps {
  props: DrawerType;
  children?: React.ReactNode;
}

export function Drawer({ props, children }: DrawerAtomProps) {
  return (
    <MuiDrawer anchor="left" open={props.open} onClose={props.onClose}>
      <Toolbar />
      <List sx={{ width: 240 }}>{children}</List>
    </MuiDrawer>
  );
}
