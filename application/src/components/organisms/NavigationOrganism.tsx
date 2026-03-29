"use client";

import { Stack } from "@mui/material";
import { NavItem } from "@/components/atoms/DrawerAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { DividerAtom } from "@/components/atoms/DividerAtom";
import { SelectAtom } from "@/components/atoms/SelectAtom";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { ButtonAtom } from "@/components/atoms/ButtonAtom";
import { NavLinkAtom } from "@/components/atoms/NavLinkAtom";

export interface NavigationConfigurations {
  selectItems: string[];
  selectedItem: string;
  onSelect: (item: string) => void;
  editValue: string;
  onEditBlur: (value: string) => void;
  onLoad: () => void;
  onNew: () => void;
  onSave: () => void;
  onChange: () => void;
  onDelete: () => void;
}

interface NavigationOrganismProps {
  props: {
    navItems: NavItem[];
    activePath: string;
    onNavigate: (href: string) => void;
    configurations?: NavigationConfigurations;
  };
}

export function NavigationOrganism({ props }: NavigationOrganismProps) {
  const activeItem = props.navItems.find((item) => item.href === props.activePath);
  const otherItems = props.navItems.filter((item) => item.href !== props.activePath);

  return (
    <Stack spacing={1} p={1}>
      {activeItem && (
        <>
          <LabelAtom
            props={{
              text: `✓ ${activeItem.label}`,
              variant: "subtitle1",
              color: "success.main",
              fontWeight: "bold",
            }}
          />
          <DividerAtom />
        </>
      )}

      {props.configurations && (
        <Stack spacing={1} pt={0.5}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <LabelAtom props={{ text: "Sets:", variant: "body2" }} />
            <SelectAtom
              props={{
                value: props.configurations.selectedItem,
                options: props.configurations.selectItems,
                onChange: props.configurations.onSelect,
              }}
            />
            <ButtonAtom
              props={{
                label: "Load",
                onClick: props.configurations.onLoad,
                size: "small",
              }}
            />
            <ButtonAtom
              props={{
                label: "New",
                onClick: props.configurations.onNew,
                size: "small",
              }}
            />
          </Stack>

          <Stack direction="row" alignItems="center" spacing={0.5}>
            <LabelAtom props={{ text: "Name:", variant: "body2" }} />
            <TextFieldAtom
              props={{
                placeholder: "text field...",
                defaultValue: props.configurations.editValue,
                onBlur: props.configurations.onEditBlur,
                size: "small",
              }}
            />
            <ButtonAtom
              props={{
                label: "Save",
                onClick: props.configurations.onSave,
                size: "small",
              }}
            />
            <ButtonAtom
              props={{
                label: "change",
                onClick: props.configurations.onChange,
                size: "small",
              }}
            />
          </Stack>

          <Stack direction="row" justifyContent="flex-end">
            <ButtonAtom
              props={{
                label: "- Delete ? -",
                onClick: props.configurations.onDelete,
                size: "small",
                variant: "text",
                color: "error",
              }}
            />
          </Stack>
        </Stack>
      )}

      <Stack spacing={0.5} pt={0.5}>
        {otherItems.map((item) => (
          <NavLinkAtom
            key={item.href}
            props={{
              label: item.label,
              onClick: () => props.onNavigate(item.href),
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
}
