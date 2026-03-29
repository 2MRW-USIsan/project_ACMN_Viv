"use client";

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

export interface NavItem {
  href: string;
  label: string;
}

interface DrawerAtomProps {
  props: {
    open: boolean;
    onClose: () => void;
    navItems: NavItem[];
    activePath: string;
    onNavigate: (href: string) => void;
  };
}

export function DrawerAtom({ props }: DrawerAtomProps) {
  return (
    <Drawer anchor="left" open={props.open} onClose={props.onClose}>
      <List sx={{ width: 240 }}>
        {props.navItems.map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton
              selected={props.activePath === item.href}
              onClick={() => props.onNavigate(item.href)}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
