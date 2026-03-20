"use client";

import { useState } from "react";
import { ConfigurationsViewModel } from "@/hooks/configurations/viewModel/useConfigurationsComposer";
import {
  SubPanelType,
  SubPanelItem,
} from "@/components/molecules/SubPanelSelectorMolecule";

const ROUTE_LIST = [
  { label: "Configurations", href: "/configurations" },
  { label: "Posting Clerk", href: "/posting-clerk" },
  { label: "Preset Builder", href: "/preset-builder" },
  { label: "Prompt Forger", href: "/prompt-forger" },
  { label: "Sample", href: "/sample" },
];

type PanelItem = {
  id: string;
  panelKey: string;
  panelLabel: string;
  expanded: boolean;
  subPanels: Partial<Record<SubPanelType, SubPanelItem>>;
};

export function useConfigurationsMock() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [panelList, setPanelList] = useState<PanelItem[]>([]);

  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);

  const handlePanelToggle = (id: string) => {
    setPanelList((prev) =>
      prev.map((panel) =>
        panel.id === id ? { ...panel, expanded: !panel.expanded } : panel,
      ),
    );
  };

  const handlePanelKeyChange = (id: string, value: string) => {
    setPanelList((prev) =>
      prev.map((panel) =>
        panel.id === id ? { ...panel, panelKey: value } : panel,
      ),
    );
  };

  const handlePanelLabelChange = (id: string, value: string) => {
    setPanelList((prev) =>
      prev.map((panel) =>
        panel.id === id ? { ...panel, panelLabel: value } : panel,
      ),
    );
  };

  const handlePanelDelete = (id: string) => {
    setPanelList((prev) => prev.filter((panel) => panel.id !== id));
  };

  const handlePanelAdd = () => {
    const id = crypto.randomUUID();
    setPanelList((prev) => [
      ...prev,
      { id, panelKey: "", panelLabel: "", expanded: false, subPanels: {} },
    ]);
  };

  const handleSubPanelToggleEnabled = (
    panelId: string,
    subType: SubPanelType,
  ) => {
    setPanelList((prev) =>
      prev.map((panel) => {
        if (panel.id !== panelId) return panel;
        const updated = { ...panel.subPanels };
        if (updated[subType]) {
          delete updated[subType];
        } else {
          updated[subType] = {
            id: crypto.randomUUID(),
            panelKey: "",
            panelLabel: "",
            expanded: false,
          };
        }
        return { ...panel, subPanels: updated };
      }),
    );
  };

  const handleSubPanelToggleExpanded = (
    panelId: string,
    subType: SubPanelType,
  ) => {
    setPanelList((prev) =>
      prev.map((panel) => {
        if (panel.id !== panelId) return panel;
        const subPanel = panel.subPanels[subType];
        if (!subPanel) return panel;
        return {
          ...panel,
          subPanels: {
            ...panel.subPanels,
            [subType]: { ...subPanel, expanded: !subPanel.expanded },
          },
        };
      }),
    );
  };

  const handleSubPanelKeyChange = (
    panelId: string,
    subType: SubPanelType,
    value: string,
  ) => {
    setPanelList((prev) =>
      prev.map((panel) => {
        if (panel.id !== panelId) return panel;
        const subPanel = panel.subPanels[subType];
        if (!subPanel) return panel;
        return {
          ...panel,
          subPanels: {
            ...panel.subPanels,
            [subType]: { ...subPanel, panelKey: value },
          },
        };
      }),
    );
  };

  const handleSubPanelLabelChange = (
    panelId: string,
    subType: SubPanelType,
    value: string,
  ) => {
    setPanelList((prev) =>
      prev.map((panel) => {
        if (panel.id !== panelId) return panel;
        const subPanel = panel.subPanels[subType];
        if (!subPanel) return panel;
        return {
          ...panel,
          subPanels: {
            ...panel.subPanels,
            [subType]: { ...subPanel, panelLabel: value },
          },
        };
      }),
    );
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
      todoOnPanelKeyChange: handlePanelKeyChange,
      todoOnPanelLabelChange: handlePanelLabelChange,
      todoOnPanelDelete: handlePanelDelete,
      todoOnPanelAdd: handlePanelAdd,
      todoOnSubPanelToggleEnabled: handleSubPanelToggleEnabled,
      todoOnSubPanelToggleExpanded: handleSubPanelToggleExpanded,
      todoOnSubPanelKeyChange: handleSubPanelKeyChange,
      todoOnSubPanelLabelChange: handleSubPanelLabelChange,
    },
  };

  return { viewModel };
}
