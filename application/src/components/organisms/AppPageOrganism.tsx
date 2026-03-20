"use client";

import { DrawerAtom } from "@/components/atoms/DrawerAtom";
import { FlexLayoutAtom } from "@/components/atoms/FlexLayoutAtom";
import { ToolbarSpacerAtom } from "@/components/atoms/ToolbarSpacerAtom";
import { MainContentAtom } from "@/components/atoms/MainContentAtom";
import { ListAtom } from "@/components/atoms/ListAtom";
import { AppBarMolecule } from "@/components/molecules/AppBarMolecule";
import { NavItemMolecule } from "@/components/molecules/NavItemMolecule";

interface AppPageOrganismProps {
  props: {
    todoTitle: string;
    todoDrawerOpen: boolean;
    todoDrawerOnToggle: () => void;
    todoRouteList: { label: string; href: string }[];
  };
  children?: React.ReactNode;
}

export function AppPageOrganism({ props, children }: AppPageOrganismProps) {
  return (
    <FlexLayoutAtom>
      <AppBarMolecule props={{ title: props.todoTitle, onMenuToggle: props.todoDrawerOnToggle }} />
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
