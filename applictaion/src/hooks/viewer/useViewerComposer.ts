"use client";

import { useCallback, useMemo } from "react";
import type { JsonValidationStatus } from "@/hooks/viewer/useOrderJsonReducer";
import type { ViewerContexts } from "@/hooks/viewer/useViewerReducer";
import type { OrderJsonRecord } from "@/types/viewer/orderJson";

export type ViewerViewModel = {
  // Left panel — [リクエスト用JSON情報]
  requestJsonText: string;
  yamlError: string;
  hasYamlData: boolean;
  onShuffle: () => void;
  onCopyRequest: () => Promise<void>;
  // Right panel — [オーダー用JSON情報]
  orderJsonText: string;
  dbRecord: OrderJsonRecord | null;
  validationStatus: JsonValidationStatus;
  validationError: string;
  hasDiff: boolean;
  onPaste: () => Promise<void>;
  onClear: () => void;
  onReset: () => void;
  // Register / Delete
  isRegisterEnabled: boolean;
  isDeleteEnabled: boolean;
  isConfirmDialogOpen: boolean;
  onRegisterClick: () => void;
  onConfirmRegister: () => Promise<void>;
  onCancelConfirm: () => void;
  onDelete: () => Promise<void>;
  // Navigation
  isNextEnabled: boolean;
  // TBD: onNext navigation target undefined
};

type Returns = {
  viewModels: ViewerViewModel;
};

export function useViewerComposer(contexts: ViewerContexts): Returns {
  const { state, action } = contexts.reducer;
  const { request } = contexts.service;

  const onShuffle = useCallback(() => {
    action.request.shuffle();
  }, [action.request]);

  const onCopyRequest = useCallback(async () => {
    await navigator.clipboard.writeText(state.request.text);
  }, [state.request.text]);

  const onPaste = useCallback(async () => {
    const text = await navigator.clipboard.readText();
    action.order.paste(text);
  }, [action.order]);

  const onClear = useCallback(() => {
    action.order.clear();
  }, [action.order]);

  const onReset = useCallback(() => {
    action.order.reset();
  }, [action.order]);

  const isRegisterEnabled = state.order.validationStatus !== "invalid";
  const isDeleteEnabled = state.order.dbRecord !== null;

  const doRegister = useCallback(async () => {
    const record = await request.registerOrderJson(state.order.text);
    action.order.loadFromDb(record);
  }, [request, state.order.text, action.order]);

  const onRegisterClick = useCallback(() => {
    if (state.order.dbRecord !== null && state.order.hasDiff) {
      action.setIsConfirmDialogOpen(true);
    } else {
      void doRegister();
    }
  }, [state.order.dbRecord, state.order.hasDiff, doRegister, action]);

  const onConfirmRegister = useCallback(async () => {
    await doRegister();
    action.setIsConfirmDialogOpen(false);
  }, [doRegister, action]);

  const onCancelConfirm = useCallback(() => {
    action.setIsConfirmDialogOpen(false);
  }, [action]);

  const onDelete = useCallback(async () => {
    const id = state.order.dbRecord?.id;
    if (!id) return;
    await request.deleteOrderJson(id);
    action.order.loadFromDb(null);
  }, [state.order.dbRecord, request, action.order]);

  const isNextEnabled = useMemo(
    () => !state.order.hasDiff && state.order.validationStatus !== "invalid",
    [state.order.hasDiff, state.order.validationStatus],
  );

  const viewModels: ViewerViewModel = {
    requestJsonText: state.request.text,
    yamlError: state.request.yamlError,
    hasYamlData: state.request.hasYamlData,
    onShuffle,
    onCopyRequest,
    orderJsonText: state.order.text,
    dbRecord: state.order.dbRecord,
    validationStatus: state.order.validationStatus,
    validationError: state.order.validationError,
    hasDiff: state.order.hasDiff,
    onPaste,
    onClear,
    onReset,
    isRegisterEnabled,
    isDeleteEnabled,
    isConfirmDialogOpen: state.isConfirmDialogOpen,
    onRegisterClick,
    onConfirmRegister,
    onCancelConfirm,
    onDelete,
    isNextEnabled,
  };

  return { viewModels };
}
