"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { NavItem } from "@/components/atoms/surface/DrawerAtom";
import { PresetBuilderViewModel } from "@/hooks/preset-builder/viewModel/usePresetBuilderComposer";

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
          title: "ACMN",
          onMenuOpen: handleMenuOpen,
        },
        drawer: {
          open: drawerOpen,
          onClose: handleDrawerClose,
        },
        navigation: {
          linksAbove,
          activeItemLabel,
          links: linksBelow,
          presets: {
            groupLabel: { text: "Group:", variant: "body2" },
            groupSelect: {
              value: selectedGroup,
              options: MOCK_GROUP_OPTIONS,
              onChange: handleGroupSelect,
            },
            loadButton: { label: "Load", onClick: () => {}, size: "small" },
            newButton: { label: "New", onClick: () => {}, size: "small" },
            nameLabel: { text: "Name:", variant: "body2" },
            nameField: {
              placeholder: "text field...",
              value: nameEditValue,
              onChange: handleNameEditBlur,
              size: "small",
            },
            saveButton: { label: "Save", onClick: () => {}, size: "small" },
            changeButton: { label: "change", onClick: () => {}, size: "small" },
            deleteButton: {
              label: "- Delete ? -",
              onClick: () => {},
              size: "small",
              variant: "text",
              color: "error",
            },
            presetItemPanels: MOCK_PRESET_ITEMS.map((item) => ({
              key: item.id,
              radio: {
                checked: selectedPresetId === item.id,
                onChange: () => handleSelectPreset(item.id),
              },
              label: { text: item.label, variant: "body2" as const },
            })),
          },
        },
      },
      presetBuilderBody: {
        infoSectionLabel: { text: "Information Field:", variant: "subtitle1" },
        idLabel: { text: "ID:", variant: "body2" },
        idValueLabel: { text: "#01 - [uuid]", variant: "body2" },
        titleLabel: { text: "Title:", variant: "body2" },
        titleField: {
          placeholder: "text field...",
          defaultValue: titleValue,
          onBlur: handleTitleBlur,
          size: "small",
          fullWidth: true,
        },
        statusLabel: { text: "Status:", variant: "body2" },
        statusValueLabel: {
          text: "- there are some changes... -",
          variant: "body2",
        },
        saveButton: { label: "Save", onClick: () => {}, size: "small" },
        buildersSectionLabel: { text: "Builders Field:", variant: "subtitle1" },
        shuffleButton: { label: "Shuffle", onClick: () => {}, size: "small" },
        copyButton: { label: "Copy", onClick: () => {}, size: "small" },
        pasteButton: { label: "Paste", onClick: () => {}, size: "small" },
        resetButton: { label: "Reset", onClick: () => {}, size: "small" },
        clearButton: { label: "Clear", onClick: () => {}, size: "small" },
        presetsTemplateLabel: { text: "Presets Template:", variant: "body2" },
        presetsTemplateField: {
          placeholder: "Text area Field...",
          defaultValue: presetsTemplateValue,
          onBlur: handlePresetsTemplateBlur,
          multiline: true,
          rows: 14,
          fullWidth: true,
        },
        orderPresetsLabel: { text: "Order Presets:", variant: "body2" },
        orderPresetsField: {
          placeholder: "Text area Field...",
          defaultValue: orderPresetsValue,
          onBlur: handleOrderPresetsBlur,
          multiline: true,
          rows: 14,
          fullWidth: true,
        },
      },
    },
  };
}
