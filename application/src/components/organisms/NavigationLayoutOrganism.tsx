"use client";
import { Box, List } from "@mui/material";
import { NavItem } from "@/types/navigation";
import { AppBarAtom } from "@/components/atoms/AppBarAtom";
import { DrawerAtom } from "@/components/atoms/DrawerAtom";
import { NavItemAtom } from "@/components/atoms/NavItemAtom";

interface NavigationLayoutOrganismProps {
  props: {
    appBarTitle: string;
    isDrawerOpen: boolean;
    navItems: NavItem[];
    onMenuClick: () => void;
    onNavItemClick: (href: string) => void;
  };
  children?: React.ReactNode;
}

export function NavigationLayoutOrganism({
  props,
  children,
}: NavigationLayoutOrganismProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <AppBarAtom
        props={{ title: props.appBarTitle, onMenuClick: props.onMenuClick }}
      />
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <DrawerAtom props={{ open: props.isDrawerOpen }}>
          <List>
            {props.navItems.map((item) => (
              <NavItemAtom
                key={item.href}
                props={{
                  label: item.label,
                  isActive: item.isActive,
                  onClick: () => props.onNavItemClick(item.href),
                }}
              />
            ))}
          </List>
        </DrawerAtom>
        <Box sx={{ flex: 1, overflow: "auto" }}>{children}</Box>
      </Box>
    </Box>
  );
}
