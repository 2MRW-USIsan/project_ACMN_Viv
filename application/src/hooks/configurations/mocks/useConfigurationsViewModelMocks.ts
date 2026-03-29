"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { NavItem } from "@/components/atoms/DrawerAtom";
import { ConfigurationsViewModel } from "@/hooks/configurations/viewModel/useConfigurationsComposer";

const NAV_ITEMS: NavItem[] = [
  { href: "/configurations", label: "Configurations" },
  { href: "/posting-clerk", label: "Posting Clerk" },
  { href: "/preset-builder", label: "Preset Builder" },
  { href: "/prompt-forger", label: "Prompt Forger" },
];

const MOCK_CONFIG_ITEMS = ["config-default", "config-production", "config-staging"];

interface ConfigurationsViewModelMocksReturns {
  viewModel: ConfigurationsViewModel;
}

export function useConfigurationsViewModelMocks(): ConfigurationsViewModelMocksReturns {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState(MOCK_CONFIG_ITEMS[0]);
  const [configEditValue, setConfigEditValue] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const handleMenuOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);
  const handleNavigate = (href: string) => {
    router.push(href);
    setDrawerOpen(false);
  };
  const handleConfigSelect = (item: string) => setSelectedConfig(item);
  const handleConfigEditBlur = (value: string) => setConfigEditValue(value);

  return {
    viewModel: {
      navigationLayout: {
        appBar: {
          title: "ACMN",
          onMenuOpen: handleMenuOpen,
        },
        drawer: {
          open: drawerOpen,
          onClose: handleDrawerClose,
        },
        navigation: {
          navItems: NAV_ITEMS,
          activePath: pathname,
          onNavigate: handleNavigate,
          configurations: {
            selectItems: MOCK_CONFIG_ITEMS,
            selectedItem: selectedConfig,
            onSelect: handleConfigSelect,
            editValue: configEditValue,
            onEditBlur: handleConfigEditBlur,
            onLoad: () => {},
            onNew: () => {},
            onSave: () => {},
            onChange: () => {},
            onDelete: () => {},
          },
        },
      },
    },
  };
}
