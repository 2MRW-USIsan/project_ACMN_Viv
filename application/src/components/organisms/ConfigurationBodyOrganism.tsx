"use client";

import { useState } from "react";
import {
  Stack,
  Box,
  List,
  ListItem,
  Divider,
  Typography,
} from "@mui/material";
import { BlocItem } from "@/hooks/configurations/viewModel/useConfigurationsComposer";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { IconButtonAtom } from "@/components/atoms/IconButtonAtom";
import { ChipCheckboxAtom } from "@/components/atoms/ChipCheckboxAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { DividerAtom } from "@/components/atoms/DividerAtom";

interface ConfigurationBodyOrganismProps {
  props: {
    blocs: BlocItem[];
    onKeyChange: (id: string, value: string) => void;
    onLabelChange: (id: string, value: string) => void;
    onRemoveBloc: (id: string) => void;
    onAddBloc: () => void;
  };
}

export function ConfigurationBodyOrganism({
  props,
}: ConfigurationBodyOrganismProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [selectedBlocTypes, setSelectedBlocTypes] = useState<
    Record<string, Set<string>>
  >({});

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleBlocType = (blocId: string, typeName: string) => {
    setSelectedBlocTypes((prev) => {
      const current = new Set(prev[blocId] ?? []);
      if (current.has(typeName)) {
        current.delete(typeName);
      } else {
        current.add(typeName);
      }
      return { ...prev, [blocId]: current };
    });
  };

  return (
    <Stack spacing={2} p={3} maxWidth={960} mx="auto">
      <Stack direction="row" alignItems="center" spacing={1}>
        <LabelAtom
          props={{ text: "Configurations Form:", variant: "subtitle1" }}
        />
      </Stack>
      <DividerAtom />

      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <List disablePadding>
          {props.blocs.map((bloc, index) => {
            const isExpanded = expandedIds.has(bloc.id);
            const checkedTypes = selectedBlocTypes[bloc.id] ?? new Set<string>();

            return (
              <Box key={bloc.id}>
                {index > 0 && <Divider />}

                {/* Panel header */}
                <ListItem
                  disablePadding
                  sx={{
                    px: 2,
                    py: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    flexWrap: "wrap",
                  }}
                >
                  <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
                    Blocs:
                  </Typography>

                  <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
                    Key:
                  </Typography>
                  <Box sx={{ width: 160 }}>
                    <TextFieldAtom
                      props={{
                        placeholder: "text field...",
                        defaultValue: bloc.keyValue,
                        onBlur: (value) => props.onKeyChange(bloc.id, value),
                        size: "small",
                        fullWidth: true,
                      }}
                    />
                  </Box>

                  <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
                    Label:
                  </Typography>
                  <Box sx={{ flex: 1, minWidth: 160 }}>
                    <TextFieldAtom
                      props={{
                        placeholder: "text field...",
                        defaultValue: bloc.labelValue,
                        onBlur: (value) =>
                          props.onLabelChange(bloc.id, value),
                        size: "small",
                        fullWidth: true,
                      }}
                    />
                  </Box>

                  <IconButtonAtom
                    props={{
                      icon: "removeCircle",
                      onClick: () => props.onRemoveBloc(bloc.id),
                      color: "default",
                    }}
                  />
                  <IconButtonAtom
                    props={{
                      icon: isExpanded ? "expandLess" : "expandMore",
                      onClick: () => toggleExpanded(bloc.id),
                    }}
                  />
                </ListItem>

                {/* Expanded panel content */}
                {isExpanded && (
                  <Box
                    sx={{
                      borderTop: "1px solid",
                      borderColor: "divider",
                      px: 3,
                      py: 2,
                    }}
                  >
                    {/* Bloc Select chips */}
                    <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                      <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
                        Bloc Select:
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {bloc.availableBlocTypes.map((typeName) => (
                          <ChipCheckboxAtom
                            key={typeName}
                            props={{
                              label: typeName,
                              checked: checkedTypes.has(typeName),
                              onChange: () =>
                                toggleBlocType(bloc.id, typeName),
                            }}
                          />
                        ))}
                      </Stack>
                    </Stack>

                    <DividerAtom />

                    {/* Sub-sections for each checked bloc type */}
                    {bloc.availableBlocTypes.map((typeName) => {
                      if (!checkedTypes.has(typeName)) return null;
                      return (
                        <Box key={typeName} mt={2}>
                          <Typography variant="body2" mb={1}>
                            {typeName}:
                          </Typography>
                          <DividerAtom />
                          <Box
                            sx={{
                              mt: 1,
                              height: 120,
                              bgcolor: "grey.200",
                              borderRadius: 1,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography variant="body1" color="text.secondary">
                              Blank
                            </Typography>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </Box>
            );
          })}

          {/* Add Bloc row */}
          <Divider />
          <ListItem
            disablePadding
            sx={{
              px: 2,
              py: 1.5,
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
              "&:hover": { bgcolor: "action.hover" },
            }}
            onClick={props.onAddBloc}
          >
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography variant="body2">Add Bloc:</Typography>
              <IconButtonAtom
                props={{ icon: "add", onClick: () => {} }}
              />
            </Stack>
          </ListItem>
        </List>
      </Box>
    </Stack>
  );
}
