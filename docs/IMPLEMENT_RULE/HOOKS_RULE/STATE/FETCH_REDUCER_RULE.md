# FetchReducer フック実装ルール

このドキュメントは、`state/` 層の `use{Page}FetchReducer` フックを実装する際の規約を定義します。

---

## 原則

**`use{Page}FetchReducer` は Service フックが API から取得したデータの状態を管理する `useReducer` カスタムフックである。**

`use{Page}Service` から呼び出され、フェッチ済みデータ（`null` → データ取得後の値）を保持します。  
UI 状態は `use{Page}StateReducer` に委ねます。

---

## ファイル配置

```
src/hooks/{page}/state/
  use{Page}FetchReducer.ts  # フェッチ状態管理（Service から利用）
```

---

## 基本構造

```ts
"use client";

export interface {Page}FetchState {
  itemList: {Domain}Item[] | null;
  // ...（他のフェッチデータフィールド）
}

export interface {Page}FetchAction {
  setItemList: (items: {Domain}Item[]) => void;
  // ...
}

export interface {Page}FetchReturn {
  state: {Page}FetchState;
  action: {Page}FetchAction;
}

export function use{Page}FetchReducer(): {Page}FetchReturn {
  type STATE = {Page}FetchState | undefined;
  type SET_ITEM_LIST = { items: {Domain}Item[] };
  type ACTION =
    | { type: "SET_ITEM_LIST"; payload: SET_ITEM_LIST }
    | { type: "INITIALIZE" };

  const initItem: {Page}FetchState = { itemList: null };

  const reducer = (state: STATE, action: ACTION): STATE => {
    switch (action.type) {
      case "SET_ITEM_LIST":
        return state && { ...state, itemList: action.payload.items };
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

  return {
    state: state ?? initItem,
    action: { setItemList: handleSetItemList },
  };
}
```

---

## ルール詳細

### 1. 初期値は `null`

- フェッチデータの初期値は `null` とする（`undefined` は使用しない）。
- `null` は「まだ取得していない」状態を表し、取得後は実際のデータまたは空配列に更新する。

```ts
// ✅ Good — null で未取得状態を表す
const initItem: {Page}FetchState = { itemList: null };

// ❌ Bad — undefined は使用しない
const initItem: {Page}FetchState = { itemList: undefined };
```

### 2. シンプルな構造を維持する

- FetchReducer はデータの格納・クリアのみを担う。
- 複雑なビジネスロジックは持たない。
- reducer の case 内でインラインロジックを書く場合（`{ ...state, field: value }` 程度）は許容する。

### 3. `useReducer` の汎用ルールに従う

- `ACTION` には必ず `{ type: "INITIALIZE" }` を含める。
- `useReducer` の第2引数は `undefined` とし、`useEffect` でマウント時に `INITIALIZE` する。
- 戻り値は `state ?? initItem` でフォールバックする。
- 型定義は `IMPLEMENT_REDUCER_RULE.md` の汎用ルール（ `use{Name}Reducer` 命名・内部型定義など）に従う。

```ts
// ✅ Good
const [state, dispatch] = useReducer(reducer, undefined);
useEffect(() => {
  dispatch({ type: "INITIALIZE" });
}, []);

return {
  state: state ?? initItem,
  action: { ... },
};
```

### 4. `{Page}FetchState` と `{Page}FetchAction` の型定義

- `{Page}FetchState` と `{Page}FetchAction` はモジュールスコープで `export` して定義する。
- これらの型は `use{Page}Service.ts` でインポートして利用する。

---

## 参考：既存の実装例

- [`application/src/hooks/sample/state/useSampleFetchReducer.ts`](../../../../application/src/hooks/sample/state/useSampleFetchReducer.ts)

関連ドキュメント: [`SERVICE_RULE.md`](./SERVICE_RULE.md)・[`STATE_REDUCER_RULE.md`](./STATE_REDUCER_RULE.md)・[`GUIDELINES.md`](../../../architecture/GUIDELINES.md)  
→ [README.md](../../../../README.md) に戻る
