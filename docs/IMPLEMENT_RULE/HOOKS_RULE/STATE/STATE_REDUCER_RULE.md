# StateReducer フック実装ルール

このドキュメントは、`state/` 層の `use{Page}StateReducer` フックと `{Page}Contexts` 型を実装する際の規約を定義します。

---

## 原則

**`use{Page}StateReducer` はページの UI 状態を管理する `useReducer` カスタムフックであり、`{Page}Contexts` 型もこのファイルで定義する。**

UI の状態変化（選択・入力・フラグなど）を Service から独立して管理します。  
また、UI 操作で変更可能な一覧データ（追加・更新・削除ができるリストなど）も StateReducer で管理し、FetchReducer からの初期同期は Controller の Initialize フックが担います。  
API から取得するだけで UI から変更しない読み取り専用データは `use{Page}FetchReducer` に委ねます。

---

## ファイル配置

```
src/hooks/{page}/state/
  use{Page}StateReducer.ts  # UI 状態管理; {Page}Contexts 型定義
```

---

## 基本構造

```ts
"use client";

import { SampleFetchItem, SampleRequest } from "@/hooks/sample/state/useSampleService";

// ── モジュールスコープ 型定義 ───────────────────────────────────

export interface {Page}ReducerState {
  itemList: {Domain}Item[];   // UI 操作で変更可能な一覧（Initialize フックで FetchReducer から同期）
  selectedItem: {Domain}Item | null;
  editorTitle: string;
  // ...
}

export interface {Page}ReducerAction {
  setItemList: (items: {Domain}Item[]) => void;
  addItem: (item: {Domain}Item) => void;
  updateItem: (item: {Domain}Item) => void;
  removeItem: (id: string) => void;
  selectItem: (item: {Domain}Item | null) => void;
  setEditorTitle: (title: string) => void;
  // ...
}

export interface {Page}ReducerReturn {
  state: {Page}ReducerState;
  action: {Page}ReducerAction;
}

// {Page}Contexts はここで定義・export する
export interface {Page}Contexts {
  service: {
    fetchItem: {Page}FetchItem;
    request: {Page}Request;
  };
  reducer: {
    state: {Page}ReducerState;
    action: {Page}ReducerAction;
  };
}

// ── フック本体 ────────────────────────────────────────────────

export function use{Page}StateReducer(): {Page}ReducerReturn {
  type STATE = {Page}ReducerState | undefined;

  type SET_ITEM_LIST = { items: {Domain}Item[] };
  type ADD_ITEM = { item: {Domain}Item };
  type UPDATE_ITEM = { item: {Domain}Item };
  type REMOVE_ITEM = { id: string };
  type SELECT_ITEM = { item: {Domain}Item | null };
  type SET_EDITOR_TITLE = { title: string };

  type ACTION =
    | { type: "SET_ITEM_LIST"; payload: SET_ITEM_LIST }
    | { type: "ADD_ITEM"; payload: ADD_ITEM }
    | { type: "UPDATE_ITEM"; payload: UPDATE_ITEM }
    | { type: "REMOVE_ITEM"; payload: REMOVE_ITEM }
    | { type: "SELECT_ITEM"; payload: SELECT_ITEM }
    | { type: "SET_EDITOR_TITLE"; payload: SET_EDITOR_TITLE }
    | { type: "INITIALIZE" };

  const initItem: {Page}ReducerState = {
    itemList: [],
    selectedItem: null,
    editorTitle: "",
    // ...
  };

  const reducer = (state: STATE, action: ACTION): STATE => {
    switch (action.type) {
      case "SET_ITEM_LIST":
        return state && setItemList(state, action.payload);
      case "ADD_ITEM":
        return state && addItem(state, action.payload);
      case "UPDATE_ITEM":
        return state && updateItem(state, action.payload);
      case "REMOVE_ITEM":
        return state && removeItem(state, action.payload);
      case "SELECT_ITEM":
        return state && selectItem(state, action.payload);
      case "SET_EDITOR_TITLE":
        return state && setEditorTitle(state, action.payload);
      case "INITIALIZE":
        return initItem;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, undefined);

  useEffect(() => {
    dispatch({ type: "INITIALIZE" });
  }, []);

  const handleSetItemList = (items: {Domain}Item[]) => {
    dispatch({ type: "SET_ITEM_LIST", payload: { items } });
  };

  const handleAddItem = (item: {Domain}Item) => {
    dispatch({ type: "ADD_ITEM", payload: { item } });
  };

  const handleUpdateItem = (item: {Domain}Item) => {
    dispatch({ type: "UPDATE_ITEM", payload: { item } });
  };

  const handleRemoveItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  const handleSelectItem = (item: {Domain}Item | null) => {
    dispatch({ type: "SELECT_ITEM", payload: { item } });
  };

  const handleSetEditorTitle = (title: string) => {
    dispatch({ type: "SET_EDITOR_TITLE", payload: { title } });
  };

  return {
    state: state ?? initItem,
    action: {
      setItemList: handleSetItemList,
      addItem: handleAddItem,
      updateItem: handleUpdateItem,
      removeItem: handleRemoveItem,
      selectItem: handleSelectItem,
      setEditorTitle: handleSetEditorTitle,
    },
  };
}
```

---

## ルール詳細

### 1. `{Page}Contexts` 型の定義場所

- `{Page}Contexts` 型は `use{Page}StateReducer.ts` のモジュールスコープで定義・export する。
- `use{Page}Context.ts` では `{Page}Contexts` を re-export のみ行う。

```ts
// use{Page}StateReducer.ts に定義する
export interface {Page}Contexts {
  service: {
    fetchItem: {Page}FetchItem;
    request: {Page}Request;
  };
  reducer: {
    state: {Page}ReducerState;
    action: {Page}ReducerAction;
  };
}

// use{Page}Context.ts で re-export する
export type { {Page}Contexts };
```

### 2. UI 状態と Service 状態の分離

StateReducer と FetchReducer はそれぞれ異なる責務でデータを管理します。

| Reducer | 管理対象 | ハンドラの用途 |
|---|---|---|
| **FetchReducer** | API から取得した生データ（`null` → 取得済みデータ） | API リクエスト呼び出しとフェッチ結果による状態更新 |
| **StateReducer** | UI が直接操作・参照する作業コピー | UI ハンドラ処理・副作用連携での状態操作 |

#### パターン①: 読み取り専用データ（UI が変更しない）

FetchReducer にのみ持つ。StateReducer には持たない。

```ts
// ✅ Good — UI から変更されない参照専用データは FetchReducer のみで管理
// FetchReducer
export interface {Page}FetchState {
  masterList: MasterItem[] | null;  // UI は参照するだけ
}

// Properties で fetchItem 経由で参照する
const properties: {Page}Properties = {
  masterList: fetchItem.masterList ?? [],
};
```

#### パターン②: UI 操作で追加・更新・削除される一覧データ

**FetchReducer と StateReducer の両方に持つ。**

FetchReducer は API キャッシュとして常に最新の API レスポンスを保持する。  
StateReducer は UI の作業コピーとして保持し、Controller の Initialize フックで API データを初期同期した後、UI 操作による変更を直接 StateReducer に反映できる。

```ts
// ✅ Good — UI 操作で変更される一覧は両方に持つ

// FetchReducer: API から取得した生データ（null = 未取得）
export interface {Page}FetchState {
  itemList: {Domain}Item[] | null;
}

// StateReducer: UI が操作する作業コピー（[] = 未同期）
export interface {Page}ReducerState {
  itemList: {Domain}Item[];  // Initialize フックで FetchReducer から初期同期
  selectedItem: {Domain}Item | null;
  // ...
}

// ❌ Bad — UI が変更する一覧を FetchReducer のみで持つと
// API 再フェッチを経由しないと UI 操作の結果を即座に表示できない
```

**データ同期フロー:**

```
[マウント時]
  Service → fetchSampleItems() → FetchReducer.itemList 更新
  ↓
  Initialize フック: fetchItem.itemList != null → action.setItemList() → StateReducer.itemList 同期

[API 操作後（create/update/delete）]
  Handler → request.createItem() → Service が再フェッチ → FetchReducer.itemList 更新
  ↓
  Initialize フック: fetchItem.itemList 変化 → action.setItemList() → StateReducer.itemList 再同期

[UI 直接操作（楽観的更新など）]
  Handler → action.addItem() / action.updateItem() / action.removeItem() → StateReducer.itemList 即時更新
```

```ts
// ❌ Bad — フェッチ専用データを StateReducer で管理する（UI で変更しない場合）
export interface {Page}ReducerState {
  selectedItem: {Domain}Item | null;
  itemList: {Domain}Item[] | null;  // null 初期値 = FetchReducer の責務
}
```

### 3. `useReducer` の汎用ルールに従う

- フック名・型名は以下の命名規則に従う:

| 種別 | 命名規則 |
|---|---|
| フック | `use{Page}StateReducer` |
| 戻り値型 | `{Page}ReducerReturn` |
| state 型 | `{Page}ReducerState` |
| action 型 | `{Page}ReducerAction` |

- `ACTION` には必ず `{ type: "INITIALIZE" }` を含める。
- `useReducer` の第2引数は `undefined` とし、`useEffect` でマウント時に `INITIALIZE` する。
- `type` 文字列と payload の型名を一致させる。
- 戻り値は `state ?? initItem` でフォールバックする。
- ハンドラー関数は `handle{ActionName}` 形式で命名する。

### 4. reducer 内の処理関数の外部化

- reducer の各ケースで呼び出すロジック関数は `utils/reducers/{page}/` に配置する。
- switch 文の中に直接ロジックを書かない。

```ts
// ✅ Good — 処理を専用ファイルの関数に委譲
import { selectItem, setEditorTitle } from "@/utils/reducers/sample/sampleReducerUtils";

case "SELECT_ITEM":
  return state && selectItem(state, action.payload);

// ❌ Bad — reducer 内に直接ロジックを書く
case "SELECT_ITEM":
  return { ...state, selectedItem: action.payload.item };
```

---

## 参考：既存の実装例

- [`application/src/hooks/sample/state/useSampleStateReducer.ts`](../../../../application/src/hooks/sample/state/useSampleStateReducer.ts)

関連ドキュメント: [`CONTEXT_RULE.md`](./CONTEXT_RULE.md)・[`FETCH_REDUCER_RULE.md`](./FETCH_REDUCER_RULE.md)・[`../CONTROLLER_RULE.md`](../CONTROLLER_RULE.md)・[`GUIDELINES.md`](../../../architecture/GUIDELINES.md)  
→ [README.md](../../../../README.md) に戻る
