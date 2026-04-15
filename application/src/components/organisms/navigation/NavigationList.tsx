import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { NavigationItem, NavigationItemType } from "./NavigationItem";

export type NavigationListType = {
  navItemList: NavigationItemType[];
};
export interface NavigationOrganismProps {
  props: NavigationListType;
}
export function NavigationList({ props }: NavigationOrganismProps) {
  return (
    <AlignLayout column={1}>
      {props.navItemList.map((navItem) => (
        <NavigationItem props={navItem} key={navItem.key} />
      ))}
    </AlignLayout>
  );
}
