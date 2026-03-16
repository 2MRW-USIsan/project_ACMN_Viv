# 画面追加成果物仕様書テンプレート（工程1）

このドキュメントは **工程1「画面追加」** の AI 成果物報告書フォーマットです。  
本工程のスコープは **AppRouter へのパス追加と、全フックの空実装** です。

> 工程1の依頼書は [`REQUEST_TEMPLATE.md`](./REQUEST_TEMPLATE.md) を参照してください。  
> 工程2以降は [`../02_COMPONENT_ADD/`](../02_COMPONENT_ADD/) から続きます。

---

## テンプレート

---

### 1. 画面基本情報

| 項目 | 内容 |
|---|---|
| 画面パス | `/xxx` |
| 画面名称 | （画面名） |
| 目的・概要 | （この画面で何を実現するか） |

---

### 2. 作成ファイル一覧

本工程で新規作成したファイルを列挙する。

#### App Router

| ファイルパス | 説明 |
|---|---|
| `app/xxx/page.tsx` | ページエントリ。`use{Page}ViewModel` を呼び出し `{Page}Template` へ渡す |

#### ViewModel 層

| ファイルパス | 説明 |
|---|---|
| `hooks/xxx/viewModel/use{Page}ViewModel.ts` | ViewModel エントリーポイント |
| `hooks/xxx/viewModel/use{Page}Composer.ts` | ViewModel 合成・型定義（空） |
| `hooks/xxx/viewModel/use{Page}Properties.ts` | プロパティ情報提供（空） |
| `hooks/xxx/viewModel/use{Page}Handlers.ts` | ハンドラ情報提供（空） |

#### State 層

| ファイルパス | 説明 |
|---|---|
| `hooks/xxx/state/use{Page}Context.ts` | Service + StateReducer 統合・Contexts 型 re-export（空） |
| `hooks/xxx/state/use{Page}Service.ts` | API フェッチ呼び出し（空） |
| `hooks/xxx/state/use{Page}FetchReducer.ts` | フェッチ状態管理（空） |
| `hooks/xxx/state/use{Page}StateReducer.ts` | UI 状態管理・Contexts 型定義（空） |

#### Controller 層

| ファイルパス | 説明 |
|---|---|
| `hooks/xxx/controller/use{Page}Controller.ts` | Initialize + Effects を呼び出すハブ（空） |
| `hooks/xxx/controller/use{Page}Initialize.ts` | マウント時初期化（空） |
| `hooks/xxx/controller/use{Page}Effects.ts` | 副作用管理（空） |

---

### 3. ViewModel エントリーポイント構造

```ts
// hooks/xxx/viewModel/use{Page}ViewModel.ts
"use client";
import { use{Page}Context } from "@/hooks/xxx/state/use{Page}Context";
import { use{Page}Controller } from "@/hooks/xxx/controller/use{Page}Controller";
import { use{Page}Composer, {Page}ViewModel } from "@/hooks/xxx/viewModel/use{Page}Composer";

export type { {Page}ViewModel };

interface {Page}ViewModelReturns {
  viewModel: {Page}ViewModel;
}

export function use{Page}ViewModel(): {Page}ViewModelReturns {
  const { contexts } = use{Page}Context();
  use{Page}Controller(contexts);
  const { viewModel } = use{Page}Composer(contexts);
  return { viewModel };
}
```

---

### 4. ページコンポーネント構造

```tsx
// app/xxx/page.tsx
import { use{Page}ViewModel } from "@/hooks/xxx/viewModel/use{Page}ViewModel";
import { {Page}Template } from "@/components/templates/{Page}Template";

export default function {Page}Page() {
  const { viewModel } = use{Page}ViewModel();
  return <{Page}Template props={viewModel} />;
}
```

---

### 5. 空フック一覧（スタブ）

本工程で作成した空フックの構造を列挙する。  
各フックの実装は後続工程（工程2〜4）で追加する。

| フック | 戻り値 | 次工程での追加内容 |
|---|---|---|
| `use{Page}StateReducer` | `{ state: {}, action: {} }` | 工程2・3 で状態・アクション追加 |
| `use{Page}FetchReducer` | `{ state: {}, action: {} }` | 工程3 で状態・アクション追加 |
| `use{Page}Service` | `{ fetchItem: {}, request: {} }` | 工程3 で API フェッチ・リクエスト追加 |
| `use{Page}Context` | `{ contexts }` | 工程2〜3 の追加に伴い自動拡張 |
| `use{Page}Controller` | `void` | 工程4 で Initialize・Effects 実装 |
| `use{Page}Initialize` | `void` | 工程4 で初期化ロジック追加 |
| `use{Page}Effects` | `void` | 工程4 で副作用ロジック追加 |
| `use{Page}Composer` | `{ viewModel }` | 工程2〜3 の追加に伴い拡張 |
| `use{Page}Properties` | `{ properties }` | 工程2〜3 の追加に伴い拡張 |
| `use{Page}Handlers` | `{ handlers }` | 工程2〜3 の追加に伴い拡張 |

---

---

## `/sample` 画面追加成果物仕様書

---

### 1. 画面基本情報

| 項目 | 内容 |
|---|---|
| 画面パス | `/sample` |
| 画面名称 | サンプル管理画面 |
| 目的・概要 | サンプルアイテムの一覧表示・追加・編集・削除を行う管理画面 |

---

### 2. 作成ファイル一覧

#### App Router

| ファイルパス | 説明 |
|---|---|
| `app/sample/page.tsx` | ページエントリ。`useSampleViewModel` を呼び出し `SampleTemplate` へ渡す |

#### ViewModel 層

| ファイルパス | 説明 |
|---|---|
| `hooks/sample/viewModel/useSampleViewModel.ts` | ViewModel エントリーポイント |
| `hooks/sample/viewModel/useSampleComposer.ts` | ViewModel 合成・型定義（空） |
| `hooks/sample/viewModel/useSampleProperties.ts` | プロパティ情報提供（空） |
| `hooks/sample/viewModel/useSampleHandlers.ts` | ハンドラ情報提供（空） |

#### State 層

| ファイルパス | 説明 |
|---|---|
| `hooks/sample/state/useSampleContext.ts` | Service + StateReducer 統合・SampleContexts 型 re-export（空） |
| `hooks/sample/state/useSampleService.ts` | API フェッチ呼び出し（空） |
| `hooks/sample/state/useSampleFetchReducer.ts` | フェッチ状態管理（空） |
| `hooks/sample/state/useSampleStateReducer.ts` | UI 状態管理・SampleContexts 型定義（空） |

#### Controller 層

| ファイルパス | 説明 |
|---|---|
| `hooks/sample/controller/useSampleController.ts` | Initialize + Effects を呼び出すハブ（空） |
| `hooks/sample/controller/useSampleInitialize.ts` | マウント時初期化（空） |
| `hooks/sample/controller/useSampleEffects.ts` | 副作用管理（空） |

---

### 3. ViewModel エントリーポイント構造

```ts
// hooks/sample/viewModel/useSampleViewModel.ts
"use client";
import { useSampleContext } from "@/hooks/sample/state/useSampleContext";
import { useSampleController } from "@/hooks/sample/controller/useSampleController";
import { useSampleComposer, SampleViewModel } from "@/hooks/sample/viewModel/useSampleComposer";

export type { SampleViewModel };

interface SampleViewModelReturns {
  viewModel: SampleViewModel;
}

export function useSampleViewModel(): SampleViewModelReturns {
  const { contexts } = useSampleContext();
  useSampleController(contexts);
  const { viewModel } = useSampleComposer(contexts);
  return { viewModel };
}
```

---

### 4. ページコンポーネント構造

```tsx
// app/sample/page.tsx
import { useSampleViewModel } from "@/hooks/sample/viewModel/useSampleViewModel";
import { SampleTemplate } from "@/components/templates/SampleTemplate";

export default function SamplePage() {
  const { viewModel } = useSampleViewModel();
  return <SampleTemplate props={viewModel} />;
}
```

---

### 5. 空フック一覧（スタブ）

| フック | 戻り値 | 次工程での追加内容 |
|---|---|---|
| `useSampleStateReducer` | `{ state: {}, action: {} }` | 工程2・3 で状態・アクション追加 |
| `useSampleFetchReducer` | `{ state: {}, action: {} }` | 工程3 で状態・アクション追加 |
| `useSampleService` | `{ fetchItem: {}, request: {} }` | 工程3 で API フェッチ・リクエスト追加 |
| `useSampleContext` | `{ contexts }` | 工程2〜3 の追加に伴い自動拡張 |
| `useSampleController` | `void` | 工程4 で Initialize・Effects 実装 |
| `useSampleInitialize` | `void` | 工程4 で初期化ロジック追加 |
| `useSampleEffects` | `void` | 工程4 で副作用ロジック追加 |
| `useSampleComposer` | `{ viewModel }` | 工程2〜3 の追加に伴い拡張 |
| `useSampleProperties` | `{ properties }` | 工程2〜3 の追加に伴い拡張 |
| `useSampleHandlers` | `{ handlers }` | 工程2〜3 の追加に伴い拡張 |

---

→ [README.md](../../../README.md) に戻る
