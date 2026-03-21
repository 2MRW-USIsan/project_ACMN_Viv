"use client";

import { SelectableChipAtom } from "@/components/atoms/SelectableChipAtom";
import { OrdersPanelListOrganism as OrdersPanelList } from "@/components/organisms/OrdersPanelListOrganism";
import { SelectPanelListOrganism as SelectPanelList } from "@/components/organisms/SelectPanelListOrganism";
import { SwitchPanelListOrganism as SwitchPanelList } from "@/components/organisms/SwitchPanelListOrganism";
import { SUB_PANEL_TYPES, SubPanelItem, SubPanelType } from "@/types/subPanel";
import type { ComponentProps, ReactElement } from "react";
import { DividerAtom } from "../atoms/DividerAtom";
import { ListItemAtom } from "../atoms/ListItemAtom";
export type { SubPanelItem, SubPanelType };

type SelectableChipProps = ComponentProps<typeof SelectableChipAtom>["props"];
type OrdersPanelListProps = ComponentProps<typeof OrdersPanelList>["props"];
type SwitchPanelListProps = ComponentProps<typeof SwitchPanelList>["props"];
type SelectPanelListProps = ComponentProps<typeof SelectPanelList>["props"];

interface YamlPanelItemOrganismsProps {
  props: {
    chipProps: {
      orders: SelectableChipProps;
      switch: SelectableChipProps;
      select: SelectableChipProps;
    };
    ordersProps: OrdersPanelListProps;
    switchProps: SwitchPanelListProps;
    selectProps: SelectPanelListProps;
  };
}

export function YamlPanelItemOrganisms({ props }: YamlPanelItemOrganismsProps) {
  return (
    <>
      <ListItemAtom>
        {SUB_PANEL_TYPES.map((subType) => {
          const chipProps = props.chipProps[subType];
          return <SelectableChipAtom key={subType} props={chipProps} />;
        })}
      </ListItemAtom>
      <DividerAtom />
      {SUB_PANEL_TYPES.map((subType) => {
        if (!props.chipProps[subType].selected) return null;
        const componentMap = {
          orders: <OrdersPanelList key="orders" props={props.ordersProps} />,
          switch: <SwitchPanelList key="switch" props={props.switchProps} />,
          select: <SelectPanelList key="select" props={props.selectProps} />,
        } satisfies Record<SubPanelType, ReactElement>;

        return componentMap[subType];
      })}
      <DividerAtom />
    </>
  );
}
