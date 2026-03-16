# リファクタリング依頼書テンプレート（工程5）

このドキュメントは **工程5「リファクタリング」** の AI 依頼書フォーマットです。  
本工程のスコープは **型定義やユーティリティ処理の統合・外部化** です。  
工程1〜4 で実装した機能に変更を加えず、コードの整理・品質向上を目的とします。

テンプレートの記入例として [`/sample` 画面のリファクタリング依頼書](#sample-画面リファクタリング依頼書) を末尾に添付しています。

> 工程5の成果物報告書は [`REPORT_TEMPLATE.md`](./REPORT_TEMPLATE.md) を参照してください。  
> 前工程は [`../04_SIDE_EFFECT/`](../04_SIDE_EFFECT/) です。

---

## テンプレート

---

### 1. 対象画面・対象ファイル

| 項目 | 内容 |
|---|---|
| 画面パス | `/xxx`（複数の場合は列挙） |
| 対象ファイル | （例）`hooks/xxx/state/use{Page}StateReducer.ts`、`utils/reducers/xxx/` 以下 |
| リファクタリング理由 | （例）reducer の case 内にロジックが増え可読性が低下した |

---

### 2. リファクタリングの内容

実施してほしいリファクタリングの内容を列挙する。

#### 型定義の整理

- （例）`use{Page}StateReducer.ts` 内のドメイン型 `{Domain}Item` を `types/{domain}.ts` に外部化する
- （例）複数フックで重複している型定義を共通の `types/` ファイルに統合する

#### Reducer ユーティリティの外部化

- （例）`use{Page}StateReducer.ts` の reducer case 内の処理を `utils/reducers/{page}/{page}ReducerUtils.ts` に分離する
- `STATE_REDUCER_RULE.md` §4「reducer 内の処理関数の外部化」に従うこと

#### その他

- （例）〇〇の定数を `constants/` に外部化する
- （例）重複ロジックを汎用ユーティリティとして `utils/` に切り出す

---

### 3. 期待する成果物

- 型定義は `types/{domain}.ts` に配置する
- Reducer ユーティリティ関数は `utils/reducers/{page}/` に配置する
- リファクタリング後も既存の動作・インターフェースが変わらないこと

---

---

## `/sample` 画面リファクタリング依頼書

---

### 1. 対象画面・対象ファイル

| 項目 | 内容 |
|---|---|
| 画面パス | `/sample` |
| 対象ファイル | `hooks/sample/state/useSampleStateReducer.ts`、`hooks/sample/state/useSampleFetchReducer.ts` |
| リファクタリング理由 | StateReducer の reducer case 内に処理ロジックが増加し、`STATE_REDUCER_RULE.md` §4 の規約に違反している |

---

### 2. リファクタリングの内容

#### 型定義の整理

- `useSampleStateReducer.ts` 内で定義している `SampleItem` 型を `types/sampleItem.ts` に外部化する
- `useSampleService.ts` で定義している `SampleFetchItem` / `SampleRequest` 型も同ファイルに統合する

#### Reducer ユーティリティの外部化

- `useSampleStateReducer.ts` の reducer 各 case 内の処理を `utils/reducers/sample/sampleReducerUtils.ts` に分離する
- 分離対象: `selectItem`・`setEditorTitle`・`setEditorDetail`・`setItemList`・`addItem`・`updateItem`・`removeItem`

#### その他

- 特になし

---

### 3. 期待する成果物

- `SampleItem` 型は `types/sampleItem.ts` に配置し、各フックからインポートして使用すること
- Reducer ユーティリティ関数は `utils/reducers/sample/sampleReducerUtils.ts` に配置すること
- リファクタリング後も既存の動作・外部インターフェースが変わらないこと

---

→ [README.md](../../../README.md) に戻る
