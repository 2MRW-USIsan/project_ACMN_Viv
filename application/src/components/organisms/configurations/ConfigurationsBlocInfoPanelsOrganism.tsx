"use client";

import { Box, Divider } from "@mui/material";
import { BlocItem } from "@/types/configurationsItem";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { BoxAtom } from "@/components/atoms/BoxAtom";
import { ListAtom } from "@/components/atoms/ListAtom";
import { ListItemAtom } from "@/components/atoms/ListItemAtom";
import { CollapseAtom } from "@/components/atoms/CollapseAtom";
import { BlocItemRowMolecule } from "@/components/molecules/BlocItemRowMolecule";

interface ConfigurationsBlocInfoPanelsOrganismProps {
  props: {
    items: BlocItem[];
    onRemoveItem: (id: string) => void;
    onToggleExpand: (id: string) => void;
    onAddBloc: () => void;
    onItemShortLabelChange: (id: string, value: string) => void;
    onItemLongLabelChange: (id: string, value: string) => void;
  };
}

export function ConfigurationsBlocInfoPanelsOrganism({
  props,
}: ConfigurationsBlocInfoPanelsOrganismProps) {
  const {
    items,
    onRemoveItem,
    onToggleExpand,
    onAddBloc,
    onItemShortLabelChange,
    onItemLongLabelChange,
  } = props;

  return (
    <>
      {/* Bloc Items List */}
      <Box>
        <Box sx={{ px: 2, py: 0.5 }}>
          <LabelAtom props={{ text: "Bloc Info Panels:", variant: "body2" }} />
        </Box>
        <Divider />
        <ListAtom props={{ disablePadding: true }}>
          {items.map((item, index) => (
            <ListItemAtom
              key={item.id}
              props={{
                disablePadding: true,
                sx: { flexDirection: "column", alignItems: "stretch" },
              }}
            >
              <BlocItemRowMolecule
                props={{
                  shortLabel: item.shortLabel,
                  longLabel: item.longLabel,
                  isExpanded: item.isExpanded,
                  onShortLabelChange: (value) =>
                    onItemShortLabelChange(item.id, value),
                  onLongLabelChange: (value) =>
                    onItemLongLabelChange(item.id, value),
                  onRemove: () => onRemoveItem(item.id),
                  onToggleExpand: () => onToggleExpand(item.id),
                }}
              />
              <CollapseAtom props={{ in: item.isExpanded }}>
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
              {index < items.length - 1 && <Divider />}
            </ListItemAtom>
          ))}
        </ListAtom>
      </Box>

      <Divider />

      {/* Add Bloc */}
      <ListAtom props={{ disablePadding: true }}>
        <ListItemAtom
          props={{
            onClick: onAddBloc,
            sx: { justifyContent: "center", cursor: "pointer" },
          }}
        >
          <LabelAtom props={{ text: "Add Bloc +", variant: "body2" }} />
        </ListItemAtom>
      </ListAtom>
    </>
  );
}
