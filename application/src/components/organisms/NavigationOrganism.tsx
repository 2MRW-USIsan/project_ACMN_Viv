"use client";

import { Stack } from "@mui/material";
import { NavItem } from "@/components/atoms/DrawerAtom";
import { ListItemButtonAtom } from "@/components/atoms/ListItemButtonAtom";
import { SelectAtom } from "@/components/atoms/SelectAtom";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";

export interface NavigationConfigurations {
  selectItems: string[];
  selectedItem: string;
  onSelect: (item: string) => void;
  editValue: string;
  onEditBlur: (value: string) => void;
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
  return (
    <Stack spacing={1}>
      {props.navItems.map((item) => (
        <ListItemButtonAtom
          key={item.href}
          props={{
            label: item.label,
            isActive: props.activePath === item.href,
            onClick: () => props.onNavigate(item.href),
          }}
        />
      ))}
      {props.configurations && (
        <Stack spacing={1} px={1} pt={1}>
          <LabelAtom props={{ text: "コンフィグ選択", variant: "caption" }} />
          <SelectAtom
            props={{
              value: props.configurations.selectedItem,
              options: props.configurations.selectItems,
              onChange: props.configurations.onSelect,
              fullWidth: true,
            }}
          />
          <LabelAtom props={{ text: "編集", variant: "caption" }} />
          <TextFieldAtom
            props={{
              label: "設定値",
              defaultValue: props.configurations.editValue,
              onBlur: props.configurations.onEditBlur,
              fullWidth: true,
              multiline: true,
              rows: 3,
            }}
          />
        </Stack>
      )}
    </Stack>
  );
}
