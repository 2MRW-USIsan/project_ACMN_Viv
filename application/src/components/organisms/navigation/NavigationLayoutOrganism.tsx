"use client";
import { AppBarAtom } from "@/components/atoms/AppBarAtom";
import { DrawerAtom } from "@/components/atoms/DrawerAtom";
import { NavigationItemOrganism } from "@/components/organisms/navigation/NavigationItemOrganism";
import { NavItem } from "@/types/navigation";

interface NavigationLayoutOrganismProps {
  props: {
    appBarTitle: string;
    isDrawerOpen: boolean;
    navItems: NavItem[];
    onMenuClick: () => void;
    onNavItemClick: (href: string) => void;
  };
  children?: React.ReactNode;
}

export function NavigationLayoutOrganism({
  props,
  children,
}: NavigationLayoutOrganismProps) {
  const { appBarTitle, isDrawerOpen, navItems, onMenuClick, onNavItemClick } =
    props;

  return (
    <>
      <AppBarAtom props={{ title: appBarTitle, onMenuClick }} />
      <DrawerAtom props={{ open: isDrawerOpen, onOverlayClick: onMenuClick }}>
        <NavigationItemOrganism props={{ navItems, onNavItemClick }} />
      </DrawerAtom>
      {children}
    </>
  );
}
