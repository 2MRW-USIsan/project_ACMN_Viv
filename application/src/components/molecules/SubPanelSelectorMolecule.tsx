"use client";

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
        const subPanelListProps = {
          panelId: props.panelId,
          subPanelList,
          onToggleExpanded: (panelId: string, subPanelId: string) =>
            props.onToggleExpanded(panelId, subType, subPanelId),
          onKeyChange: (panelId: string, subPanelId: string, value: string) =>
            props.onKeyChange(panelId, subType, subPanelId, value),
          onLabelChange: (panelId: string, subPanelId: string, value: string) =>
            props.onLabelChange(panelId, subType, subPanelId, value),
          onContentChange: (panelId: string, subPanelId: string, value: string) =>
            props.onContentChange(panelId, subType, subPanelId, value),
          onDelete: (panelId: string, subPanelId: string) =>
            props.onDelete(panelId, subType, subPanelId),
          onAdd: (panelId: string) => props.onAdd(panelId, subType),
        };

        const renderComponent = () => {
          switch (subType) {
            case "orders":
              return <OrdersPanelListOrganism props={subPanelListProps} />;
            case "switch":
              return <SwitchPanelListOrganism props={subPanelListProps} />;
            case "select":
              return <SelectPanelListOrganism props={subPanelListProps} />;
            default:
              const _exhaustive: never = subType;
              return _exhaustive;
          }
        };

        return (
          <IndentedBoxAtom key={subType}>{renderComponent()}</IndentedBoxAtom>
        );
      })}
    </>
  );
}
