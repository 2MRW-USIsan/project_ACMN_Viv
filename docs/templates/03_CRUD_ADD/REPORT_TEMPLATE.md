# CRUD処理追加成果物仕様書テンプレート（工程3）

このドキュメントは **工程3「CRUD処理の追加」** の AI 成果物報告書フォーマットです。  
本工程のスコープは **StateReducer および FetchReducer への状態・ハンドラの追加** と **Service への API 操作追加** です。

> 工程3の依頼書は [`REQUEST_TEMPLATE.md`](./REQUEST_TEMPLATE.md) を参照してください。  
> 前工程は [`../02_COMPONENT_ADD/`](../02_COMPONENT_ADD/)、次工程は [`../04_SIDE_EFFECT/`](../04_SIDE_EFFECT/) です。

---

## テンプレート

---

### 1. 対象画面

| 項目 | 内容 |
|---|---|
| 画面パス | `/xxx` |
| 画面名称 | （画面名） |

---

### 2. StateReducer への変更内容

#### 追加した state フィールド

```ts
// 変更後（use{Page}StateReducer.ts）
export interface {Page}ReducerState {
  // （既存フィールド）
  itemList: {Domain}Item[];  // 追加: UI が操作する作業コピー
  isLoading: boolean;        // 追加: API 通信中フラグ
}
```

#### 追加した ACTION 型と handler

| ACTION 型 | ハンドラ名 | シグネチャ | 説明 |
|---|---|---|---|
| `SET_ITEM_LIST` | `setItemList` | `(items: {Domain}Item[]) => void` | 一覧データを設定する |
| `ADD_ITEM` | `addItem` | `(item: {Domain}Item) => void` | アイテムを追加する |
| `UPDATE_ITEM` | `updateItem` | `(item: {Domain}Item) => void` | アイテムを更新する |
| `REMOVE_ITEM` | `removeItem` | `(id: string) => void` | アイテムを削除する |
| `SET_IS_LOADING` | `setIsLoading` | `(loading: boolean) => void` | ローディング状態を設定する |

---

### 3. FetchReducer への変更内容

#### 追加した state フィールド

```ts
// 変更後（use{Page}FetchReducer.ts）
export interface {Page}FetchState {
  itemList: {Domain}Item[] | null;  // 追加: API 取得キャッシュ（null = 未取得）
}
```

#### 追加した ACTION 型と handler

| ACTION 型 | ハンドラ名 | シグネチャ | 説明 |
|---|---|---|---|
| `SET_ITEM_LIST` | `setItemList` | `(items: {Domain}Item[]) => void` | API 取得データを格納する |

---

### 4. Service への変更内容

#### 追加した fetchItem フィールド

| フィールド名 | 型 | 説明 |
|---|---|---|
| `itemList` | `{Domain}Item[] \| null` | API から取得したアイテム一覧（FetchReducer 経由） |

#### 追加した request 関数

| 関数名 | シグネチャ | 説明 |
|---|---|---|
| `fetchItems` | `() => Promise<void>` | アイテム一覧を API から取得し FetchReducer に格納する |
| `createItem` | `(data: Create{Domain}ItemInput) => Promise<void>` | アイテムを新規作成し再フェッチする |
| `updateItem` | `(data: {Domain}Item) => Promise<void>` | アイテムを更新し再フェッチする |
| `deleteItem` | `(id: string) => Promise<void>` | アイテムを削除し再フェッチする |

---

### 5. API / 外部依存

| メソッド | エンドポイント | 説明 | ビジネスロジック |
|---|---|---|---|
| GET | `/api/xxx` | 一覧取得 | `business/xxx.ts#fetch{Domain}Items` |
| POST | `/api/xxx` | 新規作成 | `business/xxx.ts#create{Domain}Item` |
| PUT | `/api/xxx/[id]` | 更新 | `business/xxx.ts#update{Domain}Item` |
| DELETE | `/api/xxx/[id]` | 削除 | `business/xxx.ts#delete{Domain}Item` |

---

### 6. 作成・変更ファイル一覧

| ファイルパス | 変更種別 | 説明 |
|---|---|---|
| `hooks/xxx/state/use{Page}StateReducer.ts` | 変更 | state・ACTION・handler 追加 |
| `hooks/xxx/state/use{Page}FetchReducer.ts` | 変更 | state・ACTION・handler 追加 |
| `hooks/xxx/state/use{Page}Service.ts` | 変更 | fetchItem・request 追加 |
| `app/api/xxx/route.ts` | 新規 | GET・POST ハンドラ |
| `app/api/xxx/[id]/route.ts` | 新規 | PUT・DELETE ハンドラ |
| `business/xxx.ts` | 新規 | business ロジック関数 |
| `schemas/xxx.ts` | 新規 | Zod バリデーションスキーマ |

---

---

## `/sample` 画面 CRUD 処理追加成果物仕様書

---

### 1. 対象画面

| 項目 | 内容 |
|---|---|
| 画面パス | `/sample` |
| 画面名称 | サンプル管理画面 |

---

### 2. StateReducer への変更内容

#### 追加した state フィールド

```ts
// 変更後（useSampleStateReducer.ts）
export interface SampleReducerState {
  // 既存（工程2で追加済み）
  selectedItem: SampleItem | null;
  editorTitle: string;
  editorDetail: string;
  isEditorOpen: boolean;
  // 工程3で追加
  itemList: SampleItem[];   // UI が操作する作業コピー
  isLoading: boolean;       // API 通信中フラグ
}
```

#### 追加した ACTION 型と handler

| ACTION 型 | ハンドラ名 | シグネチャ | 説明 |
|---|---|---|---|
| `SET_ITEM_LIST` | `setItemList` | `(items: SampleItem[]) => void` | 一覧データを設定する |
| `ADD_ITEM` | `addItem` | `(item: SampleItem) => void` | アイテムを一覧に追加する |
| `UPDATE_ITEM` | `updateItem` | `(item: SampleItem) => void` | アイテムを一覧内で更新する |
| `REMOVE_ITEM` | `removeItem` | `(id: string) => void` | アイテムを一覧から削除する |
| `SET_IS_LOADING` | `setIsLoading` | `(loading: boolean) => void` | ローディング状態を設定する |

---

### 3. FetchReducer への変更内容

#### 追加した state フィールド

```ts
// 変更後（useSampleFetchReducer.ts）
export interface SampleFetchState {
  itemList: SampleItem[] | null;  // 追加: API 取得キャッシュ
}
```

#### 追加した ACTION 型と handler

| ACTION 型 | ハンドラ名 | シグネチャ | 説明 |
|---|---|---|---|
| `SET_ITEM_LIST` | `setItemList` | `(items: SampleItem[]) => void` | API 取得データを格納する |

---

### 4. Service への変更内容

#### 追加した fetchItem フィールド

| フィールド名 | 型 | 説明 |
|---|---|---|
| `itemList` | `SampleItem[] \| null` | API から取得したアイテム一覧 |

#### 追加した request 関数

| 関数名 | シグネチャ | 説明 |
|---|---|---|
| `fetchItems` | `() => Promise<void>` | アイテム一覧を GET /api/sampleItems から取得する |
| `createItem` | `(data: CreateSampleItemInput) => Promise<void>` | アイテムを新規作成し再フェッチする |
| `updateItem` | `(data: SampleItem) => Promise<void>` | アイテムを更新し再フェッチする |
| `deleteItem` | `(id: string) => Promise<void>` | アイテムを削除し再フェッチする |

---

### 5. API / 外部依存

| メソッド | エンドポイント | 説明 | ビジネスロジック |
|---|---|---|---|
| GET | `/api/sampleItems` | 全アイテムの一覧取得 | `business/sampleItem.ts#fetchSampleItems` |
| POST | `/api/sampleItems` | 新規アイテムの作成 | `business/sampleItem.ts#createSampleItem` |
| PUT | `/api/sampleItems/[id]` | アイテムの更新 | `business/sampleItem.ts#updateSampleItem` |
| DELETE | `/api/sampleItems/[id]` | アイテムの削除 | `business/sampleItem.ts#deleteSampleItem` |

---

### 6. 作成・変更ファイル一覧

| ファイルパス | 変更種別 | 説明 |
|---|---|---|
| `hooks/sample/state/useSampleStateReducer.ts` | 変更 | state・ACTION・handler 追加 |
| `hooks/sample/state/useSampleFetchReducer.ts` | 変更 | state・ACTION・handler 追加 |
| `hooks/sample/state/useSampleService.ts` | 変更 | fetchItem・request 追加 |
| `app/api/sampleItems/route.ts` | 新規 | GET・POST ハンドラ |
| `app/api/sampleItems/[id]/route.ts` | 新規 | PUT・DELETE ハンドラ |
| `business/sampleItem.ts` | 新規 | business ロジック関数 |
| `schemas/sampleItem.ts` | 新規 | Zod バリデーションスキーマ |

---

→ [README.md](../../../README.md) に戻る
