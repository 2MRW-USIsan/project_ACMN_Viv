"use client";

import { AppBarAtom } from "@/components/atoms/AppBarAtom";
import { DrawerAtom } from "@/components/atoms/DrawerAtom";

interface NavigationLayoutOrganismProps {
  props: {
    appBar: {
      title: string;
      onMenuOpen: () => void;
    };
    drawer: {
      open: boolean;
      onClose: () => void;
    };
  };
  children?: React.ReactNode;
}

export function NavigationLayoutOrganism({
  props,
  children,
}: NavigationLayoutOrganismProps) {
  return (
    <>
      <AppBarAtom props={props.appBar} />
      <DrawerAtom props={props.drawer}>
        <>TODO: NavigationOrganism</>
      </DrawerAtom>
      {children}
    </>
  );
}
