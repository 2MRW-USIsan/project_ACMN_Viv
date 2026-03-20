"use client";

import { FlexLayoutAtom } from "@/components/atoms/FlexLayoutAtom";
import { MainContentAtom } from "@/components/atoms/MainContentAtom";
import { AppBarMolecule } from "@/components/molecules/AppBarMolecule";
import { NavDrawerMolecule } from "@/components/molecules/NavDrawerMolecule";

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
      <NavDrawerMolecule props={{ open: props.todoDrawerOpen, routeList: props.todoRouteList }} />
      <MainContentAtom>{children}</MainContentAtom>
    </FlexLayoutAtom>
  );
}
