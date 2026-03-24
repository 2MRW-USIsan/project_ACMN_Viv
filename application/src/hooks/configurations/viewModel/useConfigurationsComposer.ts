"use client";

import { NavItem } from "@/types/navigation";
import { BlocItem, BlocItemData } from "@/types/configurationsItem";
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
    header: {
      isLoaded: boolean;
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
    };
    blocPanelInfo: {
      frame: {
        label: {
          text: string;
          variant?: "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "caption";
        };
      };
      blocs: {
        items: BlocItem[];
      };
      addPanel: {
        onAddBloc: () => void;
      };
    };
  };
}

function toBlocItemViewModel(
  item: BlocItemData,
  handlers: {
    onRemoveItem: (id: string) => void;
    onToggleExpand: (id: string) => void;
    onItemShortLabelChange: (id: string, value: string) => void;
    onItemLongLabelChange: (id: string, value: string) => void;
  }
): BlocItem {
  return {
    id: item.id,
    blocItem: {
      blocItem: item,
      handlers,
    },
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
        header: {
          isLoaded: properties.isLoaded,
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
        },
        blocPanelInfo: {
          frame: {
            label: { text: "Bloc Info Panels:", variant: "body2" },
          },
          blocs: {
            items: properties.blocItems.map((item) =>
              toBlocItemViewModel(item, {
                onRemoveItem: handlers.onRemoveItem,
                onToggleExpand: handlers.onToggleExpand,
                onItemShortLabelChange: handlers.onItemShortLabelChange,
                onItemLongLabelChange: handlers.onItemLongLabelChange,
              })
            ),
          },
          addPanel: {
            onAddBloc: handlers.onAddBloc,
          },
        },
      },
    } satisfies ConfigurationsViewModel,
  };
}
