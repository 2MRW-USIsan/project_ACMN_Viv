"use client";

import { ConfigurationsContexts } from "@/hooks/configurations/state/useConfigurationsContext";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ConfigurationsProperties {
  // プロパティの詳細は工程2〜3で追加する
}

export function useConfigurationsProperties(_contexts: ConfigurationsContexts) {
  const properties: ConfigurationsProperties = {};

  return { properties };
}
