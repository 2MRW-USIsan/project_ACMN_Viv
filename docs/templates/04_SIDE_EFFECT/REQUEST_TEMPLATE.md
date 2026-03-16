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

### 2. 追加・変更する副作用の内容

#### 初期化処理（Initialize フック）

マウント時に実行する初期化処理を列挙する。

| トリガー | 処理内容 |
|---|---|
| （例）`fetchItem.itemList` の取得完了 | `action.setItemList(fetchItem.itemList)` で StateReducer に反映する |
| （例）マウント時 | `request.fetchItems()` でアイテム一覧を取得する |

#### 副作用処理（Effects フック）

state の変化を監視して他ドメインの state を更新する処理を列挙する。

| トリガー（監視する state） | 処理内容 |
|---|---|
| （例）`state.selectedItem` の変化 | `action.setEditorTitle(state.selectedItem?.title ?? "")` でエディタに反映する |

---

### 3. ハンドラ調整仕様

工程2〜3 で追加したハンドラのうち、副作用との連携が必要なものを記述する。

| ハンドラ名 | 調整内容 |
|---|---|
| （例）`onSaveRegister` | API 呼び出し後に `request.fetchItems()` を呼んで一覧を再取得する |
| （例）`onSelectItem` | 選択後に `action.setEditorTitle` / `action.setEditorDetail` に反映する処理を追加する |

---

### 4. 技術的制約・参照すべき規約

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

### 2. 追加・変更する副作用の内容

#### 初期化処理（Initialize フック）

| トリガー | 処理内容 |
|---|---|
| マウント時 | `request.fetchItems()` でアイテム一覧を取得する |
| `fetchItem.itemList` の取得完了（`null` → 配列） | `action.setItemList(fetchItem.itemList)` で StateReducer の作業コピーに反映する |

#### 副作用処理（Effects フック）

| トリガー（監視する state） | 処理内容 |
|---|---|
| `state.selectedItem` の変化 | エディタ入力値（`editorTitle`・`editorDetail`）を選択アイテムの値に同期する |

---

### 3. ハンドラ調整仕様

| ハンドラ名 | 調整内容 |
|---|---|
| `onSaveItem`（工程3で追加） | `request.createItem` または `request.updateItem` 呼び出し後、`action.setIsLoading(false)` と `action.selectItem(null)` でエディタをリセットする |
| `onDeleteItem`（工程3で追加） | `request.deleteItem` 呼び出し後、`action.selectItem(null)` で選択状態をリセットする |

---

### 4. 技術的制約・参照すべき規約

- Controller フックの実装は `CONTROLLER_RULE.md` に従うこと
- `useSampleController` は `useSampleInitialize` と `useSampleEffects` を呼び出すだけのハブとすること

---

→ [README.md](../../../README.md) に戻る
