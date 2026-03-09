# Coding Guidelines

このドキュメントはプロジェクト全体のコーディング規約を定義します。新規開発・レビュー時のコンテキストとして利用してください。

---

## Functional Programming Principles（関数型プログラミング）

- 副作用のない純粋関数を書くことを目指す。
- 関数合成を優先し、深くネストしたループは避ける。
- コレクション操作には `map`・`filter`・`reduce` などの高階関数を使用する。

```ts
// ✅ Good
const activeItems = items.filter((item) => item.active);

// ❌ Bad
const activeItems = [];
for (let i = 0; i < items.length; i++) {
  if (items[i].active) activeItems.push(items[i]);
}
```

---

## Class Usage Restrictions（クラス使用の制限）

- データ保持にクラスを使わない。代わりにプレーンなオブジェクトや型を使用する。
- 継承よりコンポジションを優先する。
- static メソッド・プロパティは必要最低限に留める。

---

## Mapping Objects for Conditionals（条件分岐のマップオブジェクト化）

- `if/else if/else` チェーンの代わりに、マップ（オブジェクト）でアクションやコンテンツを引くパターンを採用する。
- ドメイン型（例: `ChipType`）による分岐は `Record<ChipType, ...>` で表現する。

```ts
// ✅ Good
const chipActionMap: Record<ChipType, (id: number) => void> = {
  orders: ordersActions.changeChip,
  select: selectActions.changeChip,
  switch: switchActions.changeChip,
};
chipActionMap[chipType](id);

// ❌ Bad
if (chipType === "orders") ordersActions.changeChip(id);
else if (chipType === "select") selectActions.changeChip(id);
else switchActions.changeChip(id);
```

JSX 内の条件分岐も同様に、マップオブジェクトを使って可読性を高める。

```tsx
// ✅ Good
const typeContentMap: Record<string, React.ReactNode> = {
  Scripts: <ScriptsHint />,
  Color: <ColorHint />,
};
const content = typeContentMap[values.type] ?? <DefaultContent />;

// ❌ Bad
{values.type === "Scripts" ? <ScriptsHint /> : values.type === "Color" ? <ColorHint /> : <DefaultContent />}
```

---

## Immutability Patterns（イミュータビリティ）

- 変数・オブジェクトはデフォルトでイミュータブルとして扱う。
- オブジェクト・配列は必ずコピーを作成してから更新する（スプレッド演算子を使用）。
- `useReducer` のリデューサーは常に新しいオブジェクトを返す。

```ts
// ✅ Good
return {
  ...state,
  panels: state.panels.map((p) =>
    p.id === id ? { ...p, state: !p.state } : p,
  ),
};

// ❌ Bad
state.panels[index].state = !state.panels[index].state;
return state;
```

---

## Export Convention（エクスポート規約）

- **Named export（名前付きエクスポート）を統一して使用する。**
- `export default` は Next.js の App Router が要求するページ (`app/page.tsx`, `app/layout.tsx`) にのみ使用する。

```ts
// ✅ Good — コンポーネント、フック、ユーティリティすべて named export
export function MyComponent(...) { ... }
export function useMyHook() { ... }
export function myUtil() { ... }
export const myValue = ...;

// ❌ Bad — app/ 以外での default export
export default function MyComponent(...) { ... }
```

インポート側も named import を使用する。

```ts
// ✅ Good
import { MyComponent } from "@/components/atoms/MyComponent";

// ❌ Bad
import MyComponent from "@/components/atoms/MyComponent";
```

---

## TypeScript Conventions（TypeScript 規約）

- `"strict": true` を維持する。`any` 型の使用は禁止。
- 型定義は `types/` ディレクトリに集約する（コンポーネントや hooks への inline 定義は Props 型のみ可）。
- 状態の型（State types）とビューの型（View types）を分離する（詳細は `ARCHITECTURE.md` 参照）。
- アクション型は Union 型で定義し、`type` フィールドで discriminate する。

```ts
// ✅ Good
type Action =
  | { type: "ADD_PANEL" }
  | { type: "DELETE_PANEL"; payload: { id: number } };
```

- コンポーネントの props 型はファイル内でのみ使う interface として定義する。

```ts
interface MyComponentProps {
  value: string;
  onChange: (value: string) => void;
}
export function MyComponent({ value, onChange }: MyComponentProps) { ... }
```

---

## React / Hooks Conventions（React / Hooks 規約）

- すべてのコンポーネントは関数コンポーネントとして実装する（クラスコンポーネント禁止）。
- クライアントサイドの状態を持つコンポーネントには `"use client"` ディレクティブを付与する。
- カスタムフックは `hooks/` ディレクトリに配置し、`use` プレフィックスを付ける。
- `useMemo` を使ってアクション関数とデータ変換のコストを最小化する。React 19 Compiler と競合しないよう、`useMemo` 内で参照する補助関数はクロージャ内に同居させること。
- 画面ごとに **ViewModel フック**（`use<Screen>ViewModel.ts`）を作成し、各 hooks を束ねて画面コンポーネントが参照する単一インターフェースとして提供する（MVVM パターン）。

```ts
// ✅ Good — アクションを useMemo でメモ化
const actions = useMemo(
  (): MyActions => ({
    doSomething: (id) => dispatch({ type: "DO_SOMETHING", payload: { id } }),
  }),
  [],
);
```

---

## Component Props Pattern（コンポーネント Props のパターン）

- Atom・Molecule・Organism のコンポーネントは `props` という単一の prop オブジェクトを受け取ることが多い。View 型（`types/` 内の `*ViewItem` 型）をそのまま渡す場合に活用する。

```tsx
// ✅ Good — View 型をそのまま渡す
<OrdersPanelListItem key={item.id} props={item} />

// props をそのまま受け取るコンポーネント側
interface OrdersPanelListItemProps {
  props: OrdersViewItem;
}
export function OrdersPanelListItem({ props }: OrdersPanelListItemProps) { ... }
```

- 個別 props を展開して渡すパターンは Atom など props 数が少ない場合に使用する。

```tsx
// ✅ Good — props 数が少ない場合は展開も可
<YamlPreviewDialog open={yamlOpen} yaml={yaml} onClose={handleClose} />
```

---

## Directory Conventions（ディレクトリ規約）

詳細は `ARCHITECTURE.md` を参照。以下に主要な配置ルールのみ記す。

| 種別 | 配置先 |
|---|---|
| UI コンポーネント（基本要素） | `components/atoms/` |
| UI コンポーネント（複合） | `components/molecules/<domain>/` |
| UI コンポーネント（複雑・ドメイン） | `components/organisms/<domain>/` |
| UI コンポーネント（複雑・画面固有） | `components/organisms/<screen>/` |
| アプリ全体のプロバイダー | `components/providers/` |
| カスタムフック | `hooks/` |
| 画面 ViewModel フック | `hooks/use<Screen>ViewModel.ts` |
| 型定義 | `types/` |
| ユーティリティ（純粋関数） | `utils/` |
| MUI テーマ | `theme/` |
| ビジネスロジック（サーバーサイド） | `business/` |

- molecules・organisms はドメイン（`orders/`, `select/`, `switch/`, `panel/`, `bloc/`）ごとにサブディレクトリを切る。
- 特定の画面にのみ使われる Organism は画面名のサブディレクトリ（`editor/`, `viewer/`）に配置する。

---

## Conclusion

これらのガイドラインに従うことで、コードの保守性・可読性が高まりバグが減ります。新しいコードを書く際はこのドキュメントをコンテキストとして参照してください。アーキテクチャの詳細は [`ARCHITECTURE.md`](./ARCHITECTURE.md) を参照してください。
