# StateReducer フック実装ルール

このドキュメントは、`state/` 層の `use{Page}StateReducer` フックと `{Page}Contexts` 型を実装する際の規約を定義します。

---

## 原則

**`use{Page}StateReducer` はページの UI 状態を管理する `useReducer` カスタムフックであり、`{Page}Contexts` 型もこのファイルで定義する。**

Service から独立してUIの状態変化（選択・入力・フラグなど）を管理します。  
フェッチデータの管理は `use{Page}FetchReducer` に委ねます。

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
  selectedItem: {Domain}Item | null;
  editorTitle: string;
  // ...
}

export interface {Page}ReducerAction {
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

  type SELECT_ITEM = { item: {Domain}Item | null };
  type SET_EDITOR_TITLE = { title: string };

  type ACTION =
    | { type: "SELECT_ITEM"; payload: SELECT_ITEM }
    | { type: "SET_EDITOR_TITLE"; payload: SET_EDITOR_TITLE }
    | { type: "INITIALIZE" };

  const initItem: {Page}ReducerState = {
    selectedItem: null,
    editorTitle: "",
    // ...
  };

  const reducer = (state: STATE, action: ACTION): STATE => {
    switch (action.type) {
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

  const handleSelectItem = (item: {Domain}Item | null) => {
    dispatch({ type: "SELECT_ITEM", payload: { item } });
  };

  const handleSetEditorTitle = (title: string) => {
    dispatch({ type: "SET_EDITOR_TITLE", payload: { title } });
  };

  return {
    state: state ?? initItem,
    action: {
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

- StateReducer は UI 状態（選択状態・入力値・フラグなど）のみを管理する。
- フェッチデータの状態は `use{Page}FetchReducer` で管理し、`contexts.service.fetchItem` 経由でアクセスする。

```ts
// ✅ Good — UI 状態のみを StateReducer で管理
export interface {Page}ReducerState {
  selectedItem: {Domain}Item | null;
  editorTitle: string;
  isLoading: boolean;
}

// ❌ Bad — フェッチデータを StateReducer で管理する
export interface {Page}ReducerState {
  selectedItem: {Domain}Item | null;
  itemList: {Domain}Item[] | null;  // FetchReducer の責務
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
