"use client";
import { NavItem } from "@/components/atoms/surface/DrawerAtom";
import { PresetBuilderViewModel } from "@/hooks/preset-builder/viewModel/usePresetBuilderComposer";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS: NavItem[] = [
  { href: "/configurations", label: "Configurations" },
  { href: "/preset-builder", label: "Preset-Builder" },
  { href: "/prompt-forger", label: "Prompt-Forger" },
  { href: "/posting-clerk", label: "Posting-Clerk" },
];

const MOCK_GROUP_OPTIONS = ["Value", "Group A", "Group B", "Group C"];

const MOCK_PRESET_ITEMS = [
  { id: "preset-01", label: "# Item 01" },
  { id: "preset-02", label: "# Item 02" },
  { id: "preset-03", label: "# Item 03" },
  { id: "preset-04", label: "# Item 04" },
  { id: "preset-05", label: "# Item 05" },
  { id: "preset-06", label: "# Item 06" },
  { id: "preset-07", label: "# Item 07" },
  { id: "preset-08", label: "# Item 08" },
];

interface PresetBuilderViewModelMocksReturns {
  viewModel: PresetBuilderViewModel;
}

export function usePresetBuilderViewModelMocks(): PresetBuilderViewModelMocksReturns {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(MOCK_GROUP_OPTIONS[0]);
  const [nameEditValue, setNameEditValue] = useState("");
  const [selectedPresetId, setSelectedPresetId] = useState<string>(
    MOCK_PRESET_ITEMS[0].id,
  );
  const [titleValue, setTitleValue] = useState("");
  const [presetsTemplateValue, setPresetsTemplateValue] = useState("");
  const [orderPresetsValue, setOrderPresetsValue] = useState("");

  const pathname = usePathname();
  const router = useRouter();

  const handleMenuOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);
  const handleNavigate = (href: string) => {
    router.push(href);
    setDrawerOpen(false);
  };
  const handleGroupSelect = (value: string) => setSelectedGroup(value);
  const handleNameEditBlur = (value: string) => setNameEditValue(value);
  const handleSelectPreset = (id: string) => setSelectedPresetId(id);
  const handleTitleBlur = (value: string) => setTitleValue(value);
  const handlePresetsTemplateBlur = (value: string) =>
    setPresetsTemplateValue(value);
  const handleOrderPresetsBlur = (value: string) => setOrderPresetsValue(value);

  const linksAbove = NAV_ITEMS.filter(
    (item) => item.href !== pathname && item.href === "/configurations",
  ).map((item) => ({
    label: item.label,
    onClick: () => handleNavigate(item.href),
  }));

  const linksBelow = NAV_ITEMS.filter(
    (item) => item.href !== pathname && item.href !== "/configurations",
  ).map((item) => ({
    label: item.label,
    onClick: () => handleNavigate(item.href),
  }));

  const activeItemLabel = (() => {
    const activeItem = NAV_ITEMS.find((item) => item.href === pathname);
    if (!activeItem) return undefined;
    return {
      text: `✓ ${activeItem.label}`,
      variant: "subtitle1" as const,
      color: "success.main",
      fontWeight: "bold" as const,
    };
  })();

  return {
    viewModel: {
      navigationLayout: {
        appBar: {
          onMenuOpen: handleMenuOpen,
        },
        drawer: {
          open: drawerOpen,
          onClose: handleDrawerClose,
        },
        title: "ACMN",
        navigation: {
          linksAbove,
          activeItemLabel,
          links: linksBelow,
          presets: {
            groupLabel: { text: "Group:" },
            groupSelect: {
              value: selectedGroup,
              options: MOCK_GROUP_OPTIONS,
              onChange: handleGroupSelect,
            },
            loadButton: { label: "Load", onClick: () => {} },
            newButton: { label: "New", onClick: () => {} },
            nameLabel: { text: "Name:" },
            nameField: {
              placeholder: "text field...",
              value: nameEditValue,
              onChange: handleNameEditBlur,
            },
            saveButton: { label: "Save", onClick: () => {} },
            changeButton: { label: "change", onClick: () => {} },
            deleteButton: { label: "- Delete ? -", onClick: () => {} },
            presetItemPanels: MOCK_PRESET_ITEMS.map((item) => ({
              key: item.id,
              radio: {
                label: item.label,
                checked: selectedPresetId === item.id,
                onChange: () => handleSelectPreset(item.id),
              },
              label: { text: item.label },
            })),
          },
        },
      },
      presetBuilderBody: {
        informProps: {
          infoSectionLabel: { text: "Information Field:" },
          idLabel: { text: "ID:" },
          idValueLabel: { text: "#01 - [uuid]" },
          titleLabel: { text: "Title:" },
          titleField: {
            placeholder: "text field...",
            value: titleValue,
            onChange: handleTitleBlur,
          },
          statusLabel: { text: "Status:" },
          statusValueLabel: { text: "- there are some changes... -" },
          saveButton: { label: "Save", onClick: () => {} },
        },
        builderProps: {
          label: { text: "Builders Field:" },
          shuffleButton: { label: "Shuffle", onClick: () => {} },
          copyButton: { label: "Copy", onClick: () => {} },
          pasteButton: { label: "Paste", onClick: () => {} },
          resetButton: { label: "Reset", onClick: () => {} },
          clearButton: { label: "Clear", onClick: () => {} },
          presetsTemplateLabel: { text: "Presets Template:" },
          presetsTemplateField: {
            placeholder: "Text area Field...",
            value: presetsTemplateValue,
            onChange: handlePresetsTemplateBlur,
          },
          orderPresetsLabel: { text: "Order Presets:" },
          orderPresetsField: {
            placeholder: "Text area Field...",
            value: orderPresetsValue,
            onChange: handleOrderPresetsBlur,
          },
        },
      },
    },
  };
}
