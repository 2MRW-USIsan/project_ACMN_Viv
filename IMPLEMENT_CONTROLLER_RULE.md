# Controller 実装ルール

このドキュメントは、副作用管理のための Controller フックを実装する際の規約を定義します。

---

## 原則

**副作用管理の Controller フックは、`use{Page}Initialize` と `use{Page}Effects` を呼び出す構造に統一する。**

Controller フック自体は Service と StateReducer の副作用連携を実装するためのハブであり、原則として**戻り値はない**（`void`）。

---

## 基本構造

```ts
export function use{Page}Controller(contexts: {Page}Contexts): void {
  // 初期化処理連携
  use{Page}Initialize(contexts);
  // 副作用処理連携
  use{Page}Effects(contexts);

  // 原則、ServiceとStateReducerの副作用連携を実装するため返却はないものとする
}
```

---

## ルール詳細

### 1. Controller フックの責務

- `use{Page}Controller` は `use{Page}Initialize` と `use{Page}Effects` を呼び出すだけのハブフックとする。
- ロジックを直接 Controller フックに書かず、必ず Initialize か Effects に委譲する。
- 戻り値は常に `void` とする。

```ts
// ✅ Good — ハブとして Initialize と Effects を呼び出す
export function useEditorController(contexts: EditorContexts): void {
  useEditorInitialize(contexts);
  useEditorEffects(contexts);
}

// ❌ Bad — Controller に直接 useEffect を書く
export function useEditorController(contexts: EditorContexts): void {
  useEffect(() => {
    // ...
  }, []);
}
```

### 2. Initialize フックの責務

- `use{Page}Initialize` はマウント時の初期化処理を担当する。
- Service から取得したデータを Reducer の state に反映する `useEffect` を実装する。
- 引数は `{Page}Contexts` とし、戻り値は `void` とする。

```ts
// ✅ Good — マウント時にServiceデータをReducerへ反映する
export function useEditorInitialize(contexts: EditorContexts): void {
  const { fetchItem } = contexts.service;
  const { action } = contexts.reducer;

  useEffect(() => {
    if (fetchItem.saveList === null) return;
    action.setSaveList(fetchItem.saveList);
  }, [fetchItem.saveList, action]);
}
```

### 3. Effects フックの責務

- `use{Page}Effects` は state の変化に応じたクロスドメインの副作用を担当する。
- 状態変化をトリガーとして他のドメインの state を更新する `useEffect` を実装する。
- 引数は `{Page}Contexts` とし、戻り値は `void` とする。
- 実装すべき副作用がない場合はコメントを残して空実装としてよい。

```ts
// ✅ Good — 状態変化に応じたクロスドメイン副作用を実装する
export function useEditorEffects(contexts: EditorContexts): void {
  const { fetchItem } = contexts.service;
  const { action } = contexts.reducer;

  useEffect(() => {
    if (fetchItem.saveDetail === null) return;
    action.panel.loadState(fetchItem.saveDetail.data);
    action.setLoadedState(fetchItem.saveDetail.data);
    action.setIsSaveLoading(false);
  }, [fetchItem.saveDetail, action]);
}

// ✅ Good — 副作用がない場合は空実装にコメントを残す
export function useViewerEffects(_contexts: ViewerContexts): void {
  // State-driven side effects for the viewer page.
  // Add useEffect hooks here as cross-domain state interactions grow.
}
```

### 4. Contexts の受け渡し

- Controller・Initialize・Effects の各フックはすべて `{Page}Contexts` 型の引数を受け取る。
- `{Page}Contexts` は `use{Page}Reducer` のファイルで定義・export し、Service と Reducer の参照をまとめたオブジェクト型とする。

```ts
// ✅ Good — Contexts で Service と Reducer をまとめて受け渡す
export function useEditorController(contexts: EditorContexts): void {
  useEditorInitialize(contexts);
  useEditorEffects(contexts);
}
```

### 5. ファイル配置

Controller 関連のフックは以下のディレクトリ構造に配置する。

```
src/hooks/{page}/controller/
  use{Page}Controller.ts   # ハブフック
  use{Page}Initialize.ts   # 初期化処理
  use{Page}Effects.ts      # 副作用処理
```

---

## 参考：既存の実装例

このルールに基づく実装例は以下のファイルを参照してください。

- [`applictaion/src/hooks/editor/controller/useEditorController.ts`](applictaion/src/hooks/editor/controller/useEditorController.ts)
- [`applictaion/src/hooks/editor/controller/useEditorInitialize.ts`](applictaion/src/hooks/editor/controller/useEditorInitialize.ts)
- [`applictaion/src/hooks/editor/controller/useEditorEffects.ts`](applictaion/src/hooks/editor/controller/useEditorEffects.ts)
- [`applictaion/src/hooks/viewer/controller/useViewerController.ts`](applictaion/src/hooks/viewer/controller/useViewerController.ts)
- [`applictaion/src/hooks/viewer/controller/useViewerInitialize.ts`](applictaion/src/hooks/viewer/controller/useViewerInitialize.ts)
- [`applictaion/src/hooks/viewer/controller/useViewerEffects.ts`](applictaion/src/hooks/viewer/controller/useViewerEffects.ts)

ViewModel 全体の設計については [`GUIDELINES.md`](GUIDELINES.md) の「ViewModel Logic Design」セクションおよび [`IMPLEMENT_VIEWMODEL.md`](IMPLEMENT_VIEWMODEL.md) を参照してください。
