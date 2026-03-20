"use client";

import type { ReactElement } from "react";
import { FlexLayoutAtom } from "@/components/atoms/FlexLayoutAtom";
import { IndentedBoxAtom } from "@/components/atoms/IndentedBoxAtom";
import { SelectableChipAtom } from "@/components/atoms/SelectableChipAtom";
import { OrdersPanelListOrganism } from "@/components/organisms/OrdersPanelListOrganism";
import { SwitchPanelListOrganism } from "@/components/organisms/SwitchPanelListOrganism";
import { SelectPanelListOrganism } from "@/components/organisms/SelectPanelListOrganism";
import { SUB_PANEL_TYPES, SubPanelItem, SubPanelType } from "@/types/subPanel";
export type { SubPanelItem, SubPanelType };

interface SubPanelSelectorMoleculeProps {
  props: {
    panelId: string;
    subPanels: Partial<Record<SubPanelType, SubPanelItem[]>>;
    onToggleEnabled: (panelId: string, subType: SubPanelType) => void;
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
    onSelectItemAdd: (
      panelId: string,
      subType: SubPanelType,
      subPanelId: string,
    ) => void;
    onSelectItemDelete: (
      panelId: string,
      subType: SubPanelType,
      subPanelId: string,
      itemId: string,
    ) => void;
    onSelectItemToggle: (
      panelId: string,
      subType: SubPanelType,
      subPanelId: string,
      itemId: string,
    ) => void;
    onSelectItemKeyChange: (
      panelId: string,
      subType: SubPanelType,
      subPanelId: string,
      itemId: string,
      value: string,
    ) => void;
    onSelectItemPanelLabelChange: (
      panelId: string,
      subType: SubPanelType,
      subPanelId: string,
      itemId: string,
      value: string,
    ) => void;
    onSelectItemLabelChange: (
      panelId: string,
      subType: SubPanelType,
      subPanelId: string,
      itemId: string,
      value: string,
    ) => void;
    onSelectItemPromptChange: (
      panelId: string,
      subType: SubPanelType,
      subPanelId: string,
      itemId: string,
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
        {SUB_PANEL_TYPES.map((subType) => {
          const chipProps = {
            label: subType,
            selected: !!props.subPanels[subType],
            onClick: () => props.onToggleEnabled(props.panelId, subType),
          };
          return <SelectableChipAtom key={subType} props={chipProps} />;
        })}
      </FlexLayoutAtom>
      {SUB_PANEL_TYPES.map((subType) => {
        const subPanelList = props.subPanels[subType];
        if (!subPanelList || subPanelList.length === 0) return null;

        const commonProps = {
          panelId: props.panelId,
          subPanelList,
          onToggleExpanded: (panelId: string, subPanelId: string) =>
            props.onToggleExpanded(panelId, subType, subPanelId),
          onKeyChange: (panelId: string, subPanelId: string, value: string) =>
            props.onKeyChange(panelId, subType, subPanelId, value),
          onLabelChange: (panelId: string, subPanelId: string, value: string) =>
            props.onLabelChange(panelId, subType, subPanelId, value),
          onDelete: (panelId: string, subPanelId: string) =>
            props.onDelete(panelId, subType, subPanelId),
          onAdd: (panelId: string) => props.onAdd(panelId, subType),
        };

        const componentMap = {
          orders: (
            <OrdersPanelListOrganism
              props={{
                ...commonProps,
                onContentChange: (
                  panelId: string,
                  subPanelId: string,
                  value: string,
                ) => props.onContentChange(panelId, subType, subPanelId, value),
              }}
            />
          ),
          switch: (
            <SwitchPanelListOrganism
              props={{
                ...commonProps,
                onContentChange: (
                  panelId: string,
                  subPanelId: string,
                  value: string,
                ) => props.onContentChange(panelId, subType, subPanelId, value),
              }}
            />
          ),
          select: (
            <SelectPanelListOrganism
              props={{
                ...commonProps,
                onSelectItemAdd: (panelId: string, subPanelId: string) =>
                  props.onSelectItemAdd(panelId, subType, subPanelId),
                onSelectItemDelete: (
                  panelId: string,
                  subPanelId: string,
                  itemId: string,
                ) =>
                  props.onSelectItemDelete(
                    panelId,
                    subType,
                    subPanelId,
                    itemId,
                  ),
                onSelectItemToggle: (
                  panelId: string,
                  subPanelId: string,
                  itemId: string,
                ) =>
                  props.onSelectItemToggle(
                    panelId,
                    subType,
                    subPanelId,
                    itemId,
                  ),
                onSelectItemKeyChange: (
                  panelId: string,
                  subPanelId: string,
                  itemId: string,
                  value: string,
                ) =>
                  props.onSelectItemKeyChange(
                    panelId,
                    subType,
                    subPanelId,
                    itemId,
                    value,
                  ),
                onSelectItemPanelLabelChange: (
                  panelId: string,
                  subPanelId: string,
                  itemId: string,
                  value: string,
                ) =>
                  props.onSelectItemPanelLabelChange(
                    panelId,
                    subType,
                    subPanelId,
                    itemId,
                    value,
                  ),
                onSelectItemLabelChange: (
                  panelId: string,
                  subPanelId: string,
                  itemId: string,
                  value: string,
                ) =>
                  props.onSelectItemLabelChange(
                    panelId,
                    subType,
                    subPanelId,
                    itemId,
                    value,
                  ),
                onSelectItemPromptChange: (
                  panelId: string,
                  subPanelId: string,
                  itemId: string,
                  value: string,
                ) =>
                  props.onSelectItemPromptChange(
                    panelId,
                    subType,
                    subPanelId,
                    itemId,
                    value,
                  ),
              }}
            />
          ),
        } satisfies Record<SubPanelType, ReactElement>;

        return (
          <IndentedBoxAtom key={subType}>
            {componentMap[subType]}
          </IndentedBoxAtom>
        );
      })}
    </>
  );
}

