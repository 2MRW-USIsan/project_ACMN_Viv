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

### 2. 追加する CRUD 操作

| 操作 | 対象データ | 説明 |
|---|---|---|
| 一覧取得（Read） | （例）〇〇リスト | （説明） |
| 新規作成（Create） | （例）〇〇アイテム | （説明） |
| 更新（Update） | （例）〇〇アイテム | （説明） |
| 削除（Delete） | （例）〇〇アイテム | （説明） |

---

### 3. 扱うデータ型

```ts
// 概念レベルの型定義（詳細は AI が判断する）
type {Domain}Item = {
  id: string;
  // （フィールド名）: （型）;
};
```

---

### 4. 必要な API 操作

| メソッド | エンドポイント | 説明 |
|---|---|---|
| GET | `/api/xxx` | 一覧取得 |
| POST | `/api/xxx` | 新規作成 |
| PUT | `/api/xxx/[id]` | 更新 |
| DELETE | `/api/xxx/[id]` | 削除 |

---

### 5. StateReducer / FetchReducer への追加仕様

本工程でどちらの Reducer に何を追加するかを指定する。  
StateReducer / FetchReducer の使い分けは `STATE_REDUCER_RULE.md` を参照すること。

**StateReducer への追加：**

- （例）`itemList` — UI が直接操作・参照する作業コピー（追加・更新・削除が必要）
- （例）`isLoading` — API 通信中フラグ

**FetchReducer への追加：**

- （例）`itemList` — API から取得した生データキャッシュ（`null` = 未取得）

---

### 6. 技術的制約・参照すべき規約

- FetchReducer と StateReducer の使い分けは `STATE_REDUCER_RULE.md` §2「UI 状態と Service 状態の分離」に従うこと
- API ルートと business 層の分離は `BACKEND_RULE.md` に従うこと
- 本工程では副作用（`useEffect` による状態同期）は実装しない。工程4で追加する

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

### 2. 追加する CRUD 操作

| 操作 | 対象データ | 説明 |
|---|---|---|
| 一覧取得（Read） | サンプルアイテムリスト | 全アイテムを取得して一覧に表示する |
| 新規作成（Create） | サンプルアイテム | タイトル・詳細を入力して新規アイテムを作成する |
| 更新（Update） | サンプルアイテム | 選択中アイテムのタイトル・詳細を更新する |
| 削除（Delete） | サンプルアイテム | 選択中アイテムを削除する |

---

### 3. 扱うデータ型

```ts
type SampleItem = {
  id: string;
  title: string;
  detail: string;
  createdAt: string;
};
```

---

### 4. 必要な API 操作

| メソッド | エンドポイント | 説明 |
|---|---|---|
| GET | `/api/sampleItems` | 全アイテムの一覧取得 |
| POST | `/api/sampleItems` | 新規アイテムの作成 |
| PUT | `/api/sampleItems/[id]` | アイテムの更新 |
| DELETE | `/api/sampleItems/[id]` | アイテムの削除 |

---

### 5. StateReducer / FetchReducer への追加仕様

**StateReducer への追加：**

- `itemList` — UI が操作する作業コピー（追加・更新・削除を StateReducer に直接反映）
- `isLoading` — API 通信中フラグ（通信開始時に `true`、完了時に `false`）

**FetchReducer への追加：**

- `itemList` — API から取得した生データキャッシュ（初期値 `null`）

---

### 6. 技術的制約・参照すべき規約

- FetchReducer と StateReducer の使い分けは `STATE_REDUCER_RULE.md` §2 に従うこと
- API ルートは `app/api/sampleItems/route.ts`・`app/api/sampleItems/[id]/route.ts` に作成すること
- business 層は `business/sampleItem.ts` に作成すること
- 副作用（`useEffect` による FetchReducer → StateReducer の状態同期）は工程4で追加する

---

→ [README.md](../../../README.md) に戻る
