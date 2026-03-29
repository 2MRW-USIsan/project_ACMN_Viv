"use client";

import { AppBarAtom } from "@/components/atoms/AppBarAtom";
import { DrawerAtom, NavItem } from "@/components/atoms/DrawerAtom";
import {
  NavigationConfigurations,
  NavigationOrganism,
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
    navigation: {
      navItems: NavItem[];
      activePath: string;
      onNavigate: (href: string) => void;
      configurations?: NavigationConfigurations;
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
        <NavigationOrganism props={props.navigation} />
      </DrawerAtom>
      {children}
    </>
  );
}
