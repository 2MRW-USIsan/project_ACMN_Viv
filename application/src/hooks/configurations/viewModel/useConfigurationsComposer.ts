"use client";

import { NavItem } from "@/components/atoms/DrawerAtom";
import { NavigationConfigurations } from "@/components/organisms/NavigationOrganism";
import { ConfigurationsContexts } from "@/hooks/configurations/state/useConfigurationsContext";
import { useConfigurationsProperties } from "@/hooks/configurations/viewModel/useConfigurationsProperties";
import { useConfigurationsHandlers } from "@/hooks/configurations/viewModel/useConfigurationsHandlers";

export interface ConfigurationsViewModel {
  navigationLayout: {
    appBar: {
      title: string;
      onMenuOpen: () => void;
    };
    drawer: {
      open: boolean;
      onClose: () => void;
      navItems: NavItem[];
      activePath: string;
      onNavigate: (href: string) => void;
      configurations?: NavigationConfigurations;
    };
  };
}

export function useConfigurationsComposer(contexts: ConfigurationsContexts) {
  const { properties: _properties } = useConfigurationsProperties(contexts);
  const { handlers: _handlers } = useConfigurationsHandlers(contexts);

  return {
    viewModel: {
      navigationLayout: {
        // NavigationLayout のスタブ実装（工程2〜3で実際の値に置き換える）
        appBar: {
          title: "ACMN",
          onMenuOpen: () => {},
        },
        drawer: {
          open: false,
          onClose: () => {},
          navItems: [],
          activePath: "",
          onNavigate: () => {},
        },
      },
    } satisfies ConfigurationsViewModel,
  };
}
