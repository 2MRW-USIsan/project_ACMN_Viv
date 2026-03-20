"use client";

import { AppBarAtom } from "@/components/atoms/AppBarAtom";
import { DrawerAtom } from "@/components/atoms/DrawerAtom";
import { MenuIconButtonAtom } from "@/components/atoms/MenuIconButtonAtom";
import { FlexLayoutAtom } from "@/components/atoms/FlexLayoutAtom";
import { ToolbarSpacerAtom } from "@/components/atoms/ToolbarSpacerAtom";
import { MainContentAtom } from "@/components/atoms/MainContentAtom";
import { ListAtom } from "@/components/atoms/ListAtom";
import { NavItemMolecule } from "@/components/molecules/NavItemMolecule";

interface AppPageOrganismProps {
  props: {
    todoDrawerOpen: boolean;
    todoDrawerOnToggle: () => void;
    todoRouteList: { label: string; href: string }[];
  };
  children?: React.ReactNode;
}

export function AppPageOrganism({ props, children }: AppPageOrganismProps) {
  return (
    <FlexLayoutAtom>
      <AppBarAtom>
        <MenuIconButtonAtom
          props={{ onClick: props.todoDrawerOnToggle, ariaLabel: "Toggle navigation menu" }}
        />
      </AppBarAtom>
      <DrawerAtom props={{ open: props.todoDrawerOpen }}>
        <ToolbarSpacerAtom />
        <ListAtom>
          {props.todoRouteList.map((route) => (
            <NavItemMolecule key={route.href} props={route} />
          ))}
        </ListAtom>
      </DrawerAtom>
      <MainContentAtom>
        <ToolbarSpacerAtom />
        {children}
      </MainContentAtom>
    </FlexLayoutAtom>
  );
}
