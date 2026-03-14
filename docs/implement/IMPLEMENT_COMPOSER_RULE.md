# Composer 実装ルール

このドキュメントは、ViewModel 生成のための Composer フックを実装する際の規約を定義します。

---

## 原則

**`use{Page}Composer` は `use{Page}ViewModel` が提供する ViewModel を生成する責務を担う。**

`{Page}Contexts` を受け取り、`use{Page}Properties`（表示用プロパティ・ラベル情報）と `use{Page}Handlers`（UI ハンドラー情報）を呼び出し、UIコンポーネントへ渡す `viewModel` オブジェクトを生成して返す。

---

## 基本構造

```ts
export function use{Page}Composer(contexts: {Page}Contexts) {
  // context情報を受け取り、表示用のプロパティやラベル情報を提供する
  // ReducerStateとServiceStateだけあればよい
  const { properties } = use{Page}Properties(...)
  // context情報を受け取り、UIハンドラー情報を提供する
  const { handlers } = use{Page}Handlers(...)

  return {
    viewModel: {
      // properties と handlers を基に、UIコンポーネントが受け取る props の構造を明示的に組み立てる
      sample: {
        label: properties.sample.label,
        onClick: handlers.sample.onClick,
      },
      // ...
    }
  }
}
```

---

## ルール詳細

### 1. Composer フックの責務

- `use{Page}Composer` は `use{Page}Properties` と `use{Page}Handlers` を呼び出すだけのハブフックとする。
- ViewModel のデータ変換ロジックは Properties・Handlers に委譲し、Composer に直接書かない。
- 戻り値は `{ viewModel: {Page}ViewModel }` とする。

```ts
// ✅ Good — Properties と Handlers を受け取り、UIコンポーネントの props 構造を明示的に組み立てる
export function useEditorComposer(contexts: EditorContexts) {
  const { properties } = useEditorProperties(contexts);
  const { handlers } = useEditorHandlers(contexts);

  return {
    viewModel: {
      panelHeader: {
        name: properties.panelName,
        onNameChange: handlers.onPanelNameChange,
      },
      savePanel: {
        saveList: properties.saveList,
        isSaveLoading: properties.isSaveLoading,
        onSaveRegister: handlers.onSaveRegister,
      },
    },
  };
}

// ❌ Bad — properties と handlers をそのままスプレッドする（UIコンポーネント側で正しく Props として受け取れない）
export function useEditorComposer(contexts: EditorContexts) {
  const { properties } = useEditorProperties(contexts);
  const { handlers } = useEditorHandlers(contexts);

  return {
    viewModel: {
      ...properties,
      ...handlers,
    },
  };
}

// ❌ Bad — Composer に直接ロジックを書く
export function useEditorComposer(contexts: EditorContexts) {
  const label = contexts.reducer.state.panelBase.name ?? "無名";
  const handleClick = () => contexts.reducer.action.panel.reset();

  return {
    viewModel: { label, handleClick },
  };
}
```

### 2. `use{Page}Properties` の責務と引数

- `use{Page}Properties` は表示用のプロパティ・ラベル情報を提供する。
- 引数は `ReducerState` と `ServiceState`（`fetchItem`）のみで十分とする。`action` や `request` は不要。
- 戻り値は `{ properties: {Page}Properties }` とする。
- `{Page}Properties` 型はこのファイルで定義・export する。

```ts
// ✅ Good — ReducerState と fetchItem のみを受け取る
export function useEditorProperties(contexts: EditorContexts) {
  const { state } = contexts.reducer;
  const { fetchItem } = contexts.service;

  const properties: EditorProperties = {
    panelName: state.panelBase.name ?? "",
    saveList: fetchItem.saveList ?? [],
    isSaveLoading: state.panelBase.isSaveLoading,
  };

  return { properties };
}

// ❌ Bad — action や request を受け取る（Handlers の責務）
export function useEditorProperties(contexts: EditorContexts) {
  const { state, action } = contexts.reducer;
  // ...
}
```

### 3. `use{Page}Handlers` の責務と引数

- `use{Page}Handlers` は UI ハンドラー情報を提供する。
- 引数は `{Page}Contexts` 全体を受け取り、`action`・`request` などのハンドラーを利用する。
- 戻り値は `{ handlers: {Page}Handlers }` とする。
- `{Page}Handlers` 型はこのファイルで定義・export する。

```ts
// ✅ Good — contexts 全体を受け取り action/request を利用する
export function useEditorHandlers(contexts: EditorContexts) {
  const { action } = contexts.reducer;
  const { request } = contexts.service;

  const handlers: EditorHandlers = {
    onPanelNameChange: action.panel.setName,
    onSaveRegister: request.registerSave,
  };

  return { handlers };
}
```

### 4. ViewModel の型定義

- `{Page}ViewModel` 型は `use{Page}Composer.ts` 内で定義・export する。
- `{Page}ViewModel` はUIコンポーネントに渡す props の構造を表す型とする。各プロパティにはUIコンポーネント単位のオブジェクトを対応させ、`{Page}Properties` と `{Page}Handlers` から必要な値を明示的にマッピングして組み立てる。
- `{Page}Properties` 型は `use{Page}Properties.ts`、`{Page}Handlers` 型は `use{Page}Handlers.ts` でそれぞれ定義・export する。
- `use{Page}ViewModel.ts` では `{Page}ViewModel` を `use{Page}Composer.ts` から re-export する。

```ts
// use{Page}Properties.ts
export interface {Page}Properties {
  panelName: string;
  saveList: PanelSaveItem[];
  isSaveLoading: boolean;
  // ...
}

// use{Page}Handlers.ts
export interface {Page}Handlers {
  onPanelNameChange: (name: string) => void;
  onSaveRegister: () => void;
  // ...
}

// use{Page}Composer.ts
export interface {Page}ViewModel {
  panelHeader: {
    name: string;
    onNameChange: (name: string) => void;
  };
  savePanel: {
    saveList: PanelSaveItem[];
    isSaveLoading: boolean;
    onSaveRegister: () => void;
  };
  // ...
}

export function use{Page}Composer(contexts: {Page}Contexts) {
  const { properties } = use{Page}Properties(contexts);
  const { handlers } = use{Page}Handlers(contexts);

  return {
    viewModel: {
      panelHeader: {
        name: properties.panelName,
        onNameChange: handlers.onPanelNameChange,
      },
      savePanel: {
        saveList: properties.saveList,
        isSaveLoading: properties.isSaveLoading,
        onSaveRegister: handlers.onSaveRegister,
      },
    } satisfies {Page}ViewModel,
  };
}
```

### 5. ファイル配置

Composer 関連のフックは以下のディレクトリ構造に配置する。

```
src/hooks/{page}/viewModel/
  use{Page}ViewModel.ts    # ViewModel フック（エントリーポイント）
  use{Page}Composer.ts     # ViewModel 合成; {Page}ViewModel 型定義
  use{Page}Properties.ts   # プロパティ・ラベル情報提供; {Page}Properties 型定義
  use{Page}Handlers.ts     # ハンドラ情報提供; {Page}Handlers 型定義
```

---

## 参考：既存の実装例

このルールに基づく実装例は以下のファイルを参照してください。

- [`application/src/hooks/editor/viewModel/useEditorComposer.ts`](../../application/src/hooks/editor/viewModel/useEditorComposer.ts)
- [`application/src/hooks/editor/viewModel/useEditorProperties.ts`](../../application/src/hooks/editor/viewModel/useEditorProperties.ts)
- [`application/src/hooks/editor/viewModel/useEditorHandlers.ts`](../../application/src/hooks/editor/viewModel/useEditorHandlers.ts)
- [`application/src/hooks/viewer/viewModel/useViewerComposer.ts`](../../application/src/hooks/viewer/viewModel/useViewerComposer.ts)
- [`application/src/hooks/viewer/viewModel/useViewerProperties.ts`](../../application/src/hooks/viewer/viewModel/useViewerProperties.ts)
- [`application/src/hooks/viewer/viewModel/useViewerHandlers.ts`](../../application/src/hooks/viewer/viewModel/useViewerHandlers.ts)

ViewModel 全体の設計については [`GUIDELINES.md`](../architecture/GUIDELINES.md) の「ViewModel Logic Design」セクションおよび [`IMPLEMENT_VIEWMODEL.md`](./IMPLEMENT_VIEWMODEL.md) を参照してください。  
→ [README.md](../../README.md) に戻る
