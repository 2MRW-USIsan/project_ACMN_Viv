"use client";

import { FlexLayoutAtom } from "@/components/atoms/FlexLayoutAtom";
import { IndentedBoxAtom } from "@/components/atoms/IndentedBoxAtom";
import { SelectableChipAtom } from "@/components/atoms/SelectableChipAtom";
import { SubPanelListOrganism } from "@/components/organisms/SubPanelListOrganism";
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
          subType,
          panelId: props.panelId,
          subPanelList,
          onToggleExpanded: props.onToggleExpanded,
          onKeyChange: props.onKeyChange,
          onLabelChange: props.onLabelChange,
          onContentChange: props.onContentChange,
          onDelete: props.onDelete,
          onAdd: props.onAdd,
        };
        return (
          <IndentedBoxAtom key={subType}>
            <SubPanelListOrganism props={subPanelListProps} />
          </IndentedBoxAtom>
        );
      })}
    </>
  );
}
