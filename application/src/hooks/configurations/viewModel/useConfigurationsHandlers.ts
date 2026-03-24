"use client";

import { useRouter } from "next/navigation";
import { ConfigurationsContexts } from "@/hooks/configurations/state/useConfigurationsContext";

export interface ConfigurationsHandlers {
  onDrawerToggle: () => void;
  onNavItemClick: (href: string) => void;
  // 工程3で状態管理と連携予定
  onSetChange: (value: string) => void;
  onLoad: () => void;
  onNameBlur: (value: string) => void;
  onSave: () => void;
  onRemoveItem: (id: string) => void;
  onToggleExpand: (id: string) => void;
  onAddBloc: () => void;
  onItemShortLabelChange: (id: string, value: string) => void;
  onItemLongLabelChange: (id: string, value: string) => void;
}

export function useConfigurationsHandlers(contexts: ConfigurationsContexts) {
  const router = useRouter();
  const { action } = contexts.reducer;

  const handleNavItemClick = (href: string) => {
    router.push(href);
  };

  const handlers: ConfigurationsHandlers = {
    onDrawerToggle: action.toggleDrawer,
    onNavItemClick: handleNavItemClick,
    // 工程3で実装
    onSetChange: () => {},
    onLoad: () => {},
    onNameBlur: () => {},
    onSave: () => {},
    onRemoveItem: () => {},
    onToggleExpand: () => {},
    onAddBloc: () => {},
    onItemShortLabelChange: () => {},
    onItemLongLabelChange: () => {},
  };

  return { handlers };
}
