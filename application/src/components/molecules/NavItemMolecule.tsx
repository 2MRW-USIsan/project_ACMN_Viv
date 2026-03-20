"use client";

import { ListItemAtom } from "@/components/atoms/ListItemAtom";
import { NavLinkButtonAtom } from "@/components/atoms/NavLinkButtonAtom";
import { ListItemTextAtom } from "@/components/atoms/ListItemTextAtom";

interface NavItemMoleculeProps {
  props: {
    label: string;
    href: string;
  };
}

export function NavItemMolecule({ props }: NavItemMoleculeProps) {
  return (
    <ListItemAtom>
      <NavLinkButtonAtom props={{ href: props.href }}>
        <ListItemTextAtom props={{ primary: props.label }} />
      </NavLinkButtonAtom>
    </ListItemAtom>
  );
}
