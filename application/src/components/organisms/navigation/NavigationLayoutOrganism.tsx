import {
  LegacyNavigationType,
  NavigationItemType,
  NavigationLayoutType,
  NavigationListType,
  NavigationType,
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

function isNavigationListType(
  navigation: NavigationType,
): navigation is NavigationListType {
  return "navItemList" in navigation;
}

function mapLegacyLinkToNavItem(
  link: LegacyNavigationType["links"][number],
): NavigationItemType {
  return {
    key: link.label,
    navigation: {
      isCurrent: false,
      title: { text: link.label },
    },
    configSelect: undefined,
    dataSelect: undefined,
  };
}

function toNavigationListType(navigation: NavigationType): NavigationListType {
  if (isNavigationListType(navigation)) {
    return navigation;
  }

  const navItemList: NavigationItemType[] = [
    ...navigation.linksAbove.map(mapLegacyLinkToNavItem),
    {
      key: navigation.activeItemLabel?.text ?? "current",
      navigation: {
        isCurrent: true,
        title: navigation.activeItemLabel ?? { text: "Current" },
      },
      configSelect: navigation.configurations
        ? {
            label: {
              group: navigation.configurations.setLabel,
              name: navigation.configurations.nameLabel,
            },
            button: {
              load: navigation.configurations.loadButton,
              new: navigation.configurations.newButton,
              deletion: navigation.configurations.deleteButton,
            },
            configSelect: navigation.configurations.select,
            nameField: navigation.configurations.editField,
          }
        : undefined,
      dataSelect: navigation.presets
        ? {
            label: {
              group: navigation.presets.groupLabel,
              name: navigation.presets.nameLabel,
            },
            button: {
              load: navigation.presets.loadButton,
              new: navigation.presets.newButton,
              deletion: navigation.presets.deleteButton,
            },
            groupSelect: navigation.presets.groupSelect,
            nameField: navigation.presets.nameField,
            radioGroup: navigation.presets.presetItemPanels.map((panel) => ({
              key: panel.key,
              radio: panel.radio,
            })),
          }
        : undefined,
    },
    ...navigation.links.map(mapLegacyLinkToNavItem),
  ];

  return { navItemList };
}

export function NavigationLayoutOrganism({
  props,
  children,
}: NavigationLayoutOrganismProps) {
  const navigationProps = toNavigationListType(props.navigation);

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
