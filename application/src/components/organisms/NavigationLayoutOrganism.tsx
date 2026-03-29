"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Box } from "@mui/material";
import { AppBarAtom, APPBAR_HEIGHT } from "@/components/atoms/AppBarAtom";
import { DrawerAtom, NavItem } from "@/components/atoms/DrawerAtom";

const NAV_ITEMS: NavItem[] = [
  { href: "/configurations", label: "Configurations" },
  { href: "/posting-clerk", label: "Posting Clerk" },
  { href: "/preset-builder", label: "Preset Builder" },
  { href: "/prompt-forger", label: "Prompt Forger" },
];

interface NavigationLayoutOrganismProps {
  children: React.ReactNode;
}

export function NavigationLayoutOrganism({
  children,
}: NavigationLayoutOrganismProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleMenuOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);
  const handleNavigate = (href: string) => {
    router.push(href);
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBarAtom props={{ title: "ACMN", onMenuOpen: handleMenuOpen }} />
      <DrawerAtom
        props={{
          open: drawerOpen,
          onClose: handleDrawerClose,
          navItems: NAV_ITEMS,
          activePath: pathname,
          onNavigate: handleNavigate,
        }}
      />
      <Box component="main" sx={{ mt: `${APPBAR_HEIGHT}px` }}>
        {children}
      </Box>
    </>
  );
}
