# ViewModel フック実装ルール

`viewModel/` 層のフックを実装する際の規約を定義します。  
`use{Page}ViewModel`・`use{Page}Composer`・`use{Page}Properties`・`use{Page}Handlers` の4ファイルで構成されます。

---

## ファイル配置

```
src/hooks/{page}/viewModel/
  use{Page}ViewModel.ts    # ViewModel フック（エントリーポイント）
  use{Page}Composer.ts     # ViewModel 合成; {Page}ViewModel 型定義
  use{Page}Properties.ts   # プロパティ・ラベル情報提供; {Page}Properties 型定義
  use{Page}Handlers.ts     # ハンドラ情報提供; {Page}Handlers 型定義
```

---

## 1. `use{Page}ViewModel`（エントリーポイント）

### 責務

- `use{Page}Context` を呼び出して `contexts` を取得する。
- `use{Page}Controller` を呼び出して副作用を管理する。
- `use{Page}Composer` を呼び出して `viewModel` を生成する。
- 戻り値として `{ viewModel }` を返す。

### 基本構造

```ts
interface {Page}ViewModelReturns {
  viewModel: {Page}ViewModel;
}

export function use{Page}ViewModel(): {Page}ViewModelReturns {
  // Context（DI Container）の呼び出し（Service + StateReducer を統合）
  const { contexts } = use{Page}Context();
  // Controller の呼び出し（初期化制御、副作用管理）
  use{Page}Controller(contexts);
  // Composer の呼び出し（ViewModel の生成）
  const { viewModel } = use{Page}Composer(contexts);

  return { viewModel };
}
```

- `{Page}ViewModel` 型は `use{Page}Composer.ts` から re-export する。

---

## 2. `use{Page}Composer`（ViewModel 合成）

### 責務

- `use{Page}Properties` と `use{Page}Handlers` を呼び出す。
- UIコンポーネントに渡す `viewModel` オブジェクトを明示的に組み立てる。
- `{Page}ViewModel` 型を定義・export する。

### 基本構造

```ts
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
  // context 情報を受け取り、表示用のプロパティやラベル情報を提供する
  const { properties } = use{Page}Properties(contexts);
  // context 情報を受け取り、UIハンドラー情報を提供する
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

### ルール詳細

- Composer に直接ロジックを書かない。データ変換は Properties・Handlers に委譲する。
- `properties` と `handlers` をそのままスプレッドしない（UIコンポーネントが Props として受け取れない）。

```ts
// ❌ Bad — properties と handlers をスプレッドする
return {
  viewModel: {
    ...properties,
    ...handlers,
  },
};

// ❌ Bad — Composer に直接ロジックを書く
export function use{Page}Composer(contexts: {Page}Contexts) {
  const label = contexts.reducer.state.panelBase.name ?? "無名";
  const handleClick = () => contexts.reducer.action.panel.reset();
  return { viewModel: { label, handleClick } };
}
```

---

## 3. `use{Page}Properties`（プロパティ情報提供）

### 責務

- 表示用のプロパティ・ラベル情報を提供する。
- `{Page}Properties` 型を定義・export する。

### 引数

- `ReducerState`（`contexts.reducer.state`）と `ServiceState`（`contexts.service.fetchItem`）のみ使用する。
- `action` や `request` は不要（Handlers の責務）。

```ts
// ✅ Good — ReducerState と fetchItem のみを使用
export interface {Page}Properties {
  panelName: string;
  saveList: PanelSaveItem[];
  isSaveLoading: boolean;
}

export function use{Page}Properties(contexts: {Page}Contexts) {
  const { state } = contexts.reducer;
  const { fetchItem } = contexts.service;

  const properties: {Page}Properties = {
    panelName: state.panelBase.name ?? "",
    saveList: fetchItem.saveList ?? [],
    isSaveLoading: state.panelBase.isSaveLoading,
  };

  return { properties };
}

// ❌ Bad — action や request を使用（Handlers の責務）
export function use{Page}Properties(contexts: {Page}Contexts) {
  const { state, action } = contexts.reducer;
  // ...
}
```

---

## 4. `use{Page}Handlers`（ハンドラ情報提供）

### 責務

- UI ハンドラー情報を提供する。
- `{Page}Handlers` 型を定義・export する。

### 引数

- `{Page}Contexts` 全体を受け取り、`action`・`request` などのハンドラーを利用する。

```ts
// ✅ Good — contexts 全体を受け取り action/request を利用
export interface {Page}Handlers {
  onPanelNameChange: (name: string) => void;
  onSaveRegister: () => void;
}

export function use{Page}Handlers(contexts: {Page}Contexts) {
  const { action } = contexts.reducer;
  const { request } = contexts.service;

  const handlers: {Page}Handlers = {
    onPanelNameChange: action.panel.setName,
    onSaveRegister: request.registerSave,
  };

  return { handlers };
}
```

---

## 参考：既存の実装例

- [`application/src/hooks/editor/viewModel/useEditorComposer.ts`](../../../application/src/hooks/editor/viewModel/useEditorComposer.ts)
- [`application/src/hooks/editor/viewModel/useEditorProperties.ts`](../../../application/src/hooks/editor/viewModel/useEditorProperties.ts)
- [`application/src/hooks/editor/viewModel/useEditorHandlers.ts`](../../../application/src/hooks/editor/viewModel/useEditorHandlers.ts)
- [`application/src/hooks/viewer/viewModel/useViewerComposer.ts`](../../../application/src/hooks/viewer/viewModel/useViewerComposer.ts)
- [`application/src/hooks/sample/viewModel/useSampleComposer.ts`](../../../application/src/hooks/sample/viewModel/useSampleComposer.ts)

関連ドキュメント: [`CONTROLLER_RULE.md`](./CONTROLLER_RULE.md)・[`STATE/CONTEXT_RULE.md`](./STATE/CONTEXT_RULE.md)・[`GUIDELINES.md`](../../architecture/GUIDELINES.md)・[`ARCHITECTURE.md`](../../architecture/ARCHITECTURE.md)  
→ [README.md](../../../README.md) に戻る
