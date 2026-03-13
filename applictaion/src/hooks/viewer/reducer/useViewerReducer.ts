"use client";

import type { OrderJsonActions } from "@/hooks/viewer/reducer/useOrderJsonReducer";
import { useOrderJsonReducer } from "@/hooks/viewer/reducer/useOrderJsonReducer";
import type { RequestJsonActions } from "@/hooks/viewer/reducer/useRequestJsonReducer";
import { useRequestJsonReducer } from "@/hooks/viewer/reducer/useRequestJsonReducer";
import type { JsonValidationStatus, OrderJsonRecord } from "@/types/viewer/orderJson";
import { useState } from "react";
import type { ViewerServiceReturn } from "@/hooks/viewer/service/useViewerService";

export type ViewerReducerState = {
  request: {
    text: string;
    yamlError: string;
    hasYamlData: boolean;
  };
  order: {
    text: string;
    dbRecord: OrderJsonRecord | null;
    validationStatus: JsonValidationStatus;
    validationError: string;
    hasDiff: boolean;
  };
  isConfirmDialogOpen: boolean;
};

export type ViewerReducerAction = {
  request: RequestJsonActions;
  order: OrderJsonActions;
  setIsConfirmDialogOpen: (open: boolean) => void;
};

export type ViewerReducerReturn = {
  state: ViewerReducerState;
  action: ViewerReducerAction;
};

export type ViewerContexts = {
  service: ViewerServiceReturn;
  reducer: ViewerReducerReturn;
};

export function useViewerReducer(): ViewerReducerReturn {
  const requestJson = useRequestJsonReducer();
  const orderJson = useOrderJsonReducer();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const state: ViewerReducerState = {
    request: {
      text: requestJson.text,
      yamlError: requestJson.yamlError,
      hasYamlData: requestJson.hasYamlData,
    },
    order: {
      text: orderJson.text,
      dbRecord: orderJson.dbRecord,
      validationStatus: orderJson.validationStatus,
      validationError: orderJson.validationError,
      hasDiff: orderJson.hasDiff,
    },
    isConfirmDialogOpen,
  };

  const action: ViewerReducerAction = {
    request: requestJson.actions,
    order: orderJson.actions,
    setIsConfirmDialogOpen,
  };

  return { state, action };
}
