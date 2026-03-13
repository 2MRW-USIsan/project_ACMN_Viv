# useReducer 実装ルール

このドキュメントは、複数の state を扱うカスタムフックを `useReducer` で実装する際の規約を定義します。

---

## 原則

**複数の state を扱う場合は `useReducer` を利用したカスタムフックを作成する。**

フック名・型名は以下の命名規則に従う。

| 種別 | 命名規則 |
|---|---|
| フック | `use{Name}Reducer` |
| 戻り値型 | `{Name}ReducerReturn` |
| state 型 | `{Name}ReducerState` |
| action 型 | `{Name}ReducerAction` |

---

## 基本構造

```ts
interface {Name}ReducerReturn {
  state: {Name}ReducerState;
  action: {Name}ReducerAction;
}

export function use{Name}Reducer(): {Name}ReducerReturn {
  // ── hook 内 型定義 ──────────────────────────────────────────
  type STATE = {Name}ReducerState | undefined;

  type CHANGE_SAMPLE = { update: ~~~ }; // payload 型定義

  type ACTION =
    // dispatch のアクションタイプと payload の型名を一致させる
    | { type: "CHANGE_SAMPLE"; payload: CHANGE_SAMPLE }
    // ...
    // 初期化アクションは必須
    | { type: "INITIALIZE" };

  // ── reducer 定義 ────────────────────────────────────────────
  const initItem: {Name}ReducerState = { /* 初期値 */ };

  const reducer = (state: STATE, action: ACTION): STATE => {
    switch (action.type) {
      case "CHANGE_SAMPLE":
        // dispatch 用の関数は /src 以下に専用の階層を用意する
        return state && changeSample(state, action.payload);
      // ...
      case "INITIALIZE":
        return initItem;
      default:
        return state;
    }
  };

  // ── reducer 本体 ────────────────────────────────────────────
  const [state, dispatch] = useReducer(reducer, undefined);

  // 初期化
  useEffect(() => {
    dispatch({ type: "INITIALIZE" });
  }, []);

  // ── ハンドラー (action) 定義 ────────────────────────────────
  const handleChangeSample = (param: ~~~) => {
    dispatch({ type: "CHANGE_SAMPLE", payload: param });
  };
  // ...

  return {
    state: state ?? initItem,
    action: {
      changeSample: handleChangeSample,
      // ...
    },
  };
}
```

---

## ルール詳細

### 1. 型定義の配置

- `{Name}ReducerState` と `{Name}ReducerAction` はフックファイルの**外側（モジュールスコープ）**に `export` して定義する。
- `STATE`・`ACTION`・各 payload 型（`CHANGE_SAMPLE` など）はフックの**内側**にローカル型として定義する。

```ts
// ✅ Good — 外側で export、内側でローカル型
export type {Name}ReducerState = { /* ... */ };
export type {Name}ReducerAction = { /* ... */ };

export function use{Name}Reducer(): {Name}ReducerReturn {
  type STATE = {Name}ReducerState | undefined;
  type CHANGE_SAMPLE = { update: string };
  type ACTION =
    | { type: "CHANGE_SAMPLE"; payload: CHANGE_SAMPLE }
    | { type: "INITIALIZE" };
  // ...
}
```

### 2. ACTION 型の命名

- `type` 文字列と payload の型名を**一致**させる。

```ts
// ✅ Good — type 名と payload 型名が対応している
type CHANGE_SAMPLE = { update: string };
type ACTION =
  | { type: "CHANGE_SAMPLE"; payload: CHANGE_SAMPLE }
  | { type: "INITIALIZE" };

// ❌ Bad — type 名と payload 型名が不一致
type UpdatePayload = { update: string };
type ACTION =
  | { type: "CHANGE_SAMPLE"; payload: UpdatePayload }
  | { type: "INITIALIZE" };
```

### 3. INITIALIZE アクション（必須）

- `ACTION` には必ず `{ type: "INITIALIZE" }` を含める。
- `useEffect` でマウント時に `dispatch({ type: "INITIALIZE" })` を呼び出し、初期値をセットする。
- `useReducer` の第2引数は `undefined` とし、初期状態は reducer 内の `INITIALIZE` ケースで設定する。

```ts
// ✅ Good
const [state, dispatch] = useReducer(reducer, undefined);
useEffect(() => {
  dispatch({ type: "INITIALIZE" });
}, []);
```

### 4. reducer 内の処理関数

- reducer の各ケースで呼び出すビジネスロジック関数（`changeSample` 等）は、`/src` 以下の**専用階層**（例: `utils/` や `business/`）に配置する。
- reducer の switch 文の中に直接ロジックを書かない。

```ts
// ✅ Good — 処理を専用ファイルの関数に委譲
case "CHANGE_SAMPLE":
  return state && changeSample(state, action.payload);

// ❌ Bad — reducer 内に直接ロジックを書く
case "CHANGE_SAMPLE":
  return {
    ...state,
    items: state.items.map((item) =>
      item.id === action.payload.id ? { ...item, ...action.payload.update } : item,
    ),
  };
```

### 5. ハンドラー命名

- ハンドラー関数は `handle{ActionName}` の形式で命名する（camelCase）。
- 戻り値の `action` オブジェクトには camelCase のキー名でハンドラーを格納する。

```ts
// ✅ Good
const handleChangeSample = (param: ~~~) => {
  dispatch({ type: "CHANGE_SAMPLE", payload: param });
};

return {
  state: state ?? initItem,
  action: {
    changeSample: handleChangeSample,
  },
};
```

### 6. 戻り値の state

- `state` は `undefined` になりうるため、戻り値では `state ?? initItem` で初期値にフォールバックする。

```ts
// ✅ Good
return {
  state: state ?? initItem,
  action: { /* ... */ },
};
```

---

## 参考：既存の実装例

このルールに基づく実装例は以下のファイルを参照してください。

- [`applictaion/src/hooks/editor/reducer/usePanelBaseReducer.ts`](applictaion/src/hooks/editor/reducer/usePanelBaseReducer.ts)
- [`applictaion/src/hooks/viewer/reducer/useRequestJsonReducer.ts`](applictaion/src/hooks/viewer/reducer/useRequestJsonReducer.ts)
- [`applictaion/src/hooks/viewer/reducer/useOrderJsonReducer.ts`](applictaion/src/hooks/viewer/reducer/useOrderJsonReducer.ts)

画面レベルの Reducer（複数のドメイン Reducer を束ねる場合）については [`GUIDELINES.md`](GUIDELINES.md) の「ViewModel Logic Design」セクションおよび [`ARCHITECTURE.md`](ARCHITECTURE.md) を参照してください。
