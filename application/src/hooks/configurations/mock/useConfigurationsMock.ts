"use client";

import { useState } from "react";
import { ConfigurationsViewModel } from "@/hooks/configurations/viewModel/useConfigurationsComposer";

const ROUTE_LIST = [
  { label: "Configurations", href: "/configurations" },
  { label: "Posting Clerk", href: "/posting-clerk" },
  { label: "Preset Builder", href: "/preset-builder" },
  { label: "Prompt Forger", href: "/prompt-forger" },
  { label: "Sample", href: "/sample" },
];

export function useConfigurationsMock() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [panelList, setPanelList] = useState<
    { id: string; expanded: boolean }[]
  >([]);

  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);

  const handlePanelToggle = (id: string) => {
    setPanelList((prev) =>
      prev.map((panel) =>
        panel.id === id ? { ...panel, expanded: !panel.expanded } : panel,
      ),
    );
  };

  const handlePanelAdd = () => {
    const id = crypto.randomUUID();
    setPanelList((prev) => [...prev, { id, expanded: false }]);
  };

  const viewModel: ConfigurationsViewModel = {
    appPage: {
      todoTitle: "Configurations",
      todoDrawerOpen: drawerOpen,
      todoDrawerOnToggle: handleDrawerToggle,
      todoRouteList: ROUTE_LIST,
    },
    yamlPanelList: {
      todoPanelList: panelList,
      todoOnPanelToggle: handlePanelToggle,
      todoOnPanelAdd: handlePanelAdd,
    },
  };

  return { viewModel };
}
