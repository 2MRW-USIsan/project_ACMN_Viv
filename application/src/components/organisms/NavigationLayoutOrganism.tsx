"use client";

import { AppBarAtom } from "@/components/atoms/AppBarAtom";
import { DrawerAtom } from "@/components/atoms/DrawerAtom";
import {
  NavigationOrganism,
  NavigationOrganismProps,
} from "@/components/organisms/NavigationOrganism";

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
    navigation: NavigationOrganismProps["props"];
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
        <NavigationOrganism props={props.navigation} />
      </DrawerAtom>
      {children}
    </>
  );
}
