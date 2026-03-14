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
- **複数の state を扱う場合は `useReducer` を利用したカスタムフックを作成する。** 詳細な実装規約は [`IMPLEMENT_REDUCER_RULE.md`](./IMPLEMENT_REDUCER_RULE.md) を参照。

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

## ViewModel Logic Design（ViewModel ロジックの設計）

ViewModel フック `use{Page}ViewModel` の内部は、以下の 4 種のカスタムフックで構成する。

```ts
// API・Repository・Usecase の呼び出しが責務
const { fetchItem, request } = use{Page}Service();

// 状態管理の状態およびアクションの取得が責務
const { state, action } = use{Page}Reducer();

// Context オブジェクト（Service と Reducer の情報をまとめて伝搬）
const contexts = { service: { fetchItem, request }, reducer: { state, action } };

// 状態管理および Service 処理との副作用管理が責務
use{Page}Controller(contexts);

// ViewModel の生成が責務
const { viewModels } = use{Page}Composer(contexts);
```

### 各フックの責務

| フック | 責務 |
|---|---|
| `use{Page}Service` | API・Repository・Usecase の呼び出し。`fetchItem`（外部 I/O のレスポンスデータ状態）と `request`（ミューテーション・フェッチトリガー）を提供する。`useState` + `useEffect` で非同期取得結果を状態として管理し、`fetchItem` はハンドラ関数ではなく取得済みデータそのものとして返す。 |
| `use{Page}Reducer` | `useReducer` / `useState` による状態管理。`state` と `action` を返す。 |
| `use{Page}Controller` | `contexts` を受け取り、副作用（`useEffect`）の管理を行う。`fetchItem` の状態変化に反応して Reducer の `action` を呼び出す。 |
| `use{Page}Composer` | `contexts` を受け取り、ViewModel を生成して `{ viewModels }` として返す。 |

### Service の設計方針

`use{Page}Service` は `fetchItem`（レスポンスデータ状態）と `request`（ミューテーション操作）の 2 つを返す。

- **`fetchItem`**: 外部 I/O（API・DB）から取得したレスポンスデータの **状態**（`useReducer` で管理）。ハンドラ関数ではなく、取得結果そのもの（例: `saveList: PanelSaveItem[] | null`）を保持する。内部の `useEffect` が fetch を実行し、結果を state に格納する。
- **`request`**: ミューテーション（POST / DELETE など）や、パラメータ付きフェッチのトリガー（例: `loadSaveDetail(id)`）を提供する。`useMemo` でメモ化した関数群。

`await fetch()` を含む実際の HTTP リクエスト処理は **`services/`** ディレクトリに純粋な非同期関数として外部化し、`use{Page}Service` フック内からインポートして使用する。

```ts
// ✅ Good — fetch 処理を services/ に外部化し、useReducer で状態管理
// services/editorApiService.ts
export async function fetchSaveList(): Promise<PanelSaveItem[]> {
  const res = await fetch("/api/panelSaves");
  if (!res.ok) throw new Error(`Failed to fetch save list: ${res.status}`);
  return (await res.json()) as PanelSaveItem[];
}

// hooks/editor/service/useEditorService.ts
export function use{Page}Service() {
  const [state, dispatch] = useReducer(serviceReducer, initialState);

  useEffect(() => {
    void fetchSaveList().then((list) =>
      dispatch({ type: "SET_SAVE_LIST", payload: list }),
    );
  }, [state.saveListVersion]);

  const request = useMemo(() => ({
    registerSave: async (name, data) => { /* POST して再フェッチをトリガー */ },
    loadSaveDetail: (id) => { /* dispatch で useEffect をトリガー */ },
  }), []);

  return { fetchItem: { saveList: state.saveList }, request };
}

// ❌ Bad — fetch 処理をフック内に直接記述し、fetchItem にハンドラ関数を返す
const fetchItem = useMemo(() => ({
  fetchSaveList: async () => { const res = await fetch("/api/..."); ... },
}), []);
```

`use{Page}Controller`（`use{Page}Initialize` / `use{Page}Effects`）では、`fetchItem` の状態変化を `useEffect` の依存配列で検知し、Reducer の `action` に反映する。

### Controller の分割

`use{Page}Controller` の内部は、副作用の性質に応じて以下 2 つに分割する。

```ts
export function use{Page}Controller(contexts: {Page}Contexts): void {
  use{Page}Initialize(contexts); // 初期化処理を構成する useEffect ラッパー
  use{Page}Effects(contexts);    // 連携等、state 副作用処理を構成する useEffect ラッパー
}
```

| フック | 責務 |
|---|---|
| `use{Page}Initialize` | マウント時の初期化（API 取得・localStorage 読込など）を担う `useEffect` ラッパー。 |
| `use{Page}Effects` | state の変化に応じたクロスドメイン連携などを担う `useEffect` ラッパー。 |

### Composer の構成

`use{Page}Composer` の内部は、以下 2 つのサブフックに `contexts` を渡して ViewModel を組み立てる。

```ts
export function use{Page}Composer(contexts: {Page}Contexts): Returns {
  const properties = use{Page}Properties(contexts); // プロパティ・ラベル情報を提供
  const handlers = use{Page}Handlers(contexts);     // ハンドラ情報を提供

  const viewModels: {Page}ViewModel = { ...properties, ...handlers };
  return { viewModels };
}
```

| フック | 責務 |
|---|---|
| `use{Page}Properties` | `contexts` を受け取り、プロパティやラベル情報（派生値・表示データ）を提供する。 |
| `use{Page}Handlers` | `contexts` を受け取り、イベントハンドラ（コールバック関数群）を提供する。 |

`{Page}ViewModel` 型は `use{Page}Properties` が返す `{Page}Properties` 型と `use{Page}Handlers` が返す `{Page}Handlers` 型の intersection 型として定義する。

```ts
export type {Page}ViewModel = {Page}Properties & {Page}Handlers;
```

### スケーリング規則

処理量が肥大化した場合は、ドメイン単位でサブフックを用意する。

- **Reducer**: `use{Page}Reducer` 内部で `use{Domain}Reducer` を呼び出す（例: `useEditorReducer` 内で `usePanelReducer` を呼ぶ）。
- **Controller**: `use{Page}Initialize` / `use{Page}Effects` 内部でドメイン単位のサブフックを呼び出す。
- **Composer**: `use{Page}Properties` / `use{Page}Handlers` 内部でドメイン単位のサブフックを呼び出す。

---

## Component Props Pattern（コンポーネント Props のパターン）

- **Props 型は必ず `interface` で定義**し、命名規則は **`<コンポーネント名>Props`** とする。

```ts
// ✅ Good
interface OrdersPanelListItemProps { ... }

// ❌ Bad — type を使っている、または ComponentName と一致しない名前
type Props = { ... }
interface OrdersPanelListItem { ... }
```

- `children` などを除くすべてのプロパティは `props` という単一オブジェクトにまとめて渡す。コンポーネント内部では destructure して使用する。

```tsx
// ✅ Good
interface MyComponentProps {
  props: { label: string; onClick: () => void };
  children: React.ReactNode;
}
export function MyComponent({ props, children }: MyComponentProps) {
  const { label, onClick } = props;
  return <ChildComponent props={{ label, onClick }}>{children}</ChildComponent>;
}

// ❌ Bad — children 以外が props にまとまっていない
interface MyComponentProps {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}
```

- View 型（`types/` 内の `*ViewItem` 型）をそのまま渡す場合も `props` フィールドに格納する。

```tsx
// ✅ Good — View 型をそのまま渡す
<OrdersPanelListItem key={item.id} props={item} />

// props をそのまま受け取るコンポーネント側
interface OrdersPanelListItemProps {
  props: OrdersViewItem;
}
export function OrdersPanelListItem({ props }: OrdersPanelListItemProps) { ... }
```

---

## MUI Import Convention（MUI インポート規約）

- **MUI コンポーネントのインポートは可能な限り `atoms/` 階層で行う**。Atoms は「MUI のラッパー」として機能し、Molecules・Organisms は Atoms 経由で MUI コンポーネントを利用する。

```tsx
// ✅ Good — Molecule は Atom 経由で MUI を利用
import { RemoveIconButton } from "@/components/atoms/RemoveIconButton";
// ...
<RemoveIconButton props={{ onClick: onDelete }} />

// ❌ Bad — Molecule が MUI を直接インポート
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { IconButton } from "@mui/material";
// ...
<IconButton size="small" onClick={onDelete}>
  <RemoveCircleOutlineIcon fontSize="small" />
</IconButton>
```

- `Grid`・`List`・`ListItem`・`Collapse` などの純粋なレイアウト用プリミティブは、Molecules・Organisms でも直接インポートして構わない。
- Organism 固有の複合的な MUI コンポーネント（`Dialog`・`FormControl` など）はその Organism 内で直接インポートしてよい。

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
| 画面 ViewModel フック | `hooks/<screen>/use<Screen>ViewModel.ts` |
| Service フック（API 呼び出し） | `hooks/<screen>/use<Screen>Service.ts` |
| Reducer フック（状態管理） | `hooks/<screen>/use<Screen>Reducer.ts` |
| Controller フック（副作用管理） | `hooks/<screen>/use<Screen>Controller.ts` |
| Initialize フック（初期化副作用） | `hooks/<screen>/use<Screen>Initialize.ts` |
| Effects フック（状態副作用） | `hooks/<screen>/use<Screen>Effects.ts` |
| Composer フック（ViewModel 生成） | `hooks/<screen>/use<Screen>Composer.ts` |
| Properties フック（プロパティ・ラベル情報） | `hooks/<screen>/use<Screen>Properties.ts` |
| Handlers フック（ハンドラ情報） | `hooks/<screen>/use<Screen>Handlers.ts` |
| 型定義 | `types/` |
| ユーティリティ（純粋関数） | `utils/` |
| API 呼び出し関数（クライアントサイド） | `services/` |
| MUI テーマ | `theme/` |
| ビジネスロジック（サーバーサイド） | `business/` |

- molecules・organisms はドメイン（`orders/`, `select/`, `switch/`, `panel/`, `bloc/`）ごとにサブディレクトリを切る。
- 特定の画面にのみ使われる Organism は画面名のサブディレクトリ（`editor/`, `viewer/`）に配置する。

---

## Conclusion

これらのガイドラインに従うことで、コードの保守性・可読性が高まりバグが減ります。新しいコードを書く際はこのドキュメントをコンテキストとして参照してください。アーキテクチャの詳細は [`ARCHITECTURE.md`](./ARCHITECTURE.md) を参照してください。
