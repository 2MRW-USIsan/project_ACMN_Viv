import {
  NavigationLayoutType
} from "@/types/navigation";
import { LabelAtom } from "../../atoms/display/LabelAtom";
import { AlignLayout } from "../../atoms/layout/AlignLayout";
import { AppBarAtom } from "../../atoms/surface/AppBarAtom";
import { DrawerAtom } from "../../atoms/surface/DrawerAtom";
import { NavigationList } from "./NavigationList";

interface NavigationLayoutOrganismProps {
  props: NavigationLayoutType;
  children?: React.ReactNode;
}

export function NavigationLayoutOrganism({
  props,
  children,
}: NavigationLayoutOrganismProps) {
  return (
    <AlignLayout>
      <AppBarAtom props={props.appBar}>
        <LabelAtom props={props.title} style={"TITLE"} />
      </AppBarAtom>
      <DrawerAtom props={props.drawer}>
        <NavigationList props={navigationProps} />
      </DrawerAtom>
      {children}
    </AlignLayout>
  );
}
