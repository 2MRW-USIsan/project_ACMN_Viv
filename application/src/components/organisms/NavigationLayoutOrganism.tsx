"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Box, Toolbar } from "@mui/material";
import { AppBarAtom } from "@/components/atoms/AppBarAtom";
import { DrawerAtom } from "@/components/atoms/DrawerAtom";
import { NavigationOrganism } from "@/components/organisms/NavigationOrganism";

const APP_TITLE = "ACMN Viv";

const NAV_ITEMS = [
  { href: "/configurations", label: "Configurations" },
  { href: "/posting-clerk", label: "Posting Clerk" },
  { href: "/preset-builder", label: "Preset Builder" },
  { href: "/prompt-forger", label: "Prompt Forger" },
  { href: "/sample", label: "Sample" },
];

type ConfigurationsNavigation = {
  configOptions: string[];
  selectedConfig: string;
  onConfigSelect: (config: string) => void;
  form: {
    name: string;
    value: string;
    onNameChange: (name: string) => void;
    onValueChange: (value: string) => void;
    onSave: () => void;
    onCancel: () => void;
    isLoading: boolean;
  };
};

interface NavigationLayoutOrganismProps {
  props: {
    configurations?: ConfigurationsNavigation;
  };
  children: React.ReactNode;
}

export function NavigationLayoutOrganism({ props, children }: NavigationLayoutOrganismProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <AppBarAtom
        props={{
          title: APP_TITLE,
          onMenuClick: () => setDrawerOpen(true),
        }}
      />
      <DrawerAtom
        props={{ open: drawerOpen, onClose: () => setDrawerOpen(false) }}
      >
        <NavigationOrganism
          props={{
            navItems: NAV_ITEMS,
            currentPath: pathname,
            configurations: props.configurations,
          }}
        />
      </DrawerAtom>
      <Box component="main">
        <Toolbar />
        {children}
      </Box>
    </>
  );
}
