"use client";

import { IconButtonAtom } from "@/components/atoms/IconButtonAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { SwitchAtom } from "@/components/atoms/SwitchAtom";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { GridLayoutAtom } from "@/components/atoms/GridLayoutAtom";
import { DividerAtom } from "@/components/atoms/DividerAtom";
import { ListFrameAtom } from "@/components/atoms/ListFrameAtom";
import { ListRowAtom } from "@/components/atoms/ListRowAtom";
import { PanelFrameAtom } from "@/components/atoms/PanelFrameAtom";
import { StackAtom } from "@/components/atoms/StackAtom";
import { SwitchItemSection } from "@/hooks/configurations/viewModel/useConfigurationsComposer";

interface SwitchItemSectionOrganismProps {
  props: SwitchItemSection;
}

export function SwitchItemSectionOrganism({
  props,
}: SwitchItemSectionOrganismProps) {
  return (
    <PanelFrameAtom props={{ mt: 1 }}>
      <ListFrameAtom>
        {/* Randomize row */}
        <ListRowAtom props={{ variant: "plain" }}>
          <LabelAtom props={props.randomizeLabel} />
          <SwitchAtom props={props.randomizeSwitch} />
        </ListRowAtom>

        <DividerAtom />

        {/* Switch item rows */}
        {props.switchItemPanels.map((item, index) => (
          <GridLayoutAtom key={item.key}>
            {index > 0 && <DividerAtom />}
            <ListRowAtom>
              <LabelAtom props={item.labelLabel} />
              <GridLayoutAtom props={{ width: 120 }}>
                <TextFieldAtom props={item.labelField} />
              </GridLayoutAtom>

              <LabelAtom props={item.valueLabel} />
              <GridLayoutAtom props={{ flex: 1, minWidth: 120 }}>
                <TextFieldAtom props={item.valueField} />
              </GridLayoutAtom>

              <LabelAtom props={item.altLabel} />
              <GridLayoutAtom props={{ flex: 1, minWidth: 120 }}>
                <TextFieldAtom props={item.altField} />
              </GridLayoutAtom>

              <IconButtonAtom props={item.removeButton} />
            </ListRowAtom>
          </GridLayoutAtom>
        ))}

        {/* Add Switch row */}
        <DividerAtom />
        <ListRowAtom props={{ variant: "footer" }}>
          <StackAtom props={{ direction: "row", alignItems: "center", spacing: 0.5 }}>
            <LabelAtom props={props.addSwitchRowLabel} />
            <IconButtonAtom props={props.addSwitchButton} />
          </StackAtom>
        </ListRowAtom>
      </ListFrameAtom>
    </PanelFrameAtom>
  );
}

interface SwitchItemSectionOrganismProps {
  props: SwitchItemSection;
}

export function SwitchItemSectionOrganism({
  props,
}: SwitchItemSectionOrganismProps) {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        overflow: "hidden",
        mt: 1,
      }}
    >
      <List disablePadding>
        {/* Randomize row */}
        <ListItem
          disablePadding
          sx={{ px: 2, py: 1, display: "flex", alignItems: "center", gap: 1 }}
        >
          <LabelAtom props={props.randomizeLabel} />
          <SwitchAtom props={props.randomizeSwitch} />
        </ListItem>

        <Divider />

        {/* Switch item rows */}
        {props.switchItemPanels.map((item, index) => (
          <Box key={item.key}>
            {index > 0 && <Divider />}
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
              <LabelAtom props={item.labelLabel} />
              <GridLayoutAtom props={{ width: 120 }}>
                <TextFieldAtom props={item.labelField} />
              </GridLayoutAtom>

              <LabelAtom props={item.valueLabel} />
              <GridLayoutAtom props={{ flex: 1, minWidth: 120 }}>
                <TextFieldAtom props={item.valueField} />
              </GridLayoutAtom>

              <LabelAtom props={item.altLabel} />
              <GridLayoutAtom props={{ flex: 1, minWidth: 120 }}>
                <TextFieldAtom props={item.altField} />
              </GridLayoutAtom>

              <IconButtonAtom props={item.removeButton} />
            </ListItem>
          </Box>
        ))}

        {/* Add Switch row */}
        <Divider />
        <ListItem
          disablePadding
          sx={{
            px: 2,
            py: 1.5,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <LabelAtom props={props.addSwitchRowLabel} />
            <IconButtonAtom props={props.addSwitchButton} />
          </Stack>
        </ListItem>
      </List>
    </Box>
  );
}
