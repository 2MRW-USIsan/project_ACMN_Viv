# 副作用影響変更成果物仕様書テンプレート（工程4）

このドキュメントは **工程4「副作用影響の変更」** の AI 成果物報告書フォーマットです。  
本工程のスコープは **ハンドラの調整実装** と **Controller フック（Initialize・Effects）の実装** です。

> 工程4の依頼書は [`REQUEST_TEMPLATE.md`](./REQUEST_TEMPLATE.md) を参照してください。  
> 前工程は [`../03_CRUD_ADD/`](../03_CRUD_ADD/)、次工程は [`../05_REFACTOR/`](../05_REFACTOR/) です。

---

## テンプレート

---

### 1. 対象画面

| 項目 | 内容 |
|---|---|
| 画面パス | `/xxx` |
| 画面名称 | （画面名） |

---

### 2. Controller 実装内容

```ts
// hooks/xxx/controller/use{Page}Controller.ts
export function use{Page}Controller(contexts: {Page}Contexts): void {
  use{Page}Initialize(contexts);
  use{Page}Effects(contexts);
}
```

---

### 3. Initialize フック実装内容

```ts
// hooks/xxx/controller/use{Page}Initialize.ts
export function use{Page}Initialize(contexts: {Page}Contexts): void {
  const { fetchItem, request } = contexts.service;
  const { action } = contexts.reducer;

  // [初期化] マウント時にアイテム一覧を取得する
  useEffect(() => {
    void request.fetchItems();
  }, [request]);

  // [初期化] itemList の取得完了時に StateReducer へ反映する
  useEffect(() => {
    if (fetchItem.itemList === null) return;
    action.setItemList(fetchItem.itemList);
  }, [fetchItem.itemList, action]);
}
```

---

### 4. Effects フック実装内容

```ts
// hooks/xxx/controller/use{Page}Effects.ts
export function use{Page}Effects(contexts: {Page}Contexts): void {
  const { state, action } = contexts.reducer;

  // [副作用] selectedItem の変化時にエディタ入力値を同期する
  useEffect(() => {
    action.setEditorTitle(state.selectedItem?.title ?? "");
    // ...
  }, [state.selectedItem, action]);
}
```

副作用がない場合はコメントを残して空実装とする:

```ts
export function use{Page}Effects(_contexts: {Page}Contexts): void {
  // State-driven side effects for the {page} page.
  // Add useEffect hooks here as cross-domain state interactions grow.
}
```

---

### 5. ハンドラ調整内容

本工程でロジックを追加・変更したハンドラを列挙する。

#### `use{Page}Handlers.ts` の変更

| ハンドラ名 | 変更内容 |
|---|---|
| `on{ActionName}` | （変更内容の説明） |

---

### 6. 作成・変更ファイル一覧

| ファイルパス | 変更種別 | 説明 |
|---|---|---|
| `hooks/xxx/controller/use{Page}Controller.ts` | 変更 | Initialize・Effects の呼び出し実装 |
| `hooks/xxx/controller/use{Page}Initialize.ts` | 変更 | 初期化 useEffect の実装 |
| `hooks/xxx/controller/use{Page}Effects.ts` | 変更 | 副作用 useEffect の実装 |
| `hooks/xxx/viewModel/use{Page}Handlers.ts` | 変更 | ハンドラの副作用連携追加 |

---

---

## `/sample` 画面副作用影響変更成果物仕様書

---

### 1. 対象画面

| 項目 | 内容 |
|---|---|
| 画面パス | `/sample` |
| 画面名称 | サンプル管理画面 |

---

### 2. Controller 実装内容

```ts
// hooks/sample/controller/useSampleController.ts
export function useSampleController(contexts: SampleContexts): void {
  useSampleInitialize(contexts);
  useSampleEffects(contexts);
}
```

---

### 3. Initialize フック実装内容

```ts
// hooks/sample/controller/useSampleInitialize.ts
export function useSampleInitialize(contexts: SampleContexts): void {
  const { fetchItem, request } = contexts.service;
  const { action } = contexts.reducer;

  // [初期化] マウント時にアイテム一覧を取得する
  useEffect(() => {
    void request.fetchItems();
  }, [request]);

  // [初期化] itemList の取得完了時に StateReducer の作業コピーへ反映する
  useEffect(() => {
    if (fetchItem.itemList === null) return;
    action.setItemList(fetchItem.itemList);
  }, [fetchItem.itemList, action]);
}
```

---

### 4. Effects フック実装内容

```ts
// hooks/sample/controller/useSampleEffects.ts
export function useSampleEffects(contexts: SampleContexts): void {
  const { state, action } = contexts.reducer;

  // [副作用] selectedItem の変化時にエディタ入力値を選択アイテムの値に同期する
  useEffect(() => {
    action.setEditorTitle(state.selectedItem?.title ?? "");
    action.setEditorDetail(state.selectedItem?.detail ?? "");
  }, [state.selectedItem, action]);
}
```

---

### 5. ハンドラ調整内容

#### `useSampleHandlers.ts` の変更

| ハンドラ名 | 変更内容 |
|---|---|
| `onSaveItem` | `request.createItem` または `request.updateItem` 呼び出し後、`action.setIsLoading(false)` と `action.selectItem(null)` でエディタをリセットする処理を追加 |
| `onDeleteItem` | `request.deleteItem` 呼び出し後、`action.selectItem(null)` で選択状態をリセットする処理を追加 |

---

### 6. 作成・変更ファイル一覧

| ファイルパス | 変更種別 | 説明 |
|---|---|---|
| `hooks/sample/controller/useSampleController.ts` | 変更 | Initialize・Effects の呼び出し実装 |
| `hooks/sample/controller/useSampleInitialize.ts` | 変更 | fetchItems 呼び出し・itemList 同期の useEffect 実装 |
| `hooks/sample/controller/useSampleEffects.ts` | 変更 | selectedItem 変化時のエディタ同期 useEffect 実装 |
| `hooks/sample/viewModel/useSampleHandlers.ts` | 変更 | onSaveItem・onDeleteItem へのリセット処理追加 |

---

→ [README.md](../../../README.md) に戻る
