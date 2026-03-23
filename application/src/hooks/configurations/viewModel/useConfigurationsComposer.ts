"use client";

import { NavItem } from "@/types/navigation";
import { ConfigurationsContexts } from "@/hooks/configurations/state/useConfigurationsContext";
import { useConfigurationsProperties } from "@/hooks/configurations/viewModel/useConfigurationsProperties";
import { useConfigurationsHandlers } from "@/hooks/configurations/viewModel/useConfigurationsHandlers";

export interface ConfigurationsViewModel {
  navigation: {
    appBarTitle: string;
    isDrawerOpen: boolean;
    navItems: NavItem[];
    onMenuClick: () => void;
    onNavItemClick: (href: string) => void;
  };
}

export function useConfigurationsComposer(contexts: ConfigurationsContexts) {
  const { properties } = useConfigurationsProperties(contexts);
  const { handlers } = useConfigurationsHandlers(contexts);

  return {
    viewModel: {
      navigation: {
        appBarTitle: properties.navTitle,
        isDrawerOpen: properties.isDrawerOpen,
        navItems: properties.navItems,
        onMenuClick: handlers.onDrawerToggle,
        onNavItemClick: handlers.onNavItemClick,
      },
    } satisfies ConfigurationsViewModel,
  };
}
