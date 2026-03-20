"use client";

import { DrawerAtom } from "@/components/atoms/DrawerAtom";
import { ListAtom } from "@/components/atoms/ListAtom";
import { ToolbarSpacerAtom } from "@/components/atoms/ToolbarSpacerAtom";
import { NavItemMolecule } from "@/components/molecules/NavItemMolecule";

interface NavDrawerMoleculeProps {
  props: {
    open: boolean;
    onClose: () => void;
    routeList: { label: string; href: string }[];
  };
}

export function NavDrawerMolecule({ props }: NavDrawerMoleculeProps) {
  return (
    <DrawerAtom props={{ open: props.open, onClose: props.onClose }}>
      <ToolbarSpacerAtom />
      <ListAtom>
        {props.routeList.map((route) => (
          <NavItemMolecule key={route.href} props={route} />
        ))}
      </ListAtom>
    </DrawerAtom>
  );
}
