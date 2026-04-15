import { AppBarType, DrawerType, LabelAtomType } from "@/types/ui";
import { LabelAtom } from "../../atoms/display/LabelAtom";
import { AlignLayout } from "../../atoms/layout/AlignLayout";
import { AppBarAtom } from "../../atoms/surface/AppBarAtom";
import { DrawerAtom } from "../../atoms/surface/DrawerAtom";
import { NavigationList, NavigationListType } from "./NavigationList";

interface NavigationLayoutOrganismProps {
  props: {
    appBar: AppBarType;
    drawer: DrawerType;
    title: LabelAtomType;
    navigation: NavigationListType;
  };
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
        <NavigationList props={props.navigation} />
      </DrawerAtom>
      {children}
    </AlignLayout>
  );
}
