

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { NavItem } from "@/components/atoms/surface/DrawerAtom";
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
    sectionLabel: PLATFORM_LABELS[platform],
    isExpanded: platformExpanded[platform],
    toggleButton: {
      icon: platformExpanded[platform]
        ? ("expandLess" as const)
        : ("expandMore" as const),
      onClick: () => handleTogglePlatform(platform),
    },
    titleLabel: "Title:",
    titleCopyButton: {
      label: "Copy",
      onClick: () => {},
    },
    descLabel: "Desc:",
    descCopyButton: {
      label: "Copy",
      onClick: () => {},
    },
    urlsLabel: "URLs:",
    urlsAddButton: {
      label: "Add",
      onClick: () => handleAddUrl(platform),
    },
    urlItems: platformUrlItems[platform].map((urlItem) => ({
      key: urlItem.id,
      nameLabel: "Name:",
      nameField: {
        placeholder: "text field...",
        value: urlItem.nameValue,
        onChange: (value: string) =>
          handleUrlNameBlur(platform, urlItem.id, value),
      },
      urlLabel: "URL:",
      urlField: {
        placeholder: "text field...",
        value: urlItem.urlValue,
        onChange: (value: string) =>
          handleUrlValueBlur(platform, urlItem.id, value),
      },
      removeButton: {
        icon: "removeCircle" as const,
        onClick: () => handleRemoveUrl(platform, urlItem.id),
      },
    })),
    previewLabel: "[Preview]",
    previewField: {
      placeholder: "Text area Field...",
      value: platformPreviewValues[platform],
      onChange: (value: string) => handlePreviewBlur(platform, value),
    },
  }));

  const quoteItems = MOCK_QUOTE_KEYS.map((key) => ({
    key,
    quoteLabel: "- quote:",
    quoteField: {
      placeholder: "text field...",
      value: quoteValues[key],
      onChange: (value: string) => handleQuoteBlur(key, value),
    },
    copyButton: { label: "Copy", onClick: () => {} },
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
        informProps: {
          infoSectionLabel: "Information Field:",
          idLabel: "ID:",
          idValueLabel: "#01 - [uuid]",
          titleLabel: "Title:",
          titleField: {
            placeholder: "text field...",
            value: titleValue,
            onChange: handleTitleBlur,
          },
          statusLabel: "Status:",
          statusValueLabel: "- there are some changes... -",
          saveButton: { label: "Save", onClick: () => {} },
        },
        clerkingSectionLabel: "Clerking Field:",
        titleJpLabel: "Title[JP]:",
        titleJpField: {
          placeholder: "text field...",
          value: titleJpValue,
          onChange: handleTitleJpBlur,
        },
        titleEnLabel: "Title[EN]:",
        titleEnField: {
          placeholder: "text field...",
          value: titleEnValue,
          onChange: handleTitleEnBlur,
        },
        symbolLabel: "Symbol:",
        symbolField: {
          placeholder: "...",
          value: symbolValue,
          onChange: handleSymbolBlur,
        },
        picsLabel: "Pics:",
        picsField: {
          placeholder: "...",
          value: picsValue,
          onChange: handlePicsBlur,
        },
        postingPreviewLabel: "Posting Preview:",
        platformPreviews,
        quotesSectionLabel: "Quotes Field:",
        quoteItems,
      },
    },
  };
}
