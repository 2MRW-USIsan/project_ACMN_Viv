# リファクタリング成果物仕様書テンプレート（工程5）

このドキュメントは **工程5「リファクタリング」** の AI 成果物報告書フォーマットです。  
本工程のスコープは **型定義やユーティリティ処理の統合・外部化** です。

> 工程5の依頼書は [`REQUEST_TEMPLATE.md`](./REQUEST_TEMPLATE.md) を参照してください。  
> 前工程は [`../04_SIDE_EFFECT/`](../04_SIDE_EFFECT/) です。

---

## テンプレート

---

### 1. 対象画面・対象ファイル

| 項目 | 内容 |
|---|---|
| 画面パス | `/xxx`（複数の場合は列挙） |
| リファクタリング理由 | （実施した理由） |

---

### 2. 型定義の変更内容

#### 外部化・統合した型

| 型名 | 移動前 | 移動後 | 説明 |
|---|---|---|---|
| `{Domain}Item` | `hooks/xxx/state/use{Page}StateReducer.ts` | `types/{domain}.ts` | （説明） |

---

### 3. Reducer ユーティリティ関数の変更内容

#### 外部化した関数

| 関数名 | 移動前 | 移動後 | 説明 |
|---|---|---|---|
| `selectItem` | reducer case 内（インライン） | `utils/reducers/{page}/{page}ReducerUtils.ts` | アイテム選択処理 |
| `addItem` | reducer case 内（インライン） | `utils/reducers/{page}/{page}ReducerUtils.ts` | アイテム追加処理 |
| `updateItem` | reducer case 内（インライン） | `utils/reducers/{page}/{page}ReducerUtils.ts` | アイテム更新処理 |
| `removeItem` | reducer case 内（インライン） | `utils/reducers/{page}/{page}ReducerUtils.ts` | アイテム削除処理 |

#### 変更後の reducer 構造

```ts
// utils/reducers/{page}/{page}ReducerUtils.ts
import { {Page}ReducerState } from "@/hooks/{page}/state/use{Page}StateReducer";

export const selectItem = (
  state: {Page}ReducerState,
  payload: { item: {Domain}Item | null }
): {Page}ReducerState => ({
  ...state,
  selectedItem: payload.item,
});

// ...（他のユーティリティ関数）
```

```ts
// use{Page}StateReducer.ts — reducer case が委譲に変更
import { selectItem, addItem } from "@/utils/reducers/{page}/{page}ReducerUtils";

case "SELECT_ITEM":
  return state && selectItem(state, action.payload);
case "ADD_ITEM":
  return state && addItem(state, action.payload);
```

---

### 4. その他の変更内容

変更した内容を列挙する。

| 内容 | 変更前 | 変更後 |
|---|---|---|
| （例）定数の外部化 | `hooks/xxx/...` 内インライン | `constants/xxx.ts` |

---

### 5. 作成・変更ファイル一覧

| ファイルパス | 変更種別 | 説明 |
|---|---|---|
| `types/{domain}.ts` | 新規 | ドメイン型定義 |
| `utils/reducers/{page}/{page}ReducerUtils.ts` | 新規 | reducer ユーティリティ関数 |
| `hooks/xxx/state/use{Page}StateReducer.ts` | 変更 | 型・ユーティリティ関数のインポートに差し替え |

---

---

## `/sample` 画面リファクタリング成果物仕様書

---

### 1. 対象画面・対象ファイル

| 項目 | 内容 |
|---|---|
| 画面パス | `/sample` |
| リファクタリング理由 | reducer case 内のインラインロジックを外部化し、`STATE_REDUCER_RULE.md` §4 の規約に準拠させるため |

---

### 2. 型定義の変更内容

#### 外部化・統合した型

| 型名 | 移動前 | 移動後 | 説明 |
|---|---|---|---|
| `SampleItem` | `hooks/sample/state/useSampleStateReducer.ts` | `types/sampleItem.ts` | サンプルアイテムのドメイン型 |
| `SampleFetchItem` | `hooks/sample/state/useSampleService.ts` | `types/sampleItem.ts` | Service の fetchItem 型 |
| `SampleRequest` | `hooks/sample/state/useSampleService.ts` | `types/sampleItem.ts` | Service の request 型 |

---

### 3. Reducer ユーティリティ関数の変更内容

#### 外部化した関数

| 関数名 | 移動前 | 移動後 | 説明 |
|---|---|---|---|
| `selectItem` | reducer case 内（インライン） | `utils/reducers/sample/sampleReducerUtils.ts` | アイテム選択・エディタ値反映処理 |
| `setEditorTitle` | reducer case 内（インライン） | `utils/reducers/sample/sampleReducerUtils.ts` | エディタタイトル更新処理 |
| `setEditorDetail` | reducer case 内（インライン） | `utils/reducers/sample/sampleReducerUtils.ts` | エディタ詳細更新処理 |
| `setItemList` | reducer case 内（インライン） | `utils/reducers/sample/sampleReducerUtils.ts` | アイテム一覧設定処理 |
| `addItem` | reducer case 内（インライン） | `utils/reducers/sample/sampleReducerUtils.ts` | アイテム追加処理 |
| `updateItem` | reducer case 内（インライン） | `utils/reducers/sample/sampleReducerUtils.ts` | アイテム更新処理 |
| `removeItem` | reducer case 内（インライン） | `utils/reducers/sample/sampleReducerUtils.ts` | アイテム削除処理 |

#### 変更後の reducer 構造（抜粋）

```ts
// utils/reducers/sample/sampleReducerUtils.ts
import { SampleReducerState } from "@/hooks/sample/state/useSampleStateReducer";
import { SampleItem } from "@/types/sampleItem";

export const selectItem = (
  state: SampleReducerState,
  payload: { item: SampleItem | null }
): SampleReducerState => ({
  ...state,
  selectedItem: payload.item,
});

export const addItem = (
  state: SampleReducerState,
  payload: { item: SampleItem }
): SampleReducerState => ({
  ...state,
  itemList: [...state.itemList, payload.item],
});
```

```ts
// useSampleStateReducer.ts — reducer case が委譲に変更
import { selectItem, addItem, updateItem, removeItem } from "@/utils/reducers/sample/sampleReducerUtils";

case "SELECT_ITEM":
  return state && selectItem(state, action.payload);
case "ADD_ITEM":
  return state && addItem(state, action.payload);
```

---

### 4. その他の変更内容

| 内容 | 変更前 | 変更後 |
|---|---|---|
| 特になし | — | — |

---

### 5. 作成・変更ファイル一覧

| ファイルパス | 変更種別 | 説明 |
|---|---|---|
| `types/sampleItem.ts` | 新規 | SampleItem・SampleFetchItem・SampleRequest 型定義 |
| `utils/reducers/sample/sampleReducerUtils.ts` | 新規 | StateReducer ユーティリティ関数 |
| `hooks/sample/state/useSampleStateReducer.ts` | 変更 | 型・ユーティリティ関数のインポートに差し替え |
| `hooks/sample/state/useSampleService.ts` | 変更 | 型のインポートを `types/sampleItem.ts` に差し替え |

---

→ [README.md](../../../README.md) に戻る
