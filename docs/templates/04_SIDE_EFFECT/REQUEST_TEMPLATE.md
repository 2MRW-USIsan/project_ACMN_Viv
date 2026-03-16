# 副作用影響変更依頼書テンプレート（工程4）

このドキュメントは **工程4「副作用影響の変更」** の AI 依頼書フォーマットです。  
本工程のスコープは **ハンドラの調整実装** と **Controller フック（Initialize・Effects）の実装** です。  
工程3で追加した FetchReducer / StateReducer / Service を接続し、副作用を動作させます。

テンプレートの記入例として [`/sample` 画面の副作用影響変更依頼書](#sample-画面副作用影響変更依頼書) を末尾に添付しています。

> 工程4の成果物報告書は [`REPORT_TEMPLATE.md`](./REPORT_TEMPLATE.md) を参照してください。  
> 前工程は [`../03_CRUD_ADD/`](../03_CRUD_ADD/)、次工程は [`../05_REFACTOR/`](../05_REFACTOR/) です。

---

## テンプレート

---

### 1. 対象画面

| 項目 | 内容 |
|---|---|
| 画面パス | `/xxx` |
| 画面名称 | （画面名） |

---

### 2. 変更・追加する処理の詳細仕様

箇条書きで詳細な仕様を記述する。  
各項目は「初期化処理」「副作用処理」「UI ハンドラ / API ハンドラの調整」に分類して列挙する。

#### 初期化処理（Initialize フック）の追加・変更

- （例）マウント時に `request.fetchItems()` を呼び出してアイテム一覧を取得する
- （例）`fetchItem.itemList` が `null` から配列に変化したとき、`action.setItemList(fetchItem.itemList)` で StateReducer の作業コピーに反映する

#### 副作用処理（Effects フック）の追加・変更

- （例）`state.selectedItem` が変化したとき、`action.setEditorTitle` / `action.setEditorDetail` でエディタ入力値を同期する

#### UI ハンドラ / API ハンドラの調整

- （例）`onSaveItem` — `request.createItem` または `request.updateItem` 呼び出し後に `action.setIsLoading(false)` と `action.selectItem(null)` でエディタをリセットする
- （例）`onDeleteItem` — `request.deleteItem` 呼び出し後に `action.selectItem(null)` で選択状態をリセットする

---

### 3. 技術的制約・参照すべき規約

- Controller フックの実装は `CONTROLLER_RULE.md` に従うこと
- `use{Page}Controller` は `use{Page}Initialize` と `use{Page}Effects` を呼び出すだけのハブとすること
- `useEffect` の依存配列は `fetchItem`・`action` などの安定した参照を設定すること

---

---

## `/sample` 画面副作用影響変更依頼書

---

### 1. 対象画面

| 項目 | 内容 |
|---|---|
| 画面パス | `/sample` |
| 画面名称 | サンプル管理画面 |

---

### 2. 変更・追加する処理の詳細仕様

#### 初期化処理（Initialize フック）の追加・変更

- マウント時に `request.fetchItems()` を呼び出してサンプルアイテム一覧を取得する
- `fetchItem.itemList` が `null` から配列に変化したとき、`action.setItemList(fetchItem.itemList)` で StateReducer の作業コピーに反映する

#### 副作用処理（Effects フック）の追加・変更

- `state.selectedItem` が変化したとき、`action.setEditorTitle(state.selectedItem?.title ?? "")` と `action.setEditorDetail(state.selectedItem?.detail ?? "")` でエディタ入力値を選択アイテムの値に同期する

#### UI ハンドラ / API ハンドラの調整

- `onSaveItem` — `state.selectedItem` が `null` のとき `request.createItem`、それ以外のとき `request.updateItem` を呼び出す。呼び出し後に `action.setIsLoading(false)` と `action.selectItem(null)` でエディタをリセットする
- `onDeleteItem` — `request.deleteItem(state.selectedItem.id)` を呼び出した後、`action.selectItem(null)` で選択状態をリセットする

---

### 3. 技術的制約・参照すべき規約

- Controller フックの実装は `CONTROLLER_RULE.md` に従うこと
- `useSampleController` は `useSampleInitialize` と `useSampleEffects` を呼び出すだけのハブとすること

---

→ [README.md](../../../README.md) に戻る
