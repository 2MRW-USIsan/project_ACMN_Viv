import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { NavigationListType } from "@/types/navigation";
import { NavigationItem } from "./NavigationItem";

export interface NavigationListProps {
  props: NavigationListType;
}
export function NavigationList({ props }: NavigationListProps) {
  return (
    <AlignLayout column={1}>
      {props.navItemList.map((navItem) => (
        <NavigationItem props={navItem} key={navItem.key} />
      ))}
    </AlignLayout>
  );
}
