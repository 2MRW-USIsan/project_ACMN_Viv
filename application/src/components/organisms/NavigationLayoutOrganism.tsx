"use client";

import { Box } from "@mui/material";
import { AppBarAtom, APPBAR_HEIGHT } from "@/components/atoms/AppBarAtom";
import { DrawerAtom, NavItem } from "@/components/atoms/DrawerAtom";

interface NavigationLayoutOrganismProps {
  props: {
    title: string;
    drawerOpen: boolean;
    navItems: NavItem[];
    activePath: string;
    onMenuOpen: () => void;
    onDrawerClose: () => void;
    onNavigate: (href: string) => void;
  };
  children?: React.ReactNode;
}

export function NavigationLayoutOrganism({
  props,
  children,
}: NavigationLayoutOrganismProps) {
  return (
    <>
      <AppBarAtom props={{ title: props.title, onMenuOpen: props.onMenuOpen }} />
      <DrawerAtom
        props={{
          open: props.drawerOpen,
          onClose: props.onDrawerClose,
          navItems: props.navItems,
          activePath: props.activePath,
          onNavigate: props.onNavigate,
        }}
      />
      <Box component="main" sx={{ mt: `${APPBAR_HEIGHT}px` }}>
        {children}
      </Box>
    </>
  );
}
