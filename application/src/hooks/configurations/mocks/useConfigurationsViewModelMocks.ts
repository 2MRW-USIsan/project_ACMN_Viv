"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ConfigurationsViewModel } from "@/hooks/configurations/viewModel/useConfigurationsComposer";

// 暫定モックフック。ViewModel実装後に削除予定。実装ルール適用外。
export function useConfigurationsViewModelMocks() {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const viewModel: ConfigurationsViewModel = {
    navigation: {
      appBarTitle: "Configuration Page",
      isDrawerOpen,
      navItems: [
        { label: "Configurations Page", href: "/configurations", isActive: true },
        { label: "Prompt-Forger Page", href: "/prompt-forger", isActive: false },
        { label: "Preset-Builder Page", href: "/preset-builder", isActive: false },
        { label: "Posting-Clerk Page", href: "/posting-clerk", isActive: false },
      ],
      onMenuClick: () => setIsDrawerOpen((prev) => !prev),
      onNavItemClick: (href: string) => router.push(href),
    },
  };

  return { viewModel };
}
