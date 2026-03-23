"use client";
import { ListAtom } from "@/components/atoms/ListAtom";
import { NavItemAtom } from "@/components/atoms/NavItemAtom";
import { NavItem } from "@/types/navigation";

interface NavigationItemOrganismProps {
  props: {
    navItems: NavItem[];
    onNavItemClick: (href: string) => void;
  };
}

export function NavigationItemOrganism({ props }: NavigationItemOrganismProps) {
  return (
    <ListAtom>
      {props.navItems.map((item) => (
        <NavItemAtom
          key={item.href}
          props={{
            label: item.label,
            isActive: item.isActive,
            onClick: () => props.onNavItemClick(item.href),
          }}
        />
      ))}
    </ListAtom>
  );
}
