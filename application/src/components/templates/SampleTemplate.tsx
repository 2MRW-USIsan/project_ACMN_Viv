"use client";

import { Stack, Divider, Paper } from "@mui/material";
import { SampleViewModel } from "@/hooks/sample/viewModel/useSampleComposer";
import { SampleListOrganism } from "@/components/organisms/SampleListOrganism";
import { SampleEditorOrganism } from "@/components/organisms/SampleEditorOrganism";
import { NavigationLayoutOrganism } from "@/components/organisms/NavigationLayoutOrganism";

interface SampleTemplateProps {
  props: SampleViewModel;
}

export function SampleTemplate({ props }: SampleTemplateProps) {
  return (
    <NavigationLayoutOrganism props={{}}>
      <Stack spacing={3} p={3} maxWidth={900} mx="auto">
        <Paper elevation={2} sx={{ p: 3 }}>
          <SampleEditorOrganism props={props.editor} />
        </Paper>
        <Divider />
        <Paper elevation={2} sx={{ p: 3 }}>
          <SampleListOrganism props={props.itemList} />
        </Paper>
      </Stack>
    </NavigationLayoutOrganism>
  );
}
