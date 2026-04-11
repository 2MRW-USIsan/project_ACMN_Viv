import { ButtonAtom } from "@/components/atoms/inputs/ButtonAtom";
import { LabelAtom } from "@/components/atoms/display/LabelAtom";
import { SelectAtom } from "@/components/atoms/inputs/SelectAtom";
import { ForgerSelectGrpPanel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { Box, Divider, Stack } from "@mui/material";

interface PromptForgerSelectItemOrganismProps {
  props: ForgerSelectGrpPanel;
}

export function PromptForgerSelectItemOrganism({
  props,
}: PromptForgerSelectItemOrganismProps) {
  return (
    <Box>
      <LabelAtom props={props.grpLabel} />
      <Divider sx={{ my: 0.5 }} />

      <Stack spacing={0.5} pt={0.5}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <LabelAtom props={props.shuffleAllLabel} />
          <ButtonAtom props={props.shuffleButton} />
        </Stack>

        {props.selectRows.map((row) => (
          <Stack key={row.key} direction="row" alignItems="center" spacing={1}>
            <LabelAtom props={row.label} />
            <Box sx={{ flex: 1 }}>
              <SelectAtom props={row.select} />
            </Box>
            <ButtonAtom props={row.reloadButton} />
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
