"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PresetBuilderViewModel } from "@/hooks/preset-builder/viewModel/usePresetBuilderComposer";

// 暫定モックフック。ViewModel実装後に削除予定。実装ルール適用外。
export function usePresetBuilderViewModelMocks() {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState("Value");
  const [presetName, setPresetName] = useState("[My Presets]");
  const [hasChanges, setHasChanges] = useState(true);
  const [presetSheetValue, setPresetSheetValue] = useState("Value");
  const [ordersSheetValue, setOrdersSheetValue] = useState("Value");

  const viewModel: PresetBuilderViewModel = {
    navigation: {
      appBarTitle: "Preset-Builder Page",
      isDrawerOpen,
      navItems: [
        {
          label: "Configurations Page",
          href: "/configurations",
          isActive: false,
        },
        {
          label: "Prompt-Forger Page",
          href: "/prompt-forger",
          isActive: false,
        },
        {
          label: "Preset-Builder Page",
          href: "/preset-builder",
          isActive: true,
        },
        {
          label: "Posting-Clerk Page",
          href: "/posting-clerk",
          isActive: false,
        },
      ],
      onMenuClick: () => setIsDrawerOpen((prev) => !prev),
      onNavItemClick: (href: string) => router.push(href),
    },
    header: {
      presetOptions: ["Value", "Preset A", "Preset B"],
      selectedPreset,
      onPresetChange: (value: string) => setSelectedPreset(value),
      onLoad: () => {
        setPresetSheetValue(selectedPreset);
        setHasChanges(false);
      },
      presetName,
      hasChanges,
      onChange: () => setPresetName("[New Preset Name]"),
      onSave: () => setHasChanges(false),
    },
    presetSheet: {
      value: presetSheetValue,
      onValueChange: (value: string) => {
        setPresetSheetValue(value);
        setHasChanges(true);
      },
      onShuffle: () => {
        const chars = presetSheetValue.split("");
        for (let i = chars.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [chars[i], chars[j]] = [chars[j], chars[i]];
        }
        setPresetSheetValue(chars.join(""));
        setHasChanges(true);
      },
      onCopy: () => {
        navigator.clipboard.writeText(presetSheetValue);
      },
    },
    ordersSheet: {
      value: ordersSheetValue,
      onValueChange: (value: string) => setOrdersSheetValue(value),
      onPaste: () => setOrdersSheetValue(presetSheetValue),
      onReset: () => setOrdersSheetValue(presetSheetValue),
      onClear: () => setOrdersSheetValue(""),
    },
  };

  return { viewModel };
}
