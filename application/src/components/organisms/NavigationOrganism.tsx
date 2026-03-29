"use client";

import { Stack } from "@mui/material";
import { LabelAtom, LabelAtomProps } from "@/components/atoms/LabelAtom";
import { DividerAtom } from "@/components/atoms/DividerAtom";
import { SelectAtom, SelectAtomProps } from "@/components/atoms/SelectAtom";
import { TextFieldAtom, TextFieldAtomProps } from "@/components/atoms/TextFieldAtom";
import { ButtonAtom, ButtonAtomProps } from "@/components/atoms/ButtonAtom";
import { NavLinkAtom, NavLinkAtomProps } from "@/components/atoms/NavLinkAtom";

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

export interface NavigationOrganismProps {
  props: {
    activeItemLabel?: LabelAtomProps["props"];
    links: NavLinkAtomProps["props"][];
    configurations?: NavigationConfigurations;
  };
}

export function NavigationOrganism({ props }: NavigationOrganismProps) {
  return (
    <Stack spacing={1} p={1}>
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

      <Stack spacing={0.5} pt={0.5}>
        {props.links.map((linkProps) => (
          <NavLinkAtom key={linkProps.label} props={linkProps} />
        ))}
      </Stack>
    </Stack>
  );
}
