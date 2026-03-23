"use client";

import { Box, Divider, Stack } from "@mui/material";
import { BlocItem } from "@/types/configurationsItem";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { ButtonAtom } from "@/components/atoms/ButtonAtom";
import { SelectAtom } from "@/components/atoms/SelectAtom";
import { BlocItemRowMolecule } from "@/components/molecules/BlocItemRowMolecule";

interface ConfigurationsContentOrganismProps {
  props: {
    sets: {
      options: string[];
      selectedSet: string;
      onSetChange: (value: string) => void;
      onLoad: () => void;
    };
    name: {
      options: string[];
      selectedName: string;
      hasChanges: boolean;
      onNameChange: (value: string) => void;
      onSave: () => void;
    };
    blocInfoPanels: {
      items: BlocItem[];
      onRemoveItem: (id: string) => void;
      onToggleExpand: (id: string) => void;
      onAddBloc: () => void;
      onItemShortLabelChange: (id: string, value: string) => void;
      onItemLongLabelChange: (id: string, value: string) => void;
    };
  };
}

export function ConfigurationsContentOrganism({
  props,
}: ConfigurationsContentOrganismProps) {
  const { sets, name, blocInfoPanels } = props;

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ px: 2, pt: 1, pb: 0.5 }}>
        {/* Sets row */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
          <LabelAtom props={{ text: "Sets:", variant: "body2" }} />
          <SelectAtom
            props={{
              value: sets.selectedSet,
              options: sets.options,
              onChange: sets.onSetChange,
              fullWidth: true,
            }}
          />
          <ButtonAtom props={{ label: "Load", onClick: sets.onLoad }} />
        </Stack>

        {/* Name row */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
          <LabelAtom props={{ text: "Name:", variant: "body2" }} />
          <SelectAtom
            props={{
              value: name.selectedName,
              options: name.options,
              onChange: name.onNameChange,
              fullWidth: true,
            }}
          />
          {name.hasChanges && (
            <LabelAtom
              props={{
                text: "having some changes",
                variant: "body2",
                color: "text.secondary",
              }}
            />
          )}
          <ButtonAtom props={{ label: "Save", onClick: name.onSave }} />
        </Stack>

        {/* Bloc Info Panels label */}
        <LabelAtom props={{ text: "Bloc Info Panels:", variant: "body2" }} />
      </Box>

      <Divider />

      {/* Bloc Items List */}
      <Box>
        {blocInfoPanels.items.map((item, index) => (
          <Box key={item.id}>
            <BlocItemRowMolecule
              props={{
                shortLabel: item.shortLabel,
                longLabel: item.longLabel,
                isExpanded: item.isExpanded,
                onShortLabelChange: (value) =>
                  blocInfoPanels.onItemShortLabelChange(item.id, value),
                onLongLabelChange: (value) =>
                  blocInfoPanels.onItemLongLabelChange(item.id, value),
                onRemove: () => blocInfoPanels.onRemoveItem(item.id),
                onToggleExpand: () => blocInfoPanels.onToggleExpand(item.id),
              }}
            />
            {item.isExpanded && (
              <Box
                sx={{ mx: 2, mb: 1, height: 240, bgcolor: "grey.200", borderRadius: 1 }}
              />
            )}
            {index < blocInfoPanels.items.length - 1 && <Divider />}
          </Box>
        ))}
      </Box>

      <Divider />

      {/* Add Bloc Button */}
      <Box sx={{ py: 0.5 }}>
        <ButtonAtom
          props={{
            label: "Add Bloc +",
            onClick: blocInfoPanels.onAddBloc,
            variant: "text",
            fullWidth: true,
          }}
        />
      </Box>
    </Box>
  );
}
