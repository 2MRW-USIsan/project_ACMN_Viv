import { NavigationLayoutType } from "@/types/navigation";
import { Label } from "../../atoms/display/Label";
import { AlignLayout } from "../../atoms/layout/AlignLayout";
import { AppBar } from "../../atoms/surface/AppBar";
import { Drawer } from "../../atoms/surface/Drawer";
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
      <AppBar props={props.appBar}>
        <Label props={props.title} style={"TITLE"} />
      </AppBar>
      <Drawer props={props.drawer}>
        <NavigationList props={navigationProps} />
      </Drawer>
      {children}
    </AlignLayout>
  );
}
