"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRequestJsonReducer } from "@/hooks/viewer/useRequestJsonReducer";
import { useOrderJsonReducer } from "@/hooks/viewer/useOrderJsonReducer";
import type { JsonValidationStatus } from "@/hooks/viewer/useOrderJsonReducer";
import type { OrderJsonRecord } from "@/types/viewer/orderJson";

const YAML_STORAGE_KEY = "acmn_yaml_content";

const loadYamlFromStorage = (): string => {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(YAML_STORAGE_KEY) ?? "";
};

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

export function useViewerViewModel(): ViewerViewModel {
  const requestJson = useRequestJsonReducer();
  const orderJson = useOrderJsonReducer();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  // Load YAML from localStorage and generate initial request JSON
  useEffect(() => {
    const yaml = loadYamlFromStorage();
    requestJson.actions.loadYaml(yaml);
  }, [requestJson.actions]);

  // Load [オーダー用JSON情報] from DB on mount
  useEffect(() => {
    const fetchFromDb = async () => {
      const res = await fetch("/api/orderJson");
      if (!res.ok) return;
      const record = (await res.json()) as OrderJsonRecord | null;
      orderJson.actions.loadFromDb(record);
    };
    void fetchFromDb();
  }, [orderJson.actions]);

  const onShuffle = useCallback(() => {
    requestJson.actions.shuffle();
  }, [requestJson.actions]);

  const onCopyRequest = useCallback(async () => {
    await navigator.clipboard.writeText(requestJson.text);
  }, [requestJson.text]);

  const onPaste = useCallback(async () => {
    const text = await navigator.clipboard.readText();
    orderJson.actions.paste(text);
  }, [orderJson.actions]);

  const onClear = useCallback(() => {
    orderJson.actions.clear();
  }, [orderJson.actions]);

  const onReset = useCallback(() => {
    orderJson.actions.reset();
  }, [orderJson.actions]);

  // Register: enabled when validation is not invalid (empty or valid)
  const isRegisterEnabled = orderJson.validationStatus !== "invalid";

  // Delete: enabled only when a DB record exists
  const isDeleteEnabled = orderJson.dbRecord !== null;

  const doRegister = useCallback(async () => {
    const res = await fetch("/api/orderJson", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonData: orderJson.text }),
    });
    if (!res.ok) return;
    const record = (await res.json()) as OrderJsonRecord;
    orderJson.actions.loadFromDb(record);
  }, [orderJson.text, orderJson.actions]);

  const onRegisterClick = useCallback(() => {
    // Show confirmation dialog if DB record exists and there is a diff
    if (orderJson.dbRecord !== null && orderJson.hasDiff) {
      setIsConfirmDialogOpen(true);
    } else {
      void doRegister();
    }
  }, [orderJson.dbRecord, orderJson.hasDiff, doRegister]);

  const onConfirmRegister = useCallback(async () => {
    await doRegister();
    setIsConfirmDialogOpen(false);
  }, [doRegister]);

  const onCancelConfirm = useCallback(() => {
    setIsConfirmDialogOpen(false);
  }, []);

  const onDelete = useCallback(async () => {
    const id = orderJson.dbRecord?.id;
    if (!id) return;
    const res = await fetch(`/api/orderJson/${id}`, { method: "DELETE" });
    if (!res.ok) return;
    orderJson.actions.loadFromDb(null);
  }, [orderJson.dbRecord, orderJson.actions]);

  // Next button: enabled when no diff AND JSON is not invalid (empty or valid)
  const isNextEnabled = useMemo(
    () => !orderJson.hasDiff && orderJson.validationStatus !== "invalid",
    [orderJson.hasDiff, orderJson.validationStatus],
  );

  return {
    requestJsonText: requestJson.text,
    yamlError: requestJson.yamlError,
    hasYamlData: requestJson.hasYamlData,
    onShuffle,
    onCopyRequest,
    orderJsonText: orderJson.text,
    dbRecord: orderJson.dbRecord,
    validationStatus: orderJson.validationStatus,
    validationError: orderJson.validationError,
    hasDiff: orderJson.hasDiff,
    onPaste,
    onClear,
    onReset,
    isRegisterEnabled,
    isDeleteEnabled,
    isConfirmDialogOpen,
    onRegisterClick,
    onConfirmRegister,
    onCancelConfirm,
    onDelete,
    isNextEnabled,
  };
}
