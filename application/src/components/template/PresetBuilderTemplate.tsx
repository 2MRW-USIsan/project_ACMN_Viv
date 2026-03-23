"use client";

import { Stack, Toolbar } from "@mui/material";
import { PresetBuilderViewModel } from "@/hooks/preset-builder/viewModel/usePresetBuilderComposer";
import { NavigationLayoutOrganism } from "@/components/organisms/navigation/NavigationLayoutOrganism";
import { PresetBuilderHeaderOrganism } from "@/components/organisms/preset-builder/PresetBuilderHeaderOrganism";
import { PresetSheetOrganism } from "@/components/organisms/preset-builder/PresetSheetOrganism";
import { OrdersSheetOrganism } from "@/components/organisms/preset-builder/OrdersSheetOrganism";

interface PresetBuilderTemplateProps {
  props: PresetBuilderViewModel;
}

export function PresetBuilderTemplate({ props }: PresetBuilderTemplateProps) {
  return (
    <NavigationLayoutOrganism props={props.navigation}>
      <Toolbar />
      <Stack spacing={2} p={2}>
        <PresetBuilderHeaderOrganism props={props.header} />
        <Stack direction="row" spacing={2}>
          <PresetSheetOrganism props={props.presetSheet} />
          <OrdersSheetOrganism props={props.ordersSheet} />
        </Stack>
      </Stack>
    </NavigationLayoutOrganism>
  );
}
