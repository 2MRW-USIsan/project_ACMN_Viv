"use client";

import { useEditorComposer } from "@/hooks/editor/viewModel/useEditorComposer";
import { useEditorController } from "@/hooks/editor/controller/useEditorController";
import { useEditorReducer } from "@/hooks/editor/reducer/useEditorReducer";
import { useEditorService } from "@/hooks/editor/service/useEditorService";

import type { EditorViewModel } from "@/hooks/editor/viewModel/useEditorComposer";
export type { EditorViewModel };

interface EditorViewModelReturns {
  viewModels: EditorViewModel;
}

export function useEditorViewModel(): EditorViewModelReturns {
  // Serviceの呼び出し（API, repository, I/O 管理）
  const { fetchItem, request } = useEditorService();
  // StateReducerの呼び出し（状態管理定義、状態情報、制御ハンドラ）
  const { state, action } = useEditorReducer();
  // context(DI Container)定義
  const contexts = { service: { fetchItem, request }, reducer: { state, action } };
  // Controllerの呼び出し（初期化制御、副作用管理）
  useEditorController(contexts);
  // Composerの呼び出し（ViewModel(Props+UIハンドラ)の生成）
  const { viewModels } = useEditorComposer(contexts);

  return { viewModels };
}
