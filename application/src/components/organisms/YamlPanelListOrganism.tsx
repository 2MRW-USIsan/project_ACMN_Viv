"use client";

import { AddPanelButtonAtom } from "@/components/atoms/AddPanelButtonAtom";
import { ListAtom } from "@/components/atoms/ListAtom";
import { PanelItemMolecule } from "@/components/molecules/PanelItemMolecule";
import {
  SubPanelItem,
  SubPanelSelectorMolecule,
  SubPanelType,
} from "@/components/molecules/SubPanelSelectorMolecule";
import { DividerAtom } from "../atoms/DividerAtom";
import { LabelAtom } from "../atoms/LabelAtom";

interface YamlPanelListOrganismProps {
  props: {
    todoPanelList: {
      id: string;
      panelKey: string;
      panelLabel: string;
      expanded: boolean;
      subPanels: Partial<Record<SubPanelType, SubPanelItem[]>>;
    }[];
    todoOnPanelToggle: (id: string) => void;
    todoOnPanelKeyChange: (id: string, value: string) => void;
    todoOnPanelLabelChange: (id: string, value: string) => void;
    todoOnPanelDelete: (id: string) => void;
    todoOnPanelAdd: () => void;
    todoOnSubPanelToggleEnabled: (
      panelId: string,
      subType: SubPanelType,
    ) => void;
    todoOnSubPanelToggleExpanded: (
      panelId: string,
      subType: SubPanelType,
      subPanelId: string,
    ) => void;
    todoOnSubPanelKeyChange: (
      panelId: string,
      subType: SubPanelType,
      subPanelId: string,
      value: string,
    ) => void;
    todoOnSubPanelLabelChange: (
      panelId: string,
      subType: SubPanelType,
      subPanelId: string,
      value: string,
    ) => void;
    todoOnSubPanelContentChange: (
      panelId: string,
      subType: SubPanelType,
      subPanelId: string,
      value: string,
    ) => void;
    todoOnSubPanelDelete: (
      panelId: string,
      subType: SubPanelType,
      subPanelId: string,
    ) => void;
    todoOnSubPanelAdd: (panelId: string, subType: SubPanelType) => void;
    todoOnSelectItemToggleExpanded: (
      panelId: string,
      subPanelId: string,
      itemId: string,
    ) => void;
    todoOnSelectItemKeyChange: (
      panelId: string,
      subPanelId: string,
      itemId: string,
      value: string,
    ) => void;
    todoOnSelectItemLabelChange: (
      panelId: string,
      subPanelId: string,
      itemId: string,
      value: string,
    ) => void;
    todoOnSelectItemLabelTextChange: (
      panelId: string,
      subPanelId: string,
      itemId: string,
      value: string,
    ) => void;
    todoOnSelectItemPromptChange: (
      panelId: string,
      subPanelId: string,
      itemId: string,
      value: string,
    ) => void;
    todoOnSelectItemDelete: (
      panelId: string,
      subPanelId: string,
      itemId: string,
    ) => void;
    todoOnSelectItemAdd: (panelId: string, subPanelId: string) => void;
  };
}

export function YamlPanelListOrganism({ props }: YamlPanelListOrganismProps) {
  const headingLabelProps = { text: "Blocs Items:" };
  const addButtonProps = {
    onAdd: props.todoOnPanelAdd,
    hasItems: props.todoPanelList.length > 0,
  };

  return (
    <ListAtom>
      <LabelAtom props={headingLabelProps} />
      <DividerAtom />
      {props.todoPanelList.map((panel) => {
        const panelItemProps = {
          id: panel.id,
          panelKey: panel.panelKey,
          panelLabel: panel.panelLabel,
          expanded: panel.expanded,
          onToggle: props.todoOnPanelToggle,
          onKeyChange: props.todoOnPanelKeyChange,
          onLabelChange: props.todoOnPanelLabelChange,
          onDelete: props.todoOnPanelDelete,
        };
        const subPanelSelectorProps = {
          panelId: panel.id,
          subPanels: panel.subPanels,
          onToggleEnabled: props.todoOnSubPanelToggleEnabled,
          onToggleExpanded: props.todoOnSubPanelToggleExpanded,
          onKeyChange: props.todoOnSubPanelKeyChange,
          onLabelChange: props.todoOnSubPanelLabelChange,
          onContentChange: props.todoOnSubPanelContentChange,
          onDelete: props.todoOnSubPanelDelete,
          onAdd: props.todoOnSubPanelAdd,
          onSelectItemToggleExpanded: props.todoOnSelectItemToggleExpanded,
          onSelectItemKeyChange: props.todoOnSelectItemKeyChange,
          onSelectItemLabelChange: props.todoOnSelectItemLabelChange,
          onSelectItemLabelTextChange: props.todoOnSelectItemLabelTextChange,
          onSelectItemPromptChange: props.todoOnSelectItemPromptChange,
          onSelectItemDelete: props.todoOnSelectItemDelete,
          onSelectItemAdd: props.todoOnSelectItemAdd,
        };
        return (
          <PanelItemMolecule key={panel.id} props={panelItemProps}>
            <SubPanelSelectorMolecule props={subPanelSelectorProps} />
          </PanelItemMolecule>
        );
      })}
      <AddPanelButtonAtom props={addButtonProps} />
    </ListAtom>
  );
}
