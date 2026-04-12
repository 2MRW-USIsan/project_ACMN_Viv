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
      title?: string;
    };
    drawer: {
      open: boolean;
      onClose: () => void;
    };
    title?: string;
    navigation: NavigationOrganismProps["props"];
  };
  children?: React.ReactNode;
}

export function NavigationLayoutOrganism({
  props,
  children,
}: NavigationLayoutOrganismProps) {
  const title = props.title ?? props.appBar.title ?? "";

  return (
    <>
      <AppBarAtom props={props.appBar}>
        <Typography variant="h6" noWrap>
          {title}
        </Typography>
      </AppBarAtom>
      <DrawerAtom props={props.drawer}>
        <NavigationOrganism props={props.navigation} />
      </DrawerAtom>
      {children}
    </>
  );
}
