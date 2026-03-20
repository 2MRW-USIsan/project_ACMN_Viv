"use client";

import { useConfigurationsFetchReducer } from "@/hooks/configurations/state/useConfigurationsFetchReducer";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ConfigurationsFetchItem {
  // フェッチ状態の詳細は工程3で追加する
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ConfigurationsRequest {
  // APIリクエストの詳細は工程3で追加する
}

export interface ConfigurationsServiceReturns {
  fetchItem: ConfigurationsFetchItem;
  request: ConfigurationsRequest;
}

export function useConfigurationsService(): ConfigurationsServiceReturns {
  // フェッチ状態の取得・利用は工程3で追加する
  useConfigurationsFetchReducer();

  return {
    fetchItem: {},
    request: {},
  };
}
