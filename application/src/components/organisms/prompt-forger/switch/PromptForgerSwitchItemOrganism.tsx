import { ForgerSwitchGrpPanel } from "@/hooks/promptForger/viewModel/usePromptForgerComposer";
import { Box, Divider, Stack } from "@mui/material";
import { LabelAtom } from "../../../atoms/display/LabelAtom";
import { SwitchAtom } from "../../../atoms/inputs/SwitchAtom";

interface PromptForgerSwitchItemOrganismProps {
  props: ForgerSwitchGrpPanel;
}

export function PromptForgerSwitchItemOrganism({
  props,
}: PromptForgerSwitchItemOrganismProps) {
  return (
    <Box>
      <LabelAtom props={props.grpLabel} />
      <Divider sx={{ my: 0.5 }} />

      <Box sx={{ display: "flex", flexWrap: "wrap", pt: 0.5 }}>
        {props.switchItems.map((item) => (
          <Box key={item.key} sx={{ width: "50%", minWidth: 160 }}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <LabelAtom props={item.itemLabel} />
              <SwitchAtom props={item.switchControl} />
            </Stack>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
