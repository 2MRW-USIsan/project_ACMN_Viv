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
  const appBarProps = {
    title: props.todoTitle,
    onMenuToggle: props.todoDrawerOnToggle,
  };
  const navDrawerProps = {
    open: props.todoDrawerOpen,
    onClose: props.todoDrawerOnToggle,
    routeList: props.todoRouteList,
  };

  return (
    <FlexLayoutAtom>
      <AppBarMolecule props={appBarProps} />
      <NavDrawerMolecule props={navDrawerProps} />
      <MainContentAtom>{children}</MainContentAtom>
    </FlexLayoutAtom>
  );
}
