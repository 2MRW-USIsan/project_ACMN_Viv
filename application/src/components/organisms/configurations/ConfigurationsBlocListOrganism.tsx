"use client";

import { BoxAtom } from "@/components/atoms/BoxAtom";
import { CollapseAtom } from "@/components/atoms/CollapseAtom";
import { DividerAtom } from "@/components/atoms/DividerAtom";
import { ListAtom } from "@/components/atoms/ListAtom";
import { ListItemAtom } from "@/components/atoms/ListItemAtom";
import { BlocItemRowMolecule } from "@/components/molecules/BlocItemRowMolecule";
import { BlocItem } from "@/types/configurationsItem";

interface ConfigurationsBlocListOrganismProps {
  props: {
    items: BlocItem[];
  };
}

export function ConfigurationsBlocListOrganism({
  props,
}: ConfigurationsBlocListOrganismProps) {
  const { items } = props;

  return (
    <ListAtom props={{ disablePadding: true }}>
      {items.map((item) => {
        const { blocItem, handlers } = item.blocItem;
        return (
          <ListItemAtom
            key={item.id}
            props={{
              disablePadding: true,
              sx: { flexDirection: "column", alignItems: "stretch" },
            }}
          >
            <BlocItemRowMolecule
              props={{
                shortLabel: blocItem.shortLabel,
                longLabel: blocItem.longLabel,
                isExpanded: blocItem.isExpanded,
                onShortLabelChange: (value) =>
                  handlers.onItemShortLabelChange(blocItem.id, value),
                onLongLabelChange: (value) =>
                  handlers.onItemLongLabelChange(blocItem.id, value),
                onRemove: () => handlers.onRemoveItem(blocItem.id),
                onToggleExpand: () => handlers.onToggleExpand(blocItem.id),
              }}
            />
            <CollapseAtom props={{ in: blocItem.isExpanded }}>
              <BoxAtom
                props={{
                  sx: {
                    mx: 2,
                    mb: 1,
                    height: 240,
                    bgcolor: "grey.200",
                    borderRadius: 1,
                  },
                }}
              />
            </CollapseAtom>
            <DividerAtom />
          </ListItemAtom>
        );
      })}
    </ListAtom>
  );
}
