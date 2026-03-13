"use client";

import type { OrderJsonReducerAction, OrderJsonReducerState } from "@/hooks/viewer/reducer/useOrderJsonReducer";
import { useOrderJsonReducer } from "@/hooks/viewer/reducer/useOrderJsonReducer";
import type { RequestJsonReducerAction, RequestJsonReducerState } from "@/hooks/viewer/reducer/useRequestJsonReducer";
import { useRequestJsonReducer } from "@/hooks/viewer/reducer/useRequestJsonReducer";
import { useState } from "react";
import type { ViewerServiceReturn } from "@/hooks/viewer/service/useViewerService";

export type ViewerReducerState = {
  request: RequestJsonReducerState;
  order: OrderJsonReducerState;
  isConfirmDialogOpen: boolean;
};

export type ViewerReducerAction = {
  request: RequestJsonReducerAction;
  order: OrderJsonReducerAction;
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
    request: requestJson.state,
    order: orderJson.state,
    isConfirmDialogOpen,
  };

  const action: ViewerReducerAction = {
    request: requestJson.action,
    order: orderJson.action,
    setIsConfirmDialogOpen,
  };

  return { state, action };
}
