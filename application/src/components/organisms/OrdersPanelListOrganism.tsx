"use client";

import { AddPanelButtonAtom } from "@/components/atoms/AddPanelButtonAtom";
import { DividerAtom } from "@/components/atoms/DividerAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { ListAtom } from "@/components/atoms/ListAtom";
import { PanelItemMolecule } from "@/components/molecules/PanelItemMolecule";
import { SubPanelContentMolecule } from "@/components/molecules/SubPanelContentMolecule";
import { SUB_PANEL_CONTENT_FIELD_KEYS, SubPanelItem } from "@/types/subPanel";

const SUB_TYPE = "orders" as const;
const LABEL = "Orders Groups:";

interface OrdersPanelListOrganismProps {
  props: {
    panelId: string;
    subPanelList: SubPanelItem[];
    onToggleExpanded: (panelId: string, subPanelId: string) => void;
    onKeyChange: (panelId: string, subPanelId: string, value: string) => void;
    onLabelChange: (panelId: string, subPanelId: string, value: string) => void;
    onContentChange: (
      panelId: string,
      subPanelId: string,
      value: string,
    ) => void;
    onDelete: (panelId: string, subPanelId: string) => void;
    onAdd: (panelId: string) => void;
  };
}

export function OrdersPanelListOrganism({
  props,
}: OrdersPanelListOrganismProps) {
  const contentFieldKey = SUB_PANEL_CONTENT_FIELD_KEYS[SUB_TYPE];
  const headingLabelProps = { text: LABEL };
  const addButtonProps = {
    onAdd: () => props.onAdd(props.panelId),
    hasItems: props.subPanelList.length > 0,
    label: "Add Group",
  };

  return (
    <ListAtom>
      <LabelAtom props={headingLabelProps} />
      <DividerAtom />
      {props.subPanelList.map((subPanel) => {
        const panelItemProps = {
          id: subPanel.id,
          itemLabel: "Group:",
          panelKey: subPanel.panelKey,
          panelLabel: subPanel.panelLabel,
          expanded: subPanel.expanded,
          onToggle: () => props.onToggleExpanded(props.panelId, subPanel.id),
          onKeyChange: (_id: string, value: string) =>
            props.onKeyChange(props.panelId, subPanel.id, value),
          onLabelChange: (_id: string, value: string) =>
            props.onLabelChange(props.panelId, subPanel.id, value),
          onDelete: () => props.onDelete(props.panelId, subPanel.id),
        };
        const subPanelContentProps = {
          subType: SUB_TYPE,
          value: subPanel[contentFieldKey],
          onValueChange: (value: string) =>
            props.onContentChange(props.panelId, subPanel.id, value),
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
