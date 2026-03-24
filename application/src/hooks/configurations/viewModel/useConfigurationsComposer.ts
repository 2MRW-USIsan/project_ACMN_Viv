"use client";

import { NavItem } from "@/types/navigation";
import { BlocItem } from "@/types/configurationsItem";
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
  configurations: {
    sets: {
      options: string[];
      selectedSet: string;
      onSetChange: (value: string) => void;
      onLoad: () => void;
    };
    name: {
      nameValue: string;
      hasChanges: boolean;
      onNameBlur: (value: string) => void;
      onSave: () => void;
    };
    blocInfoPanels: {
      items: BlocItem[];
      onRemoveItem: (id: string) => void;
      onToggleExpand: (id: string) => void;
      onAddBloc: () => void;
      onItemShortLabelChange: (id: string, value: string) => void;
      onItemLongLabelChange: (id: string, value: string) => void;
    };
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
      configurations: {
        sets: {
          options: properties.sets.options,
          selectedSet: properties.sets.selectedSet,
          onSetChange: handlers.onSetChange,
          onLoad: handlers.onLoad,
        },
        name: {
          nameValue: properties.name.nameValue,
          hasChanges: properties.name.hasChanges,
          onNameBlur: handlers.onNameBlur,
          onSave: handlers.onSave,
        },
        blocInfoPanels: {
          items: properties.blocItems,
          onRemoveItem: handlers.onRemoveItem,
          onToggleExpand: handlers.onToggleExpand,
          onAddBloc: handlers.onAddBloc,
          onItemShortLabelChange: handlers.onItemShortLabelChange,
          onItemLongLabelChange: handlers.onItemLongLabelChange,
        },
      },
    } satisfies ConfigurationsViewModel,
  };
}
