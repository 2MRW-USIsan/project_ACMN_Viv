"use client";

import { Stack, Divider, Paper } from "@mui/material";
import { SampleViewModel } from "@/hooks/sample/viewModel/useSampleComposer";
import { SampleListOrganism } from "@/components/organisms/SampleListOrganism";
import { SampleEditorOrganism } from "@/components/organisms/SampleEditorOrganism";

interface SampleTemplateProps {
  props: SampleViewModel;
}

const SampleTemplate = ({ props }: SampleTemplateProps) => (
  <Stack spacing={3} p={3} maxWidth={900} mx="auto">
    <Paper elevation={2} sx={{ p: 3 }}>
      <SampleEditorOrganism props={props.editor} />
    </Paper>
    <Divider />
    <Paper elevation={2} sx={{ p: 3 }}>
      <SampleListOrganism props={props.itemList} />
    </Paper>
  </Stack>
);

export { SampleTemplate };
