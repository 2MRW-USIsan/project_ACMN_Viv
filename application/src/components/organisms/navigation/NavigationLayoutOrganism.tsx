import { Typography } from "@mui/material";
import { AppBarAtom } from "../../atoms/surface/AppBarAtom";
import { DrawerAtom } from "../../atoms/surface/DrawerAtom";
import {
  NavigationOrganism,
  NavigationOrganismProps,
} from "./NavigationOrganism";

interface NavigationLayoutOrganismProps {
  props: {
    appBar: {
      onMenuOpen: () => void;
    };
    drawer: {
      open: boolean;
      onClose: () => void;
    };
    title: string;
    navigation: NavigationOrganismProps["props"];
  };
  children?: React.ReactNode;
}

export function NavigationLayoutOrganism({
  props,
  children,
}: NavigationLayoutOrganismProps) {
  return (
    <>
      <AppBarAtom props={props.appBar}>
        <Typography variant="h6" noWrap>
          {props.title}
        </Typography>
      </AppBarAtom>
      <DrawerAtom props={props.drawer}>
        <NavigationOrganism props={props.navigation} />
      </DrawerAtom>
      {children}
    </>
  );
}
