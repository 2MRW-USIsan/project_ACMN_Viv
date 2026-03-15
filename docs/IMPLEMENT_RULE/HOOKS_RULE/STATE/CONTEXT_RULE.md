# Context フック実装ルール

このドキュメントは、`state/` 層の統合フック `use{Page}Context` を実装する際の規約を定義します。

---

## 原則

**`use{Page}Context` は `use{Page}Service` と `use{Page}StateReducer` を統合し、`{Page}Contexts` オブジェクトを返すフックである。**

Controller・Composer・Properties・Handlers などの上位フックは、すべて `use{Page}Context` 経由で `contexts` を受け取る。  
各フックが Service や StateReducer を直接呼び出すことはしない。

---

## ファイル配置

```
src/hooks/{page}/state/
  use{Page}Context.ts       # Service + StateReducer を統合（contexts を返す）
  use{Page}Service.ts       # API 呼び出し管理
  use{Page}FetchReducer.ts  # フェッチ状態管理（Service から利用）
  use{Page}StateReducer.ts  # UI 状態管理; {Page}Contexts 型定義
```

---

## 基本構造

```ts
"use client";

import { use{Page}Service } from "@/hooks/{page}/state/use{Page}Service";
import { use{Page}StateReducer, {Page}Contexts } from "@/hooks/{page}/state/use{Page}StateReducer";

export type { {Page}Contexts };

export interface {Page}ContextReturns {
  contexts: {Page}Contexts;
}

export function use{Page}Context(): {Page}ContextReturns {
  const { fetchItem, request } = use{Page}Service();
  const { state, action } = use{Page}StateReducer();

  const contexts: {Page}Contexts = {
    service: { fetchItem, request },
    reducer: { state, action },
  };

  return { contexts };
}
```

---

## ルール詳細

### 1. Context フックの責務

- `use{Page}Service` と `use{Page}StateReducer` を呼び出して統合するだけのフックとする。
- ロジックを直接 Context フックに書かない。
- `{Page}Contexts` 型を `use{Page}StateReducer.ts` からインポートし、re-export する。

```ts
// ✅ Good — Service と StateReducer を統合するだけのフック
export function useSampleContext(): SampleContextReturns {
  const { fetchItem, request } = useSampleService();
  const { state, action } = useSampleStateReducer();

  const contexts: SampleContexts = {
    service: { fetchItem, request },
    reducer: { state, action },
  };

  return { contexts };
}

// ❌ Bad — Context フックに直接ロジックを書く
export function useSampleContext(): SampleContextReturns {
  const { fetchItem, request } = useSampleService();
  const { state, action } = useSampleStateReducer();
  // ロジックを Context に書かない
  const processedData = fetchItem.itemList?.filter(...);
  return { contexts: { ... } };
}
```

### 2. `{Page}Contexts` 型の定義場所

- `{Page}Contexts` 型は `use{Page}StateReducer.ts` のモジュールスコープで定義・export する。
- `use{Page}Context.ts` では re-export のみ行う。
- 上位フックは `use{Page}Context.ts` からインポートする。

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

### 3. ViewModel フックからの呼び出し

- `use{Page}ViewModel` は直接 Service や StateReducer を呼び出さず、必ず `use{Page}Context` 経由で `contexts` を受け取る。

```ts
// ✅ Good — Context 経由で contexts を受け取る
export function use{Page}ViewModel(): {Page}ViewModelReturns {
  const { contexts } = use{Page}Context();
  use{Page}Controller(contexts);
  const { viewModel } = use{Page}Composer(contexts);
  return { viewModel };
}

// ❌ Bad — Service や StateReducer を直接呼び出す
export function use{Page}ViewModel(): {Page}ViewModelReturns {
  const { fetchItem, request } = use{Page}Service();
  const { state, action } = use{Page}StateReducer();
  // ...
}
```

---

## 参考：既存の実装例

- [`application/src/hooks/sample/state/useSampleContext.ts`](../../../../application/src/hooks/sample/state/useSampleContext.ts)
- [`application/src/hooks/sample/state/useSampleStateReducer.ts`](../../../../application/src/hooks/sample/state/useSampleStateReducer.ts)
- [`application/src/hooks/sample/viewModel/useSampleViewModel.ts`](../../../../application/src/hooks/sample/viewModel/useSampleViewModel.ts)

関連ドキュメント: [`SERVICE_RULE.md`](./SERVICE_RULE.md)・[`STATE_REDUCER_RULE.md`](./STATE_REDUCER_RULE.md)・[`../VIEWMODEL_RULE.md`](../VIEWMODEL_RULE.md)・[`GUIDELINES.md`](../../../architecture/GUIDELINES.md)  
→ [README.md](../../../../README.md) に戻る
