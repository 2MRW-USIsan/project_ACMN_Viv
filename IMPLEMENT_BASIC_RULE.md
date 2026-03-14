# 基本実装ルール

このドキュメントはプロジェクト全体に適用される基本的なコーディングルールを定義します。すべての関数・コンポーネント・カスタムフックの実装時に参照してください。

---

## 基本テンプレート

```ts
// 必要に応じて Props と戻り値の interface を定義する
interface SampleProps { ... }
interface SampleReturns { ... }

// default は使用しない
// util などの関数定義は camelCase
// コンポーネント定義は UpperCamelCase
// カスタムフック定義は useUpperCamelCase
export function Sample({ ... }: SampleProps): SampleReturns {
  // 変数および関数の宣言は camelCase で原則 const
  // 処理内の関数定義はアロー関数で実装
  const handleXxxx = () => { ... }
}
```

---

## 命名規則

| 種別 | 規則 | 例 |
|---|---|---|
| ユーティリティ関数 | camelCase | `calculateTotal`, `formatDate` |
| コンポーネント定義 | UpperCamelCase | `PanelList`, `OrdersChip` |
| カスタムフック定義 | useUpperCamelCase | `useEditorViewModel`, `usePanelReducer` |
| 変数・内部関数 | camelCase | `const handleClick`, `const itemList` |
| 型定義（モジュールスコープ） | UpperCamelCaseType | `SampleStateType`, `SampleActionType` |
| 型定義（関数内部スコープ） | UPPER_SNAKE_CASE（TYPEは任意） | `STATE`, `ACTION`, `PAYLOAD` |

```ts
// ✅ Good
export function PanelList(...) { ... }          // コンポーネントは UpperCamelCase
export function useEditorViewModel() { ... }    // カスタムフックは useUpperCamelCase
export function formatDate(...) { ... }         // ユーティリティは camelCase

// モジュールスコープの型定義は UpperCamelCaseType
type SampleStateType = { label: string; active: boolean };
type SampleActionType =
  | { type: "TOGGLE"; payload: { id: number } }
  | { type: "INITIALIZE" };

// ❌ Bad
export function panelList(...) { ... }          // コンポーネントが camelCase
export function EditorViewModel() { ... }       // フックが use プレフィックスなし
export function FormatDate(...) { ... }         // ユーティリティが UpperCamelCase
type sampleState = { ... };                     // 型定義が camelCase
```

関数の**内部スコープ**で用いるローカル型定義は、`Type` サフィックスを省略できる。

```ts
export function useSampleReducer() {
  // 内部スコープの型定義は TYPE (大文字) や略称も可
  type STATE = SampleStateType | undefined;
  type ACTION =
    | { type: "TOGGLE"; payload: { id: number } }
    | { type: "INITIALIZE" };

  const reducer = (state: STATE, action: ACTION): STATE => { ... };
}
```

---

## 変数・関数の宣言

- 変数および関数の宣言は **原則 `const`** を使用する。
- 処理内部の関数定義は**アロー関数**で実装する。

```ts
// ✅ Good
const itemList = items.filter((item) => item.active);
const handleClick = () => { ... };
const calculate = (value: number) => value * 2;

// ❌ Bad
let itemList = items.filter((item) => item.active); // const にできるのに let を使用
function handleClick() { ... }                       // 処理内部を function 宣言で実装
```

---

## interface の定義

- 必要に応じて Props および戻り値の `interface` を定義する。
- Props 型は **`<関数名>Props`**、戻り値型は **`<関数名>Returns`** と命名する。

```ts
// ✅ Good — Props と戻り値の interface を定義
interface SampleComponentProps {
  props: { label: string; onClick: () => void };
}

interface SampleHookReturns {
  state: SampleState;
  action: SampleAction;
}

export function SampleComponent({ props }: SampleComponentProps) { ... }
export function useSampleHook(): SampleHookReturns { ... }

// ❌ Bad — インラインや type エイリアスで定義
export function SampleComponent({ props }: { props: { label: string } }) { ... }
type Returns = { state: SampleState; action: SampleAction };
```

> **備考:** コンポーネントの Props 型の詳細なパターンは [`GUIDELINES.md`](./GUIDELINES.md)「Component Props Pattern」を参照してください。

---

## エクスポート規約

- **`export default` は使用しない。**
- Named export（名前付きエクスポート）を統一して使用する。
- 例外: Next.js App Router が要求する `app/page.tsx`・`app/layout.tsx` のみ `export default` を使用する。

```ts
// ✅ Good
export function MyComponent(...) { ... }
export function useMyHook() { ... }
export function myUtil() { ... }

// ❌ Bad
export default function MyComponent(...) { ... }
```

---

## 関数型プログラミング・ループの回避

- `for`・`while` などのループは**極力避ける**。
- 配列処理には `map`・`filter`・`reduce` などの高階関数を使用する。

```ts
// ✅ Good
const activeItems = items.filter((item) => item.active);
const labels = items.map((item) => item.label);
const total = items.reduce((acc, item) => acc + item.count, 0);

// ❌ Bad
const activeItems = [];
for (let i = 0; i < items.length; i++) {
  if (items[i].active) activeItems.push(items[i]);
}
```

> **備考:** 関数型プログラミングの詳細な方針は [`GUIDELINES.md`](./GUIDELINES.md)「Functional Programming Principles」を参照してください。

---

## まとめ

| ルール | 要点 |
|---|---|
| 命名規則（関数） | コンポーネントは UpperCamelCase、フックは useUpperCamelCase、それ以外は camelCase |
| 命名規則（型定義） | モジュールスコープは UpperCamelCaseType、関数内部スコープは TYPE 大文字も任意 |
| 変数・関数宣言 | 原則 `const`、処理内の関数はアロー関数 |
| interface 定義 | 必要に応じて `<Name>Props` / `<Name>Returns` で定義 |
| エクスポート | Named export のみ（`export default` 禁止） |
| ループ回避 | `for`/`while` を避け `map`/`filter`/`reduce` を使用 |

→ [GUIDELINES.md](./GUIDELINES.md) に戻る
