"use client";

import { useMemo } from "react";
import type { JsonValidationStatus } from "@/types/viewer/orderJson";
import type { ViewerContexts } from "@/hooks/viewer/reducer/useViewerReducer";
import type { OrderJsonRecord } from "@/types/viewer/orderJson";

export type ViewerProperties = {
  // Left panel — [リクエスト用JSON情報]
  requestJsonText: string;
  yamlError: string;
  hasYamlData: boolean;
  // Right panel — [オーダー用JSON情報]
  orderJsonText: string;
  dbRecord: OrderJsonRecord | null;
  validationStatus: JsonValidationStatus;
  validationError: string;
  hasDiff: boolean;
  // Register / Delete
  isRegisterEnabled: boolean;
  isDeleteEnabled: boolean;
  isConfirmDialogOpen: boolean;
  // Navigation
  isNextEnabled: boolean;
};

export function useViewerProperties(contexts: ViewerContexts): ViewerProperties {
  const { state } = contexts.reducer;

  const isRegisterEnabled = state.order.validationStatus !== "invalid";
  const isDeleteEnabled = state.order.dbRecord !== null;

  const isNextEnabled = useMemo(
    () => !state.order.hasDiff && state.order.validationStatus !== "invalid",
    [state.order.hasDiff, state.order.validationStatus],
  );

  return {
    requestJsonText: state.request.text,
    yamlError: state.request.yamlError,
    hasYamlData: state.request.hasYamlData,
    orderJsonText: state.order.text,
    dbRecord: state.order.dbRecord,
    validationStatus: state.order.validationStatus,
    validationError: state.order.validationError,
    hasDiff: state.order.hasDiff,
    isRegisterEnabled,
    isDeleteEnabled,
    isConfirmDialogOpen: state.isConfirmDialogOpen,
    isNextEnabled,
  };
}
