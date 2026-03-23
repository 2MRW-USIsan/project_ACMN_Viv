"use client";

import { useRouter } from "next/navigation";
import { ConfigurationsContexts } from "@/hooks/configurations/state/useConfigurationsContext";

export interface ConfigurationsHandlers {
  onDrawerToggle: () => void;
  onNavItemClick: (href: string) => void;
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
  };

  return { handlers };
}
