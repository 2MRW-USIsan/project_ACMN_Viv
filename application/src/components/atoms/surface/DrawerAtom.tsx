import { Drawer, List, Toolbar } from "@mui/material";
import { DrawerType } from "@/types/ui";

export interface NavItem {
  href: string;
  label: string;
}

export interface DrawerAtomProps {
  props: DrawerType;
  children?: React.ReactNode;
}

export function DrawerAtom({ props, children }: DrawerAtomProps) {
  return (
    <Drawer anchor="left" open={props.open} onClose={props.onClose}>
      <Toolbar />
      <List sx={{ width: 240 }}>{children}</List>
    </Drawer>
  );
}
