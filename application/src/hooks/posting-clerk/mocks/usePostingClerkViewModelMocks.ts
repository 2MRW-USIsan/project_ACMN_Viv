"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { NavItem } from "@/components/atoms/DrawerAtom";
import { PostingClerkViewModel } from "@/hooks/posting-clerk/viewModel/usePostingClerkComposer";

const NAV_ITEMS: NavItem[] = [
  { href: "/configurations", label: "Configurations" },
  { href: "/preset-builder", label: "Preset-Builder" },
  { href: "/prompt-forger", label: "Prompt-Forger" },
  { href: "/posting-clerk", label: "Posting-Clerk" },
];

const MOCK_GROUP_OPTIONS = ["Value", "Group A", "Group B", "Group C"];

const MOCK_POSTING_ITEMS = [
  { id: "item-01", label: "# Item 01" },
  { id: "item-02", label: "# Item 02" },
  { id: "item-03", label: "# Item 03" },
  { id: "item-04", label: "# Item 04" },
  { id: "item-05", label: "# Item 05" },
  { id: "item-06", label: "# Item 06" },
  { id: "item-07", label: "# Item 07" },
  { id: "item-08", label: "# Item 08" },
];

const MOCK_QUOTE_KEYS = [
  "quote-01",
  "quote-02",
  "quote-03",
  "quote-04",
  "quote-05",
  "quote-06",
  "quote-07",
  "quote-08",
];

const PLATFORM_KEYS = ["patreon", "pixiv"] as const;
type PlatformKey = (typeof PLATFORM_KEYS)[number];

const PLATFORM_LABELS: Record<PlatformKey, string> = {
  patreon: "Patreon Preview:",
  pixiv: "Pixiv Preview:",
};

interface UrlItem {
  id: string;
  nameValue: string;
  urlValue: string;
}

interface PostingClerkViewModelMocksReturns {
  viewModel: PostingClerkViewModel;
}

export function usePostingClerkViewModelMocks(): PostingClerkViewModelMocksReturns {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(MOCK_GROUP_OPTIONS[0]);
  const [nameEditValue, setNameEditValue] = useState("");
  const [selectedItemId, setSelectedItemId] = useState<string>(
    MOCK_POSTING_ITEMS[0].id,
  );

  const [titleValue, setTitleValue] = useState("");
  const [titleJpValue, setTitleJpValue] = useState("");
  const [titleEnValue, setTitleEnValue] = useState("");
  const [symbolValue, setSymbolValue] = useState("");
  const [picsValue, setPicsValue] = useState("");

  const [platformExpanded, setPlatformExpanded] = useState<
    Record<PlatformKey, boolean>
  >({
    patreon: true,
    pixiv: true,
  });

  const [platformUrlItems, setPlatformUrlItems] = useState<
    Record<PlatformKey, UrlItem[]>
  >({
    patreon: [
      { id: "url-p-01", nameValue: "", urlValue: "" },
      { id: "url-p-02", nameValue: "", urlValue: "" },
    ],
    pixiv: [
      { id: "url-px-01", nameValue: "", urlValue: "" },
      { id: "url-px-02", nameValue: "", urlValue: "" },
    ],
  });

  const [platformPreviewValues, setPlatformPreviewValues] = useState<
    Record<PlatformKey, string>
  >({
    patreon: "",
    pixiv: "",
  });

  const [quoteValues, setQuoteValues] = useState<Record<string, string>>(
    Object.fromEntries(MOCK_QUOTE_KEYS.map((k) => [k, ""])),
  );

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
  const handleSelectItem = (id: string) => setSelectedItemId(id);
  const handleTitleBlur = (value: string) => setTitleValue(value);
  const handleTitleJpBlur = (value: string) => setTitleJpValue(value);
  const handleTitleEnBlur = (value: string) => setTitleEnValue(value);
  const handleSymbolBlur = (value: string) => setSymbolValue(value);
  const handlePicsBlur = (value: string) => setPicsValue(value);

  const handleTogglePlatform = (platform: PlatformKey) =>
    setPlatformExpanded((prev) => ({ ...prev, [platform]: !prev[platform] }));

  const handleAddUrl = (platform: PlatformKey) =>
    setPlatformUrlItems((prev) => ({
      ...prev,
      [platform]: [
        ...prev[platform],
        { id: `url-${platform}-${Date.now()}`, nameValue: "", urlValue: "" },
      ],
    }));

  const handleRemoveUrl = (platform: PlatformKey, id: string) =>
    setPlatformUrlItems((prev) => ({
      ...prev,
      [platform]: prev[platform].filter((item) => item.id !== id),
    }));

  const handleUrlNameBlur = (
    platform: PlatformKey,
    id: string,
    value: string,
  ) =>
    setPlatformUrlItems((prev) => ({
      ...prev,
      [platform]: prev[platform].map((item) =>
        item.id === id ? { ...item, nameValue: value } : item,
      ),
    }));

  const handleUrlValueBlur = (
    platform: PlatformKey,
    id: string,
    value: string,
  ) =>
    setPlatformUrlItems((prev) => ({
      ...prev,
      [platform]: prev[platform].map((item) =>
        item.id === id ? { ...item, urlValue: value } : item,
      ),
    }));

  const handlePreviewBlur = (platform: PlatformKey, value: string) =>
    setPlatformPreviewValues((prev) => ({ ...prev, [platform]: value }));

  const handleQuoteBlur = (key: string, value: string) =>
    setQuoteValues((prev) => ({ ...prev, [key]: value }));

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

  const platformPreviews = PLATFORM_KEYS.map((platform) => ({
    key: platform,
    sectionLabel: {
      text: PLATFORM_LABELS[platform],
      variant: "subtitle1" as const,
    },
    isExpanded: platformExpanded[platform],
    toggleButton: {
      icon: platformExpanded[platform]
        ? ("expandLess" as const)
        : ("expandMore" as const),
      onClick: () => handleTogglePlatform(platform),
    },
    titleLabel: { text: "Title:", variant: "body2" as const },
    titleCopyButton: {
      label: "Copy",
      onClick: () => {},
      size: "small" as const,
    },
    descLabel: { text: "Desc:", variant: "body2" as const },
    descCopyButton: {
      label: "Copy",
      onClick: () => {},
      size: "small" as const,
    },
    urlsLabel: { text: "URLs:", variant: "body2" as const },
    urlsAddButton: {
      label: "Add",
      onClick: () => handleAddUrl(platform),
      size: "small" as const,
    },
    urlItems: platformUrlItems[platform].map((urlItem) => ({
      key: urlItem.id,
      nameLabel: { text: "Name:", variant: "body2" as const },
      nameField: {
        placeholder: "text field...",
        defaultValue: urlItem.nameValue,
        onBlur: (value: string) =>
          handleUrlNameBlur(platform, urlItem.id, value),
        size: "small" as const,
      },
      urlLabel: { text: "URL:", variant: "body2" as const },
      urlField: {
        placeholder: "text field...",
        defaultValue: urlItem.urlValue,
        onBlur: (value: string) =>
          handleUrlValueBlur(platform, urlItem.id, value),
        size: "small" as const,
        fullWidth: true,
      },
      removeButton: {
        icon: "removeCircle" as const,
        onClick: () => handleRemoveUrl(platform, urlItem.id),
      },
    })),
    previewLabel: { text: "[Preview]", variant: "body2" as const },
    previewField: {
      placeholder: "Text area Field...",
      defaultValue: platformPreviewValues[platform],
      onBlur: (value: string) => handlePreviewBlur(platform, value),
      multiline: true,
      rows: 8,
      fullWidth: true,
    },
  }));

  const quoteItems = MOCK_QUOTE_KEYS.map((key) => ({
    key,
    quoteLabel: { text: "- quote:", variant: "body2" as const },
    quoteField: {
      placeholder: "text field...",
      defaultValue: quoteValues[key],
      onBlur: (value: string) => handleQuoteBlur(key, value),
      size: "small" as const,
      fullWidth: true,
    },
    copyButton: { label: "Copy", onClick: () => {}, size: "small" as const },
  }));

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
            presetItemPanels: MOCK_POSTING_ITEMS.map((item) => ({
              key: item.id,
              radio: {
                checked: selectedItemId === item.id,
                onChange: () => handleSelectItem(item.id),
              },
              label: { text: item.label, variant: "body2" as const },
            })),
          },
        },
      },
      postingClerkBody: {
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
        clerkingSectionLabel: { text: "Clerking Field:", variant: "subtitle1" },
        titleJpLabel: { text: "Title[JP]:", variant: "body2" },
        titleJpField: {
          placeholder: "text field...",
          value: titleJpValue,
          onChange: handleTitleJpBlur,
          size: "small",
          fullWidth: true,
        },
        titleEnLabel: { text: "Title[EN]:", variant: "body2" },
        titleEnField: {
          placeholder: "text field...",
          value: titleEnValue,
          onChange: handleTitleEnBlur,
          size: "small",
          fullWidth: true,
        },
        symbolLabel: { text: "Symbol:", variant: "body2" },
        symbolField: {
          placeholder: "...",
          value: symbolValue,
          onChange: handleSymbolBlur,
          size: "small",
        },
        picsLabel: { text: "Pics:", variant: "body2" },
        picsField: {
          placeholder: "...",
          value: picsValue,
          onChange: handlePicsBlur,
          size: "small",
        },
        postingPreviewLabel: { text: "Posting Preview:", variant: "subtitle1" },
        platformPreviews,
        quotesSectionLabel: { text: "Quotes Field:", variant: "subtitle1" },
        quoteItems,
      },
    },
  };
}
