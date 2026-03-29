"use client";

import { Stack, List, Divider } from "@mui/material";
import { ListItemButtonAtom } from "@/components/atoms/ListItemButtonAtom";
import { SelectAtom } from "@/components/atoms/SelectAtom";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { ButtonAtom } from "@/components/atoms/ButtonAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";

type NavItem = {
  href: string;
  label: string;
};

type ConfigurationsNavigation = {
  configOptions: string[];
  selectedConfig: string;
  onConfigSelect: (config: string) => void;
  form: {
    name: string;
    value: string;
    onNameChange: (name: string) => void;
    onValueChange: (value: string) => void;
    onSave: () => void;
    onCancel: () => void;
    isLoading: boolean;
  };
};

interface NavigationOrganismProps {
  props: {
    navItems: NavItem[];
    currentPath: string;
    configurations?: ConfigurationsNavigation;
  };
}

export function NavigationOrganism({ props }: NavigationOrganismProps) {
  if (props.configurations) {
    return (
      <Stack spacing={2} p={2}>
        <LabelAtom props={{ text: "Configurations", variant: "h6", fontWeight: "bold" }} />
        <SelectAtom
          props={{
            label: "設定ファイル",
            value: props.configurations.selectedConfig,
            options: props.configurations.configOptions,
            onChange: props.configurations.onConfigSelect,
            fullWidth: true,
          }}
        />
        <Divider />
        <LabelAtom props={{ text: "編集フォーム", variant: "subtitle1" }} />
        <TextFieldAtom
          props={{
            label: "名前",
            defaultValue: props.configurations.form.name,
            onBlur: props.configurations.form.onNameChange,
            fullWidth: true,
          }}
        />
        <TextFieldAtom
          props={{
            label: "値",
            defaultValue: props.configurations.form.value,
            onBlur: props.configurations.form.onValueChange,
            fullWidth: true,
            multiline: true,
            rows: 4,
          }}
        />
        <Stack direction="row" spacing={1}>
          <ButtonAtom
            props={{
              label: "保存",
              onClick: props.configurations.form.onSave,
              isLoading: props.configurations.form.isLoading,
              fullWidth: true,
            }}
          />
          <ButtonAtom
            props={{
              label: "キャンセル",
              variant: "outlined",
              onClick: props.configurations.form.onCancel,
              fullWidth: true,
            }}
          />
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack>
      <List>
        {props.navItems.map((item) => (
          <ListItemButtonAtom
            key={item.href}
            props={{
              href: item.href,
              label: item.label,
              isActive: props.currentPath === item.href,
            }}
          />
        ))}
      </List>
    </Stack>
  );
}
