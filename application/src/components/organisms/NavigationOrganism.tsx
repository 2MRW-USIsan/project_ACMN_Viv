"use client";

import { Stack } from "@mui/material";
import { LabelAtom, LabelAtomProps } from "@/components/atoms/LabelAtom";
import { DividerAtom } from "@/components/atoms/DividerAtom";
import { SelectAtom, SelectAtomProps } from "@/components/atoms/SelectAtom";
import { TextFieldAtom, TextFieldAtomProps } from "@/components/atoms/TextFieldAtom";
import { ButtonAtom, ButtonAtomProps } from "@/components/atoms/ButtonAtom";
import { NavLinkAtom, NavLinkAtomProps } from "@/components/atoms/NavLinkAtom";
import { RadioButtonAtom, RadioButtonAtomProps } from "@/components/atoms/RadioButtonAtom";

export interface NavigationConfigurations {
  setLabel: LabelAtomProps["props"];
  select: SelectAtomProps["props"];
  loadButton: ButtonAtomProps["props"];
  newButton: ButtonAtomProps["props"];
  nameLabel: LabelAtomProps["props"];
  editField: TextFieldAtomProps["props"];
  saveButton: ButtonAtomProps["props"];
  changeButton: ButtonAtomProps["props"];
  deleteButton: ButtonAtomProps["props"];
}

export interface PresetItemPanel {
  key: string;
  radio: RadioButtonAtomProps["props"];
  label: LabelAtomProps["props"];
}

export interface NavigationPresets {
  groupLabel: LabelAtomProps["props"];
  groupSelect: SelectAtomProps["props"];
  loadButton: ButtonAtomProps["props"];
  newButton: ButtonAtomProps["props"];
  nameLabel: LabelAtomProps["props"];
  nameField: TextFieldAtomProps["props"];
  saveButton: ButtonAtomProps["props"];
  changeButton: ButtonAtomProps["props"];
  deleteButton: ButtonAtomProps["props"];
  presetItemPanels: PresetItemPanel[];
}

export interface NavigationOrganismProps {
  props: {
    linksAbove?: NavLinkAtomProps["props"][];
    activeItemLabel?: LabelAtomProps["props"];
    links: NavLinkAtomProps["props"][];
    configurations?: NavigationConfigurations;
    presets?: NavigationPresets;
  };
}

export function NavigationOrganism({ props }: NavigationOrganismProps) {
  return (
    <Stack spacing={1} p={1}>
      {props.linksAbove && props.linksAbove.length > 0 && (
        <Stack spacing={0.5} pb={0.5}>
          {props.linksAbove.map((linkProps) => (
            <NavLinkAtom key={linkProps.label} props={linkProps} />
          ))}
        </Stack>
      )}

      {props.activeItemLabel && (
        <>
          <LabelAtom props={props.activeItemLabel} />
          <DividerAtom />
        </>
      )}

      {props.configurations && (
        <Stack spacing={1} pt={0.5}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <LabelAtom props={props.configurations.setLabel} />
            <SelectAtom props={props.configurations.select} />
            <ButtonAtom props={props.configurations.loadButton} />
            <ButtonAtom props={props.configurations.newButton} />
          </Stack>

          <Stack direction="row" alignItems="center" spacing={0.5}>
            <LabelAtom props={props.configurations.nameLabel} />
            <TextFieldAtom props={props.configurations.editField} />
            <ButtonAtom props={props.configurations.saveButton} />
            <ButtonAtom props={props.configurations.changeButton} />
          </Stack>

          <Stack direction="row" justifyContent="flex-end">
            <ButtonAtom props={props.configurations.deleteButton} />
          </Stack>
        </Stack>
      )}

      {props.presets && (
        <Stack spacing={1} pt={0.5}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <LabelAtom props={props.presets.groupLabel} />
            <SelectAtom props={props.presets.groupSelect} />
            <ButtonAtom props={props.presets.loadButton} />
            <ButtonAtom props={props.presets.newButton} />
          </Stack>

          <Stack direction="row" alignItems="center" spacing={0.5}>
            <LabelAtom props={props.presets.nameLabel} />
            <TextFieldAtom props={props.presets.nameField} />
            <ButtonAtom props={props.presets.saveButton} />
            <ButtonAtom props={props.presets.changeButton} />
          </Stack>

          <Stack direction="row" justifyContent="flex-end">
            <ButtonAtom props={props.presets.deleteButton} />
          </Stack>

          <DividerAtom />

          <Stack spacing={0.5}>
            {props.presets.presetItemPanels.map((item) => (
              <Stack key={item.key} direction="row" alignItems="center">
                <RadioButtonAtom props={item.radio} />
                <LabelAtom props={item.label} />
              </Stack>
            ))}
          </Stack>
        </Stack>
      )}

      <Stack spacing={0.5} pt={0.5}>
        {props.links.map((linkProps) => (
          <NavLinkAtom key={linkProps.label} props={linkProps} />
        ))}
      </Stack>
    </Stack>
  );
}
