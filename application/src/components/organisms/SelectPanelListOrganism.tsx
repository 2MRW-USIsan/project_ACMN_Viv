"use client";

import { AddPanelButtonAtom } from "@/components/atoms/AddPanelButtonAtom";
import { DividerAtom } from "@/components/atoms/DividerAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { ListAtom } from "@/components/atoms/ListAtom";
import { PanelItemMolecule } from "@/components/molecules/PanelItemMolecule";
import { SelectSubPanelContentMolecule } from "@/components/molecules/SelectSubPanelContentMolecule";
import { SubPanelItem } from "@/types/subPanel";

const LABEL = "Select Groups:";

interface SelectPanelListOrganismProps {
  props: {
    panelId: string;
    subPanelList: SubPanelItem[];
    onToggleExpanded: (panelId: string, subPanelId: string) => void;
    onKeyChange: (panelId: string, subPanelId: string, value: string) => void;
    onLabelChange: (panelId: string, subPanelId: string, value: string) => void;
    onDelete: (panelId: string, subPanelId: string) => void;
    onAdd: (panelId: string) => void;
    onSelectItemToggleExpanded: (
      panelId: string,
      subPanelId: string,
      itemId: string,
    ) => void;
    onSelectItemKeyChange: (
      panelId: string,
      subPanelId: string,
      itemId: string,
      value: string,
    ) => void;
    onSelectItemLabelChange: (
      panelId: string,
      subPanelId: string,
      itemId: string,
      value: string,
    ) => void;
    onSelectItemLabelTextChange: (
      panelId: string,
      subPanelId: string,
      itemId: string,
      value: string,
    ) => void;
    onSelectItemPromptChange: (
      panelId: string,
      subPanelId: string,
      itemId: string,
      value: string,
    ) => void;
    onSelectItemDelete: (
      panelId: string,
      subPanelId: string,
      itemId: string,
    ) => void;
    onSelectItemAdd: (panelId: string, subPanelId: string) => void;
  };
}

export function SelectPanelListOrganism({ props }: SelectPanelListOrganismProps) {
  const headingLabelProps = { text: LABEL };
  const addButtonProps = {
    onAdd: () => props.onAdd(props.panelId),
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
          onToggle: () => props.onToggleExpanded(props.panelId, subPanel.id),
          onKeyChange: (_id: string, value: string) =>
            props.onKeyChange(props.panelId, subPanel.id, value),
          onLabelChange: (_id: string, value: string) =>
            props.onLabelChange(props.panelId, subPanel.id, value),
          onDelete: () => props.onDelete(props.panelId, subPanel.id),
        };
        const selectSubPanelContentProps = {
          selectItems: subPanel.selectItems,
          onToggleExpanded: (itemId: string) =>
            props.onSelectItemToggleExpanded(props.panelId, subPanel.id, itemId),
          onKeyChange: (itemId: string, value: string) =>
            props.onSelectItemKeyChange(props.panelId, subPanel.id, itemId, value),
          onLabelChange: (itemId: string, value: string) =>
            props.onSelectItemLabelChange(props.panelId, subPanel.id, itemId, value),
          onLabelTextChange: (itemId: string, value: string) =>
            props.onSelectItemLabelTextChange(
              props.panelId,
              subPanel.id,
              itemId,
              value,
            ),
          onPromptChange: (itemId: string, value: string) =>
            props.onSelectItemPromptChange(
              props.panelId,
              subPanel.id,
              itemId,
              value,
            ),
          onDelete: (itemId: string) =>
            props.onSelectItemDelete(props.panelId, subPanel.id, itemId),
          onAdd: () => props.onSelectItemAdd(props.panelId, subPanel.id),
        };
        return (
          <PanelItemMolecule key={subPanel.id} props={panelItemProps}>
            <SelectSubPanelContentMolecule props={selectSubPanelContentProps} />
          </PanelItemMolecule>
        );
      })}
      <AddPanelButtonAtom props={addButtonProps} />
    </ListAtom>
  );
}

