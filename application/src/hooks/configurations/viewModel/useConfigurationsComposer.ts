"use client";

import { NavItem } from "@/components/atoms/DrawerAtom";
import { ConfigurationsContexts } from "@/hooks/configurations/state/useConfigurationsContext";
import { useConfigurationsProperties } from "@/hooks/configurations/viewModel/useConfigurationsProperties";
import { useConfigurationsHandlers } from "@/hooks/configurations/viewModel/useConfigurationsHandlers";

export interface ConfigurationsViewModel {
  navigationLayout: {
    title: string;
    drawerOpen: boolean;
    navItems: NavItem[];
    activePath: string;
    onMenuOpen: () => void;
    onDrawerClose: () => void;
    onNavigate: (href: string) => void;
  };
}

export function useConfigurationsComposer(contexts: ConfigurationsContexts) {
  const { properties: _properties } = useConfigurationsProperties(contexts);
  const { handlers: _handlers } = useConfigurationsHandlers(contexts);

  return {
    viewModel: {
      navigationLayout: {
        // NavigationLayout のスタブ実装（工程2〜3で実際の値に置き換える）
        title: "ACMN",
        drawerOpen: false,
        navItems: [],
        activePath: "",
        onMenuOpen: () => {},
        onDrawerClose: () => {},
        onNavigate: () => {},
      },
    } satisfies ConfigurationsViewModel,
  };
}
