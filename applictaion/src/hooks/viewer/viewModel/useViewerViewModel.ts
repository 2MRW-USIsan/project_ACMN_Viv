"use client";

import { useViewerComposer } from "@/hooks/viewer/viewModel/useViewerComposer";
import { useViewerController } from "@/hooks/viewer/controller/useViewerController";
import { useViewerReducer } from "@/hooks/viewer/reducer/useViewerReducer";
import { useViewerService } from "@/hooks/viewer/service/useViewerService";

import type { ViewerViewModel } from "@/hooks/viewer/viewModel/useViewerComposer";
export type { ViewerViewModel };

interface ViewerViewModelReturns {
  viewModels: ViewerViewModel;
}

export function useViewerViewModel(): ViewerViewModelReturns {
  // Serviceの呼び出し（API, repository, I/O 管理）
  const { fetchItem, request } = useViewerService();
  // StateReducerの呼び出し（状態管理定義、状態情報、制御ハンドラ）
  const { state, action } = useViewerReducer();
  // context(DI Container)定義
  const contexts = { service: { fetchItem, request }, reducer: { state, action } };
  // Controllerの呼び出し（初期化制御、副作用管理）
  useViewerController(contexts);
  // Composerの呼び出し（ViewModel(Props+UIハンドラ)の生成）
  const { viewModels } = useViewerComposer(contexts);

  return { viewModels };
}
