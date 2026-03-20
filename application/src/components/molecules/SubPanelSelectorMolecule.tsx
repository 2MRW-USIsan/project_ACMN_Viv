"use client";

import { CheckboxAtom } from "@/components/atoms/CheckboxAtom";
import { FlexLayoutAtom } from "@/components/atoms/FlexLayoutAtom";
import { IndentedBoxAtom } from "@/components/atoms/IndentedBoxAtom";
import { PanelItemMolecule } from "@/components/molecules/PanelItemMolecule";

const SUB_PANEL_TYPES = ["orders", "switch", "select"] as const;
export type SubPanelType = (typeof SUB_PANEL_TYPES)[number];

export interface SubPanelItem {
  id: string;
  panelKey: string;
  panelLabel: string;
  expanded: boolean;
}

interface SubPanelSelectorMoleculeProps {
  props: {
    panelId: string;
    subPanels: Partial<Record<SubPanelType, SubPanelItem>>;
    onToggleEnabled: (panelId: string, subType: SubPanelType) => void;
    onToggleExpanded: (panelId: string, subType: SubPanelType) => void;
    onKeyChange: (panelId: string, subType: SubPanelType, value: string) => void;
    onLabelChange: (
      panelId: string,
      subType: SubPanelType,
      value: string,
    ) => void;
  };
}

export function SubPanelSelectorMolecule({
  props,
}: SubPanelSelectorMoleculeProps) {
  return (
    <>
      <FlexLayoutAtom>
        {SUB_PANEL_TYPES.map((subType) => (
          <CheckboxAtom
            key={subType}
            props={{
              label: subType,
              checked: !!props.subPanels[subType],
              onChange: () => props.onToggleEnabled(props.panelId, subType),
            }}
          />
        ))}
      </FlexLayoutAtom>
      {SUB_PANEL_TYPES.map((subType) => {
        const subPanel = props.subPanels[subType];
        if (!subPanel) return null;
        return (
          <IndentedBoxAtom key={subType}>
            <PanelItemMolecule
              props={{
                id: subPanel.id,
                panelKey: subPanel.panelKey,
                panelLabel: subPanel.panelLabel,
                expanded: subPanel.expanded,
                onToggle: () =>
                  props.onToggleExpanded(props.panelId, subType),
                onKeyChange: (_id, value) =>
                  props.onKeyChange(props.panelId, subType, value),
                onLabelChange: (_id, value) =>
                  props.onLabelChange(props.panelId, subType, value),
                onDelete: () =>
                  props.onToggleEnabled(props.panelId, subType),
              }}
            />
          </IndentedBoxAtom>
        );
      })}
    </>
  );
}
