"use client";

import { Stack, Box, Divider } from "@mui/material";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { ButtonAtom } from "@/components/atoms/ButtonAtom";
import { ConfigSetSelectorMolecule } from "@/components/molecules/ConfigSetSelectorMolecule";
import { ConfigNameEditorMolecule } from "@/components/molecules/ConfigNameEditorMolecule";
import { BlocPanelHeaderMolecule } from "@/components/molecules/BlocPanelHeaderMolecule";
import { ConfigurationsViewModel } from "@/hooks/configurations/viewModel/useConfigurationsComposer";

interface ConfigurationsContentOrganismProps {
  props: ConfigurationsViewModel;
}

export function ConfigurationsContentOrganism({ props }: ConfigurationsContentOrganismProps) {
  return (
    <Stack spacing={2} p={3}>
      {/* Configurations section header */}
      <Stack>
        <LabelAtom props={{ text: "Configurations:", variant: "subtitle1", fontWeight: "bold" }} />
        <Divider />
      </Stack>

      {/* Config Sets row */}
      <Stack sx={{ pl: 4 }}>
        <ConfigSetSelectorMolecule props={props.configSelector} />
      </Stack>

      {/* Config Name row */}
      <Stack sx={{ pl: 4 }}>
        <ConfigNameEditorMolecule props={props.configNameEditor} />
      </Stack>

      {/* Config Panel section header */}
      <Stack>
        <LabelAtom props={{ text: "Config Panel:", variant: "subtitle1", fontWeight: "bold" }} />
      </Stack>

      {/* Panel list bordered box */}
      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
        }}
      >
        {props.configPanelList.panels.map((panel, index) => (
          <Stack key={panel.id}>
            {index > 0 && <Divider />}
            <BlocPanelHeaderMolecule
              props={{
                blocKey: panel.key,
                label: panel.label,
                isExpanded: panel.isExpanded,
                onBlocKeyChange: panel.onKeyChange,
                onLabelChange: panel.onLabelChange,
                onRemove: panel.onRemove,
                onToggleExpand: panel.onToggleExpand,
              }}
            />
            {panel.isExpanded && (
              <Box
                sx={{
                  m: 1,
                  backgroundColor: "grey.200",
                  minHeight: 320,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 1,
                }}
              >
                <LabelAtom
                  props={{ text: "TODO Area", variant: "body1", fontWeight: "bold" }}
                />
              </Box>
            )}
          </Stack>
        ))}

        {/* Add panel button */}
        <Divider />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
          sx={{ py: 1 }}
        >
          <LabelAtom props={{ text: "Add Bloc Panel:", variant: "body1", color: "text.secondary" }} />
          <ButtonAtom
            props={{
              label: "+",
              onClick: props.configPanelList.onAddPanel,
              variant: "text",
              color: "primary",
            }}
          />
        </Stack>
      </Box>
    </Stack>
  );
}
