"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { ReactNode } from "react";
import { AppBarAtom } from "@/components/atoms/AppBarAtom";
import { DrawerAtom } from "@/components/atoms/DrawerAtom";

const NAV_ITEMS = [
  { href: "/configurations", label: "Configurations" },
  { href: "/preset-builder", label: "Preset-Builder" },
  { href: "/prompt-forger", label: "Prompt-Forger" },
  { href: "/posting-clerk", label: "Posting-Clerk" },
] as const;

const DRAWER_WIDTH = 240;
const APPBAR_HEIGHT = 64;

interface NavigationLayoutOrganismProps {
  props: {
    title: string;
  };
  children?: ReactNode;
}

export function NavigationLayoutOrganism({
  props,
  children,
}: NavigationLayoutOrganismProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBarAtom
        props={{ title: props.title, onMenuClick: () => setDrawerOpen(true) }}
      />
      <DrawerAtom
        props={{ open: drawerOpen, onClose: () => setDrawerOpen(false) }}
      >
        <Box sx={{ width: DRAWER_WIDTH }} role="presentation">
          <List>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <ListItem key={item.href} disablePadding>
                  <ListItemButton
                    component={Link}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                  >
                    {isActive && (
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckIcon color="success" fontSize="small" />
                      </ListItemIcon>
                    )}
                    <ListItemText
                      primary={item.label}
                      inset={!isActive}
                      slotProps={{
                        primary: {
                          color: isActive ? "text.primary" : "text.secondary",
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </DrawerAtom>
      <Box component="main" sx={{ flexGrow: 1, mt: `${APPBAR_HEIGHT}px` }}>
        {children}
      </Box>
    </Box>
  );
}
