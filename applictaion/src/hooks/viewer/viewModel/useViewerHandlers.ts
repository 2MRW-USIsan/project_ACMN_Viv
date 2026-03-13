"use client";

import { useCallback } from "react";
import type { ViewerContexts } from "@/hooks/viewer/reducer/useViewerReducer";

export type ViewerHandlers = {
  onShuffle: () => void;
  onCopyRequest: () => Promise<void>;
  onPaste: () => Promise<void>;
  onClear: () => void;
  onReset: () => void;
  onRegisterClick: () => void;
  onConfirmRegister: () => Promise<void>;
  onCancelConfirm: () => void;
  onDelete: () => Promise<void>;
};

export function useViewerHandlers(contexts: ViewerContexts): ViewerHandlers {
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

  return {
    onShuffle,
    onCopyRequest,
    onPaste,
    onClear,
    onReset,
    onRegisterClick,
    onConfirmRegister,
    onCancelConfirm,
    onDelete,
  };
}
