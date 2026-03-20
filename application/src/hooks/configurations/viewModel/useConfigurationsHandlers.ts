"use client";

import { ConfigurationsContexts } from "@/hooks/configurations/state/useConfigurationsContext";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ConfigurationsHandlers {
  // ハンドラの詳細は工程2〜3で追加する
}

export function useConfigurationsHandlers(_contexts: ConfigurationsContexts) {
  const handlers: ConfigurationsHandlers = {};

  return { handlers };
}
