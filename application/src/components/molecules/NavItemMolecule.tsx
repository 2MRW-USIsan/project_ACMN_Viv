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
  const navLinkButtonProps = { href: props.href };
  const listItemTextProps = { primary: props.label };

  return (
    <ListItemAtom>
      <NavLinkButtonAtom props={navLinkButtonProps}>
        <ListItemTextAtom props={listItemTextProps} />
      </NavLinkButtonAtom>
    </ListItemAtom>
  );
}
