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
  return (
    <AppBarAtom>
      <MenuIconButtonAtom
        props={{
          onClick: props.onMenuToggle,
          ariaLabel: "Toggle navigation menu",
        }}
      />
      <LabelAtom
        props={{
          text: props.title,
          variant: "h6",
          color: "inherit",
          fontWeight: "bold",
        }}
      />
    </AppBarAtom>
  );
}
