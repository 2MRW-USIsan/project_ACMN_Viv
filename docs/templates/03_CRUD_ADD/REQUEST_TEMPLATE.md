# CRUD処理追加依頼書テンプレート（工程3）

このドキュメントは **工程3「CRUD処理の追加」** の AI 依頼書フォーマットです。  
本工程のスコープは **StateReducer および FetchReducer への状態・ハンドラの追加** と **Service への API 操作追加** です。  
副作用連携（初期化・状態同期）は後続工程（工程4）で実装します。

テンプレートの記入例として [`/sample` 画面の CRUD 処理追加依頼書](#sample-画面-crud-処理追加依頼書) を末尾に添付しています。

> 工程3の成果物報告書は [`REPORT_TEMPLATE.md`](./REPORT_TEMPLATE.md) を参照してください。  
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

### 2. StateReducer の構造定義と UI コンポーネントへの結びつけ

工程2で暫定プロパティ（`todo` プレフィックス）で実装したコンポーネントの  
プロパティを正式な名前・構造に置き換え、StateReducer の state / action と結びつける。

**StateReducer に追加する state フィールド：**

| フィールド名 | 型 | 対応するコンポーネント / プロパティ |
|---|---|---|
| （例）`selectedItem` | `{Domain}Item \| null` | （例）`{Name}EditorOrganism` の `entryValue` へマッピング |
| （例）`isEditorOpen` | `boolean` | （例）`{Name}EditorOrganism` の `isOpen` へマッピング |

**StateReducer に追加する action（ハンドラ）：**

| アクション名 | 引数 | 対応するコンポーネント / ハンドラ |
|---|---|---|
| （例）`selectItem` | `item: {Domain}Item \| null` | （例）`{Name}ListOrganism` の `onSelect` へマッピング |
| （例）`setIsEditorOpen` | `open: boolean` | （例）`{Name}EditorOrganism` の `onOpen` へマッピング |

---

### 3. FetchReducer の構造定義と CRUD 定義

API から取得するデータの構造と、必要な CRUD 操作を定義する。

**扱うデータ型：**

```ts
// 概念レベルの型定義（詳細は AI が判断する）
type {Domain}Item = {
  id: string;
  // （フィールド名）: （型）;
};
```

**FetchReducer に追加する state フィールド：**

| フィールド名 | 型 | 説明 |
|---|---|---|
| （例）`itemList` | `{Domain}Item[] \| null` | API から取得したアイテム一覧（`null` = 未取得） |

**Service に追加する CRUD 操作（request 関数）：**

| 操作 | 関数名 | エンドポイント | 説明 |
|---|---|---|---|
| 一覧取得（Read） | `fetchItems` | GET `/api/xxx` | アイテム一覧を取得する |
| 新規作成（Create） | `createItem` | POST `/api/xxx` | アイテムを作成する |
| 更新（Update） | `updateItem` | PUT `/api/xxx/[id]` | アイテムを更新する |
| 削除（Delete） | `deleteItem` | DELETE `/api/xxx/[id]` | アイテムを削除する |

---

### 4. 技術的制約・参照すべき規約

- FetchReducer と StateReducer の使い分けは `STATE_REDUCER_RULE.md` §2「UI 状態と Service 状態の分離」に従うこと
- API ルートと business 層の分離は `BACKEND_RULE.md` に従うこと
- 副作用（`useEffect` による状態同期）は実装しない。工程4で追加する

---

---

## `/sample` 画面 CRUD 処理追加依頼書

---

### 1. 対象画面

| 項目 | 内容 |
|---|---|
| 画面パス | `/sample` |
| 画面名称 | サンプル管理画面 |

---

### 2. StateReducer の構造定義と UI コンポーネントへの結びつけ

**StateReducer に追加する state フィールド：**

| フィールド名 | 型 | 対応するコンポーネント / プロパティ |
|---|---|---|
| `selectedItem` | `SampleItem \| null` | `SampleEditorOrganism` の `entryValue` 等へマッピング |
| `editorTitle` | `string` | `SampleEditorOrganism` のタイトル入力フィールドへマッピング |
| `editorDetail` | `string` | `SampleEditorOrganism` の詳細テキストエリアへマッピング |
| `isEditorOpen` | `boolean` | `SampleEditorOrganism` の `isOpen` へマッピング |
| `itemList` | `SampleItem[]` | `SampleListOrganism` のアイテム一覧へマッピング |
| `isLoading` | `boolean` | ローディング表示用フラグ |

**StateReducer に追加する action（ハンドラ）：**

| アクション名 | 引数 | 対応するコンポーネント / ハンドラ |
|---|---|---|
| `selectItem` | `item: SampleItem \| null` | `SampleListOrganism` の `onSelect` へマッピング |
| `setEditorTitle` | `title: string` | `SampleEditorOrganism` のタイトル onChange へマッピング |
| `setEditorDetail` | `detail: string` | `SampleEditorOrganism` の詳細 onChange へマッピング |
| `setIsEditorOpen` | `open: boolean` | エディタパネルの開閉ハンドラへマッピング |
| `setItemList` | `items: SampleItem[]` | 一覧初期化・再取得時に使用 |
| `addItem` | `item: SampleItem` | 一覧にアイテムを追加 |
| `updateItem` | `item: SampleItem` | 一覧のアイテムを更新 |
| `removeItem` | `id: string` | 一覧からアイテムを削除 |
| `setIsLoading` | `loading: boolean` | ローディング状態の更新 |

---

### 3. FetchReducer の構造定義と CRUD 定義

**扱うデータ型：**

```ts
type SampleItem = {
  id: string;
  title: string;
  detail: string;
  createdAt: string;
};
```

**FetchReducer に追加する state フィールド：**

| フィールド名 | 型 | 説明 |
|---|---|---|
| `itemList` | `SampleItem[] \| null` | API から取得したアイテム一覧（`null` = 未取得） |

**Service に追加する CRUD 操作（request 関数）：**

| 操作 | 関数名 | エンドポイント | 説明 |
|---|---|---|---|
| 一覧取得（Read） | `fetchItems` | GET `/api/sampleItems` | 全アイテムを取得する |
| 新規作成（Create） | `createItem` | POST `/api/sampleItems` | アイテムを新規作成する |
| 更新（Update） | `updateItem` | PUT `/api/sampleItems/[id]` | アイテムを更新する |
| 削除（Delete） | `deleteItem` | DELETE `/api/sampleItems/[id]` | アイテムを削除する |

---

### 4. 技術的制約・参照すべき規約

- FetchReducer と StateReducer の使い分けは `STATE_REDUCER_RULE.md` §2 に従うこと
- API ルートは `app/api/sampleItems/route.ts`・`app/api/sampleItems/[id]/route.ts` に作成すること
- business 層は `business/sampleItem.ts` に作成すること
- 副作用（`useEffect` による FetchReducer → StateReducer の状態同期）は工程4で追加する

---

→ [README.md](../../../README.md) に戻る
