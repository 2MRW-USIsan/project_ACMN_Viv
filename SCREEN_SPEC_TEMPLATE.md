# 画面仕様書テンプレート

このドキュメントは画面実装依頼時の仕様書テンプレートです。  
新しい画面を依頼する際はこのテンプレートをコピーし、各セクションを記入してください。  
テンプレートの実際の記入例として [`/editor` 画面の仕様書](#editor-画面仕様書--bloc-リストエディタ) を末尾に添付しています。

---

## テンプレート

---

### 1. 画面概要

| 項目 | 内容 |
|---|---|
| 画面パス | `/xxx` |
| 画面名称 | （例：〇〇エディタ） |
| 目的・役割 | （この画面で何を実現するか） |

---

### 2. UI レイアウト

画面の構成要素を上から順に箇条書きまたは ASCII アートで記述する。

```
例：
┌─────────────────────────────────────────────┐
│ [ヘッダーエリア]                               │
│   ボタン群 / ツールバー                        │
├─────────────────────────────────────────────┤
│ [メインコンテンツエリア]                        │
│   パネルリスト / フォーム / テーブル など         │
└─────────────────────────────────────────────┘
```

---

### 3. 機能・ユーザーインタラクション

各 UI 要素のユーザー操作と期待される動作を記述する。

| 操作 | 対象 UI | 期待される動作 |
|---|---|---|
| （例）クリック | 追加ボタン | 一覧にアイテムを追加する |
| ... | ... | ... |

---

### 4. コンポーネント構成（Atomic Design）

画面を構成するコンポーネントをレイヤーごとに列挙する。

#### Atoms
- `コンポーネント名` — 役割

#### Molecules
- `コンポーネント名` — 役割（使用 Atoms）

#### Organisms
- `コンポーネント名` — 役割（使用 Molecules/Atoms）

#### ページコンポーネント
- `app/<path>/page.tsx` — View エントリ。ViewModel フックを呼び出し、コンポーネントに props を渡すのみ。

---

### 5. 状態管理・フック構成（Clean Architecture）

#### ViewModel
- **`use<Screen>ViewModel.ts`**: 画面の ViewModel（MVVM）。以下のフックを束ねて View に渡す。

#### Application / Use Case 層
- **`use〇〇Reducer.ts`**: 〇〇ドメインの状態管理。

#### Infrastructure 層
- **`use〇〇Data.ts`** や API 呼び出しなど。

---

### 6. ViewModel インターフェース

```ts
export type <Screen>ViewModel = {
  // （プロパティ名）: （型） — （説明）
};
```

---

### 7. 型定義（DDD）

| 型名 | ファイル | 説明 |
|---|---|---|
| `〇〇StateType` | `types/〇〇.ts` | Reducer が扱う状態型 |
| `〇〇ViewItem` | `types/〇〇.ts` | コンポーネントに渡すビュー型（コールバック付き） |

---

### 8. API / 外部依存

| メソッド | エンドポイント | 説明 |
|---|---|---|
| GET | `/api/xxx` | 一覧取得 |
| POST | `/api/xxx` | 作成 |

---

### 9. データフロー概要

```
useReducer (状態) → usePanelData (Presenter) → BlocViewItem[] → Components（描画）
                                                                     ↓ コールバック
                                                               dispatch → useReducer
```

---

### 10. 設計上の特記事項・制約

- （例）ネストフィールドの更新はラベルエンコードパターンを使用（詳細は ARCHITECTURE.md 参照）
- （例）〇〇機能は未実装（TODO）

---

---

## `/editor` 画面仕様書 — Bloc リストエディタ

---

### 1. 画面概要

| 項目 | 内容 |
|---|---|
| 画面パス | `/editor` |
| 画面名称 | Bloc リストエディタ |
| 目的・役割 | AI プロンプト用の「Bloc」設定データを GUI で組み立て、YAML 形式でエクスポートする |

---

### 2. UI レイアウト

```
┌──────────────────────────────────────────────────────────────────┐
│ [トップバー]                                                        │
│   [Generate YAML ボタン]  [保存済みデータ選択] [ロード/再選択ボタン]  │
├──────────────────────────────────────────────────────────────────┤
│ [Bloc リスト]                                                       │
│   #BlocList ====                           [+ 追加ボタン]          │
│   ┌─ Bloc パネル (折りたたみ) ──────────────────────────────┐       │
│   │  [key フィールド] [label フィールド]  [削除]             │       │
│   │  [Orders チップ] [Select チップ] [Switch チップ]         │       │
│   │  ↳ 選択されたドメインのリスト（Orders / Select / Switch） │       │
│   └────────────────────────────────────────────────────────┘       │
└──────────────────────────────────────────────────────────────────┘
```

（YAML プレビューダイアログ：Generate YAML ボタン押下時にオーバーレイ表示）

```
┌─ YAML Preview ダイアログ ─────────────────────────────────────────┐
│ [コピーボタン] [ダウンロードボタン]                                   │
│ ─────────────────────────────────────────────────────────        │
│ （差分ありの場合）⚠ ロードデータと差分があります                       │
│ ─────────────────────────────────────────────────────────        │
│ <YAML テキスト>                                                    │
│ ─────────────────────────────────────────────────────────        │
│ [DB に登録] [Close]                                                │
└──────────────────────────────────────────────────────────────────┘
```

---

### 3. 機能・ユーザーインタラクション

| 操作 | 対象 UI | 期待される動作 |
|---|---|---|
| クリック | Bloc リスト の `+` 追加ボタン | 新しい Bloc パネル（空）をリスト末尾に追加 |
| クリック | Bloc パネルヘッダー | パネルの折りたたみ / 展開を切り替え |
| 入力 | Bloc パネルの key / label フィールド | パネルの key または label を更新 |
| クリック | Orders / Select / Switch チップ | 対応するドメインの有効 / 無効を切り替え |
| クリック | Orders リストの `+` 追加ボタン | Orders アイテムをリスト末尾に追加 |
| クリック | Select リストの `+` 追加ボタン | Select アイテムをリスト末尾に追加 |
| クリック | Switch リストの `+` 追加ボタン | Switch アイテムをリスト末尾に追加 |
| クリック | 各アイテムの削除ボタン | アイテムをリストから削除 |
| クリック | Select アイテムの Shuffle チップ | シャッフル on/off を切り替え |
| クリック | Switch アイテムの Randomize チップ | ランダマイズ on/off を切り替え |
| クリック | `Generate YAML` ボタン | YAML プレビューダイアログを開く |
| クリック | YAML ダイアログのコピーボタン | YAML 文字列をクリップボードにコピー |
| クリック | YAML ダイアログのダウンロードボタン | `blocs.yaml` としてファイルダウンロード |
| クリック | YAML ダイアログの `DB に登録` ボタン | 確認ダイアログを表示し、確認後に API へ保存 |
| クリック | YAML ダイアログの `Close` ボタン | ダイアログを閉じる |
| 選択 | 保存済みデータドロップダウン | 保存 ID を選択状態にする |
| クリック | `ロード` ボタン | 選択した保存データを API から取得しパネルに反映 |
| クリック | `再選択` ボタン | 選択・ロード状態をリセットする |

---

### 4. コンポーネント構成（Atomic Design）

#### Atoms

| コンポーネント | 役割 |
|---|---|
| `AddButtonPanel` | リスト末尾に配置する追加ボタン |
| `CheckChip` | ON/OFF 切り替えチップ（選択状態で色変化） |
| `TextFieldPanel` | ラベル + TextField の横並びペア |
| `RadioGroupPanel` | 水平ラジオボタングループ |

#### Molecules

| コンポーネント | 役割 |
|---|---|
| `panel/PanelList` | ヘッダー + 子リスト + 追加ボタンのコンテナ |
| `panel/PanelListItem` | 折りたたみ可能な key/label 入力 + 削除ボタン |
| `orders/OrdersTextFieldPanel` | Orders 子フィールド（type 別コンテンツ切替） |
| `orders/OrdersItemFieldPanel` | Orders アイテムデータフィールド（複合データ対応） |
| `select/SelectTextFieldPanel` | Select 子フィールド |
| `select/ListItemTextFieldPanel` | Select リストアイテムフィールド |
| `switch/SwitchTextFieldPanel` | Switch 子フィールド（4 フィールド横並び） |

#### Organisms

| コンポーネント | 役割 |
|---|---|
| `bloc/BlocPanelListItem` | Bloc パネル 1 件（Orders/Select/Switch チップ切替） |
| `orders/OrdersPanelList` | Orders パネルのリスト |
| `orders/OrdersPanelListItem` | Orders パネル 1 件 |
| `select/SelectPanelList` | Select パネルのリスト |
| `select/SelectPanelListItem` | Select パネル 1 件（Shuffle チップ付き） |
| `switch/SwitchPanelList` | Switch パネルのリスト |
| `switch/SwitchPanelListItem` | Switch パネル 1 件（Randomize チップ付き） |
| `SaveLoadToolbar` | 保存済み選択ドロップダウン + ロード/再選択ボタン |
| `YamlPreviewDialog` | YAML プレビュー（コピー・ダウンロード・DB 登録） |

#### ページコンポーネント

- `app/editor/page.tsx` — View エントリ。`useEditorViewModel` を呼び出し、`vm` プロパティをコンポーネントに渡すのみ。ロジックは持たない。

---

### 5. 状態管理・フック構成（Clean Architecture）

#### Presentation 層（ViewModel）
- **`useEditorViewModel.ts`**: 画面の ViewModel。以下のフックを束ね `EditorViewModel` 型を返す。

#### Application / Use Case 層
- **`usePanelReducer.ts`**: 4 つのドメインリデューサーを束ねる Facade。状態の統合・アクションルーティングを担当。
- **`usePanelData.ts`**: `PanelDataStateType` → `BlocViewItem[]` に変換する Presenter。

#### Domain 層
- **`usePanelBaseReducer.ts`**: パネルリスト基本状態（id・label・state・values）
- **`useOrdersReducer.ts`**: Orders ドメイン状態
- **`useSelectReducer.ts`**: Select ドメイン状態
- **`useSwitchReducer.ts`**: Switch ドメイン状態

#### Infrastructure 層
- **`useSavedPanels.ts`**: `/api/panelSaves` REST API を通じた保存・ロード。ロード済み状態を保持し差分検知に使用。

#### ユーティリティ
- **`utils/generateYaml.ts`**: `PanelDataStateType` → YAML 文字列への純粋関数変換。

---

### 6. ViewModel インターフェース

```ts
export type EditorViewModel = {
  // Panel list
  panelData: BlocViewItem[];       // 表示用 Bloc データ（コールバック付き）
  onAddPanel: () => void;          // Bloc パネル追加

  // Save/Load toolbar
  saveList: PanelSaveItem[];       // 保存済みデータ一覧
  selectedSaveId: string;          // 選択中の保存 ID
  isSaveLoading: boolean;          // ロード中フラグ
  isLoaded: boolean;               // データ読み込み済みフラグ
  loadedSaveName: string;          // 読み込み済み保存名
  onSelectSave: (id: string) => void;
  onLoadSave: () => void;
  onReselectSave: () => void;

  // YAML preview dialog
  yamlOpen: boolean;               // ダイアログ開閉状態
  yaml: string;                    // 生成された YAML 文字列
  hasDiff: boolean;                // ロードデータとの差分有無
  onOpenYaml: () => void;
  onCloseYaml: () => void;
  onRegister: () => Promise<void>; // DB 登録（API POST）
};
```

---

### 7. 型定義（DDD）

| 型名 | ファイル | 説明 |
|---|---|---|
| `PanelDataStateType` | `types/panel.ts` | Reducer が扱う内部状態型（id・state フラグ含む） |
| `PanelDataActionsType` | `types/panel.ts` | すべてのアクション関数の型集合 |
| `ChipType` | `types/panel.ts` | `"orders" \| "select" \| "switch"` のルーティングキー |
| `BlocViewItem` | `types/bloc.ts` | Bloc パネル 1 件のビュー型（全ドメインのコールバック付き） |
| `OrdersViewItem` | `types/orders.ts` | Orders ドメインのビュー型 |
| `SelectViewItem` | `types/select.ts` | Select ドメインのビュー型 |
| `SwitchViewItem` | `types/switch.ts` | Switch ドメインのビュー型 |
| `PanelSaveItem` | `types/panelSave.ts` | 保存済みデータの一覧表示用型（id・name・createdAt） |
| `PanelSaveDetail` | `types/panelSave.ts` | 保存済みデータの詳細型（上記 + data: PanelDataStateType） |
| `EditorViewModel` | `hooks/useEditorViewModel.ts` | 画面固有の ViewModel 型（types/ には置かない） |

---

### 8. API / 外部依存

| メソッド | エンドポイント | 説明 | ビジネスロジック |
|---|---|---|---|
| GET | `/api/panelSaves` | 保存済みデータ一覧取得 | `business/panelSave.ts#fetchPanelSaves` |
| GET | `/api/panelSaves/[id]` | 保存済みデータ詳細取得 | `business/panelSave.ts#fetchPanelSaveDetail` |
| POST | `/api/panelSaves` | パネル設定の新規保存 | `business/panelSave.ts#createPanelSave` |

> 現在の `business/panelSave.ts` はインメモリモック実装。将来的には Prisma/SQLite 等に差し替え予定。

---

### 9. データフロー概要

```
[ユーザー操作]
    ↓ onChangeForm / onClick など
[BlocViewItem コールバック]（usePanelData でバインド済み）
    ↓ dispatch
[useReducer]（usePanelBaseReducer / useOrdersReducer / useSelectReducer / useSwitchReducer）
    ↓ state（PanelDataStateType）
[usePanelReducer]（Facade：状態統合・ドメイン間同期）
    ↓ reducer.state
[usePanelData]（Presenter：State → BlocViewItem[]）
    ↓ panelData
[useEditorViewModel]（ViewModel：yaml・hasDiff・saveList などを統合）
    ↓ vm（EditorViewModel）
[app/editor/page.tsx]（View：描画のみ）
```

**保存・ロードフロー:**

```
[ユーザー：ロードボタン押下]
    ↓ vm.onLoadSave()
[useSavedPanels#loadSave]（GET /api/panelSaves/[id]）
    ↓ detail.data（PanelDataStateType）
[reducer.actions.loadState]（各ドメインリデューサーに一括反映）
    ↓ state 更新
[UI 再描画]
```

---

### 10. 設計上の特記事項・制約

- **ネストフィールドの更新**: Orders / Select のネスト構造更新には「ラベルエンコードパターン」（例: `child:0:item:1:value`）を使用。汎用アクション 1 種類で任意の深さのネストを更新可能。詳細は `ARCHITECTURE.md` §4-4 参照。
- **差分検知**: ロードした状態と現在の状態を `JSON.stringify` で比較し、差分がある場合は YAML プレビューダイアログに警告を表示する。
- **React 19 Compiler**: React 19 Compiler が有効なため、手動の `useMemo` 記述では補助関数をクロージャ内に同居させること（Compiler の依存解析と競合しないようにするため）。
- **保存データの永続化**: 現在は API 経由のインメモリモック。本番化の際は `business/panelSave.ts` を DB 実装に差し替える。
