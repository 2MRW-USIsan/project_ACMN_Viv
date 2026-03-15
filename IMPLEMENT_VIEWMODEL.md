# ViewModel Hook 実装ルール

`use{Page}ViewModel` および関連フックの実装に関するルールを定義します。

---

## 全体構造

ViewModel フックは以下の 4 つの役割を持つフックで構成されます。

| フック | 役割 |
|--------|------|
| `use{Page}Context` | Service + StateReducer を統合し `contexts` を提供する |
| `use{Page}Controller` | 初期化・副作用管理（Initialize + Effects） |
| `use{Page}Composer` | ViewModel（Props + UI ハンドラ）の生成 |
| `use{Page}ViewModel` | 上記 3 つを呼び出し、ViewModel を返すエントリポイント |

---

## use{Page}ViewModel

`use{Page}ViewModel` は `use{Page}Context` でコンテキストを取得し、Controller と Composer に渡します。

```ts
interface {Page}ViewModelReturns {
  viewModel: {Page}ViewModel;
}

export function use{Page}ViewModel(): {Page}ViewModelReturns {
  // Context（Service + StateReducer）の呼び出し
  const { contexts } = use{Page}Context();
  // Controller の呼び出し（初期化制御、副作用管理）
  use{Page}Controller(contexts);
  // Composer の呼び出し（ViewModel の生成）
  const { viewModel } = use{Page}Composer(contexts);

  return { viewModel };
}
```

---

## use{Page}Context

`use{Page}Context` は `use{Page}Service` と `use{Page}StateReducer` を統合し、`contexts` として返します。  
`contexts` は Controller・Composer など下流のフックに DI コンテナとして渡されます。

```ts
interface {Page}ContextReturns {
  contexts: {Page}Contexts;
}

export function use{Page}Context(): {Page}ContextReturns {
  const { fetchItem, request } = use{Page}Service();
  const { state, action } = use{Page}StateReducer();

  const contexts: {Page}Contexts = { service: { fetchItem, request }, reducer: { state, action } };

  return { contexts };
}
```

### {Page}Contexts 型

`{Page}Contexts` 型は `use{Page}StateReducer` に定義します。

```ts
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
```

---

## ディレクトリ構成

```
hooks/{page}/
├── viewModel/
│   ├── use{Page}ViewModel.ts    # エントリポイント（use{Page}Context を使用）
│   ├── use{Page}Composer.ts     # ViewModel 生成; {Page}ViewModel 定義
│   ├── use{Page}Properties.ts   # プロパティ情報提供
│   └── use{Page}Handlers.ts     # ハンドラ情報提供
├── controller/
│   ├── use{Page}Controller.ts   # 副作用管理
│   ├── use{Page}Initialize.ts   # 初期化 useEffect
│   └── use{Page}Effects.ts      # 状態連動 useEffect
└── state/
    ├── use{Page}Context.ts      # Service + StateReducer を統合（contexts を返す）
    ├── use{Page}Service.ts      # API 呼び出し管理
    ├── use{Page}FetchReducer.ts # フェッチ状態管理（Service から利用）
    └── use{Page}StateReducer.ts # UI 状態管理; {Page}Contexts 型定義
```

---

## サンプル実装

`hooks/sample/` が上記ルールに準拠した参照実装です。

- `state/useSampleContext.ts` — `useSampleService` と `useSampleStateReducer` を統合
- `viewModel/useSampleViewModel.ts` — `useSampleContext` を利用したエントリポイント
