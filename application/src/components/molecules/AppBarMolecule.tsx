"use client";

import { AppBarAtom } from "@/components/atoms/AppBarAtom";
import { MenuIconButtonAtom } from "@/components/atoms/MenuIconButtonAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";

interface AppBarMoleculeProps {
  props: {
    title: string;
    onMenuToggle: () => void;
  };
}

export function AppBarMolecule({ props }: AppBarMoleculeProps) {
  const menuIconButtonProps = {
    onClick: props.onMenuToggle,
    ariaLabel: "Toggle navigation menu",
  };
  const labelProps = {
    text: props.title,
    variant: "h6" as const,
    color: "inherit",
    fontWeight: "bold" as const,
  };

  return (
    <AppBarAtom>
      <MenuIconButtonAtom props={menuIconButtonProps} />
      <LabelAtom props={labelProps} />
    </AppBarAtom>
  );
}
