"use client";

import { AddPanelButtonAtom } from "@/components/atoms/AddPanelButtonAtom";
import { DividerAtom } from "@/components/atoms/DividerAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { ListAtom } from "@/components/atoms/ListAtom";
import { PanelItemMolecule } from "@/components/molecules/PanelItemMolecule";
import { SubPanelContentMolecule } from "@/components/molecules/SubPanelContentMolecule";
import {
  SUB_PANEL_CONTENT_FIELD_KEYS,
  SubPanelItem,
  SubPanelType,
} from "@/types/subPanel";

const SUB_PANEL_LABELS: Record<SubPanelType, string> = {
  orders: "Orders Groups:",
  switch: "Switch Groups:",
  select: "Select Groups:",
};

interface SubPanelListOrganismProps {
  props: {
    subType: SubPanelType;
    panelId: string;
    subPanelList: SubPanelItem[];
    onToggleExpanded: (
      panelId: string,
      subType: SubPanelType,
      subPanelId: string,
    ) => void;
    onKeyChange: (
      panelId: string,
      subType: SubPanelType,
      subPanelId: string,
      value: string,
    ) => void;
    onLabelChange: (
      panelId: string,
      subType: SubPanelType,
      subPanelId: string,
      value: string,
    ) => void;
    onContentChange: (
      panelId: string,
      subType: SubPanelType,
      subPanelId: string,
      value: string,
    ) => void;
    onDelete: (
      panelId: string,
      subType: SubPanelType,
      subPanelId: string,
    ) => void;
    onAdd: (panelId: string, subType: SubPanelType) => void;
  };
}

export function SubPanelListOrganism({ props }: SubPanelListOrganismProps) {
  const contentFieldKey = SUB_PANEL_CONTENT_FIELD_KEYS[props.subType];
  const headingLabelProps = { text: SUB_PANEL_LABELS[props.subType] };
  const addButtonProps = {
    onAdd: () => props.onAdd(props.panelId, props.subType),
    hasItems: props.subPanelList.length > 0,
  };

  return (
    <ListAtom>
      <LabelAtom props={headingLabelProps} />
      <DividerAtom />
      {props.subPanelList.map((subPanel) => {
        const panelItemProps = {
          id: subPanel.id,
          panelKey: subPanel.panelKey,
          panelLabel: subPanel.panelLabel,
          expanded: subPanel.expanded,
          onToggle: () =>
            props.onToggleExpanded(props.panelId, props.subType, subPanel.id),
          onKeyChange: (_id: string, value: string) =>
            props.onKeyChange(props.panelId, props.subType, subPanel.id, value),
          onLabelChange: (_id: string, value: string) =>
            props.onLabelChange(props.panelId, props.subType, subPanel.id, value),
          onDelete: () =>
            props.onDelete(props.panelId, props.subType, subPanel.id),
        };
        const subPanelContentProps = {
          subType: props.subType,
          value: subPanel[contentFieldKey],
          onValueChange: (value: string) =>
            props.onContentChange(
              props.panelId,
              props.subType,
              subPanel.id,
              value,
            ),
        };
        return (
          <PanelItemMolecule key={subPanel.id} props={panelItemProps}>
            <SubPanelContentMolecule props={subPanelContentProps} />
          </PanelItemMolecule>
        );
      })}
      <AddPanelButtonAtom props={addButtonProps} />
    </ListAtom>
  );
}
