# Architecture

このドキュメントはプロジェクトのアーキテクチャと設計思想を記述します。新規開発のコンテキストとして利用してください。

---

## 1. プロジェクト概要

**project_ACMN_Viv** は、AI プロンプト用の「Bloc」設定データを GUI で組み立て、YAML 形式でエクスポートするフロントエンドアプリケーションです。

- フレームワーク: **Next.js 16 (App Router)**
- 言語: **TypeScript 5**（`strict: true`）
- UI ライブラリ: **MUI (Material UI) v7**
- スタイリング: **Emotion（CSS-in-JS）**
- 状態管理: **React 組み込みの `useReducer` + カスタムフック**
- YAML 出力: **`yaml` パッケージ**
- Lint: **ESLint 9（`eslint-config-next`）**
- Compiler: **React 19 Compiler（`reactCompiler: true`）**

> アプリのソースは `application/` サブディレクトリに配置されています。

---

## 2. ディレクトリ構成

### 設計ルール

ディレクトリ構成は以下の 3 つのルールに従って設計されています。

**ルール 1 — 最上位層は Next.js App 標準のディレクトリ構成**

最上位層は Next.js App Router の標準的なディレクトリ構成に準拠します。

| ディレクトリ | 用途 |
|---|---|
| `app/` | App Router のエントリポイント（ルーティング） |
| `app/api/` | Next.js API Routes（バックエンド API 定義） |
| `components/` | 表示用 React コンポーネント |
| `hooks/` | 制御用カスタムフック |
| `types/` | TypeScript 型定義 |
| `business/` | サーバーサイドビジネスロジック |
| `services/` | クライアントサイド API 呼び出し関数 |

**ルール 2 — サブディレクトリは設計思想に沿った命名**

ルール 1 で分割したディレクトリをさらに細分化する場合、以下の設計思想に基づいた命名を行います。

- **Atomic Design**（主に `components/`）: `atoms/` → `molecules/` → `organisms/` の 3 階層で構成。
- **Clean Architecture**（主に `hooks/`）: `viewModel/`・`controller/`・`state/` の各レイヤーに分割。

**ルール 3 — 適した設計がない場合はドメイン粒度で分類**

特に適した設計パターンがない場合、またはさらなる分割が必要な場合は **ドメイン粒度** で分類します。

- **Page ドメイン**: 画面ごとにサブディレクトリを用意（例: `hooks/editor/`・`hooks/viewer/`）。
- **Page サブドメイン**: 画面内のデータ構成や機能構成でさらに分割（例: `hooks/editor/reducer/orders/`）。

### 構成ツリー

```
application/src/
├── app/                         # Next.js App Router エントリポイント
│   ├── api/
│   │   └── panelSaves/          # パネル保存 REST API
│   │       ├── route.ts         # GET（一覧）/ POST（作成）
│   │       └── [id]/route.ts    # GET（詳細）
│   ├── editor/
│   │   └── page.tsx             # /editor 画面（Bloc リストエディタ）
│   ├── viewer/
│   │   └── page.tsx             # /viewer 画面（オーダービュー）
│   ├── layout.tsx               # ルートレイアウト（ThemeRegistry を適用）
│   └── page.tsx                 # ルートページ（ホーム）
│
├── business/                    # ビジネスロジック（サーバーサイド）
│   └── panelSave.ts             # パネル保存 CRUD（現在はインメモリモック）
│
├── components/                  # Atomic Design に基づく UI コンポーネント
│   ├── atoms/                   # 最小単位の UI 要素（MUI ラッパー）
│   ├── molecules/               # Atoms を組み合わせた中粒度コンポーネント
│   │   ├── orders/
│   │   ├── panel/
│   │   ├── select/
│   │   └── switch/
│   ├── organisms/               # 複雑なビジネスロジックを持つコンポーネント
│   │   ├── bloc/
│   │   ├── editor/              # /editor 画面固有のオーガニズム
│   │   │   └── YamlEditorPanel.tsx
│   │   ├── orders/
│   │   ├── select/
│   │   ├── switch/
│   │   ├── viewer/              # /viewer 画面固有のオーガニズム
│   │   │   └── OrdersViewerPanel.tsx
│   │   ├── SaveLoadToolbar.tsx
│   │   └── YamlPreviewDialog.tsx
│   └── providers/               # アプリ全体に横断するプロバイダー
│       └── ThemeProvider.tsx
│
├── hooks/                       # 状態管理・データ変換カスタムフック
│   ├── editor/                  # /editor 画面関連フック
│   │   ├── viewModel/           # ViewModel 層（MVVM）
│   │   │   ├── useEditorViewModel.ts    # /editor 画面の ViewModel エントリポイント
│   │   │   ├── useEditorComposer.ts     # ViewModel 生成; EditorViewModel 定義
│   │   │   ├── useEditorProperties.ts   # プロパティ・ラベル情報提供; EditorProperties 定義
│   │   │   └── useEditorHandlers.ts     # ハンドラ情報提供; EditorHandlers 定義
│   │   ├── controller/          # Controller 層（副作用管理）
│   │   │   ├── useEditorController.ts   # 副作用管理（Initialize + Effects を呼ぶ）
│   │   │   ├── useEditorInitialize.ts   # 初期化 useEffect ラッパー
│   │   │   └── useEditorEffects.ts      # state 副作用 useEffect ラッパー
│   │   ├── service/             # Service 層（API 呼び出し）
│   │   │   └── useEditorService.ts      # API 呼び出し（パネル保存 CRUD）
│   │   └── reducer/             # Reducer 層（状態管理）
│   │       ├── useEditorReducer.ts      # 状態管理（パネル + 保存 + UI 状態）; EditorContexts 定義
│   │       ├── usePanelReducer.ts       # 4つのリデューサーを束ねるオーケストレーター
│   │       ├── usePanelBaseReducer.ts   # パネルリスト基本状態（ドメインリデューサー）
│   │       ├── usePanelData.ts          # State → View へのデータ変換（Presenter）
│   │       ├── useYamlEditor.ts         # YAML テキストエディタ状態管理
│   │       ├── orders/
│   │       │   └── useOrdersReducer.ts  # Orders ドメイン状態（ドメインリデューサー）
│   │       ├── select/
│   │       │   └── useSelectReducer.ts  # Select ドメイン状態（ドメインリデューサー）
│   │       └── switch/
│   │           └── useSwitchReducer.ts  # Switch ドメイン状態（ドメインリデューサー）
│   └── viewer/                  # /viewer 画面関連フック
│       ├── viewModel/           # ViewModel 層（MVVM）
│       │   ├── useViewerViewModel.ts    # /viewer 画面の ViewModel エントリポイント
│       │   ├── useViewerComposer.ts     # ViewModel 生成; ViewerViewModel 定義
│       │   ├── useViewerProperties.ts   # プロパティ・ラベル情報提供; ViewerProperties 定義
│       │   └── useViewerHandlers.ts     # ハンドラ情報提供; ViewerHandlers 定義
│       ├── controller/          # Controller 層（副作用管理）
│       │   ├── useViewerController.ts   # 副作用管理（Initialize + Effects を呼ぶ）
│       │   ├── useViewerInitialize.ts   # 初期化 useEffect ラッパー
│       │   └── useViewerEffects.ts      # state 副作用 useEffect ラッパー
│       ├── service/             # Service 層（API 呼び出し）
│       │   └── useViewerService.ts      # API 呼び出し（orderJson CRUD）
│       └── reducer/             # Reducer 層（状態管理）
│           ├── useViewerReducer.ts      # 状態管理（request + order + UI 状態）; ViewerContexts 定義
│           ├── useOrderJsonReducer.ts   # オーダー用 JSON 状態管理
│           ├── useRequestJsonReducer.ts # リクエスト用 JSON 状態管理
│           └── useOrdersViewer.ts       # オーダービュー状態管理
│
│   └── sample/                  # /sample 画面関連フック
│       ├── viewModel/           # ViewModel 層（MVVM）
│       │   ├── useSampleViewModel.ts    # /sample 画面の ViewModel エントリポイント
│       │   ├── useSampleComposer.ts     # ViewModel 生成; SampleViewModel 定義
│       │   ├── useSampleProperties.ts   # プロパティ・ラベル情報提供; SampleProperties 定義
│       │   └── useSampleHandlers.ts     # ハンドラ情報提供; SampleHandlers 定義
│       ├── controller/          # Controller 層（副作用管理）
│       │   ├── useSampleController.ts   # 副作用管理（Initialize + Effects を呼ぶ）
│       │   ├── useSampleInitialize.ts   # 初期化 useEffect ラッパー
│       │   └── useSampleEffects.ts      # state 副作用 useEffect ラッパー
│       └── state/               # State 層（Service + Reducer を統合）
│           ├── useSampleService.ts      # API 呼び出し（sampleItems CRUD）
│           ├── useSampleFetchReducer.ts # フェッチ状態管理（useSampleService から利用）
│           └── useSampleStateReducer.ts # UI 状態管理; SampleContexts 定義
│
├── types/                       # TypeScript 型定義
│   ├── editor/                  # /editor 画面関連の型
│   │   ├── panel.ts             # 状態型（State types）— PanelBaseItem, PanelItem, PanelDataStateType 等
│   │   ├── bloc.ts              # ビュー型（View types）— Bloc
│   │   ├── orders.ts            # ビュー型（View types）— Orders
│   │   ├── select.ts            # ビュー型（View types）— Select
│   │   ├── switch.ts            # ビュー型（View types）— Switch
│   │   └── panelSave.ts         # 保存データ型（PanelSaveItem, PanelSaveDetail）
│   └── viewer/                  # /viewer 画面関連の型
│       ├── orderJson.ts         # OrderJsonRecord + JsonValidationStatus
│       └── yamlData.ts          # YAML パース用データ型
│
├── utils/
│   ├── generateYaml.ts          # 状態 → YAML 文字列変換（純粋関数）
│   └── generateRequestJson.ts   # リクエスト JSON 生成（純粋関数）
│
├── services/                    # クライアントサイド API 呼び出し関数（純粋非同期関数）
│   ├── editorApiService.ts      # /editor 向け API 呼び出し（panelSaves）
│   └── viewerApiService.ts      # /viewer 向け API 呼び出し（orderJson）
│
└── theme/
    └── theme.ts                 # MUI テーマ設定
```

### パスエイリアス

`tsconfig.json` で `@/*` → `src/*` が設定されています。すべての import で `@/` を使用してください。

```ts
import { PanelList } from "@/components/molecules/panel/PanelList";
```

---

## 3. アーキテクチャの全体像

```
┌─────────────────────────────────────────────────────────────────┐
│  app/editor/page.tsx  （"use client" — View エントリ）            │
│                                                                 │
│   useEditorViewModel()  ←─ EditorViewModel（MVVM ViewModel）    │
│     ├── useEditorService()       ←─ API 呼び出し                │
│     ├── useEditorReducer()       ←─ State & Actions             │
│     │     └── usePanelReducer()  ←─ パネル状態オーケストレーター │
│     ├── useEditorController(contexts)  ←─ 副作用管理            │
│     │     ├── useEditorInitialize()    ←─ 初期化 useEffect      │
│     │     └── useEditorEffects()       ←─ 状態副作用 useEffect  │
│     └── useEditorComposer(contexts)    ←─ ViewModel 生成        │
│           ├── useEditorProperties(contexts) ←─ プロパティ・ラベル │
│           │     └── usePanelData(reducer)  ←─ BlocViewItem[]   │
│           └── useEditorHandlers(contexts)  ←─ ハンドラ          │
│                                                                 │
│   └── <PanelList>                                               │
│         └── <BlocPanelListItem> ×n                              │
│               ├── <OrdersPanelList>                             │
│               ├── <SelectPanelList>                             │
│               └── <SwitchPanelList>                             │
│                                                                 │
│   <SaveLoadToolbar>  ←─ vm.saveList / vm.onLoadSave など        │
│   <YamlPreviewDialog>  ←─ generateYaml(state)                  │
└─────────────────────────────────────────────────────────────────┘
```

データフローは一方向：

```
useEditorService (API 呼び出し)
    ↓ fetchItem / request
useEditorReducer (状態管理)
    ↓ state / action
useEditorController (副作用管理)     useEditorComposer (ViewModel 生成)
    ↓ useEffect による初期化・連携          ├── useEditorProperties (プロパティ)
                                           │     └── usePanelData (Presenter)
                                           │           ↓ BlocViewItem[] （コールバック束ね済み）
                                           └── useEditorHandlers (ハンドラ)
                                        Components（描画のみ）
                                           ↓ コールバック呼び出し
                                       action → useEditorReducer へ戻る
```

---

## 4. 状態管理アーキテクチャ

### 4-1. マルチドメイン リデューサー設計

状態は **4 つの独立したリデューサー** に分割されています。

| フック | 管理する状態 | 状態のキー |
|---|---|---|
| `usePanelBaseReducer` | パネルリスト（id, label, key, 開閉状態） | `{ panels: PanelBaseItem[] }` |
| `useOrdersReducer` | Orders ドメインのデータ | `Record<panelId, OrdersPanelChip>` |
| `useSelectReducer` | Select ドメインのデータ | `Record<panelId, SelectPanelChip>` |
| `useSwitchReducer` | Switch ドメインのデータ | `Record<panelId, SwitchPanelChip>` |

ドメインリデューサーはパネル ID をキーにした `Record` を持ちます。パネル基本情報とは独立しているため、ドメインごとのロジック変更が他に影響しません。

### 4-2. オーケストレーター（`usePanelReducer`）

`usePanelReducer` は 4 つのリデューサーを束ね、外部に単一のインターフェースを提供します（**Facade パターン**）。

```ts
export function usePanelReducer(): { state: PanelDataStateType; actions: PanelDataActionsType }
```

- **状態の統合**: `panelBaseState.panels` に各ドメインの状態をマージして `PanelDataStateType` を構築。
- **ドメイン間の同期**: パネル削除時に `useEffect` を使って各ドメインリデューサーの孤立データをクリーンアップ。
- **アクションのルーティング**: `ChipType` に応じたアクションのルーティングを `Record<ChipType, Action>` で実装（`if/else` 排除）。

### 4-3. Presenter（`usePanelData`）

`usePanelData(reducer)` は状態をコンポーネントが使いやすい形に変換します（**Presenter パターン**）。

- reducer の `state` と `actions` を受け取り `BlocViewItem[]` を返す。
- 各アイテムにコールバックを予めバインドして渡すため、コンポーネントは dispatch を意識しない。
- `useMemo` でメモ化し不要な再計算を防ぐ。

```
state.panels ──→ usePanelData ──→ BlocViewItem[]
                                   ├── orders.data: OrdersViewItem[]  （コールバック付き）
                                   ├── select.data: SelectViewItem[]  （コールバック付き）
                                   └── switch.data: SwitchViewItem[]  （コールバック付き）
```

### 4-4. ViewModel フック構成（`useEditorViewModel` / `useViewerViewModel`）

ViewModel フックは以下の 4 種のフックで構成されます（詳細は `GUIDELINES.md` の「ViewModel Logic Design」を参照）。

```ts
// use{Page}ViewModel の内部構成
const { fetchItem, request } = use{Page}Service();       // API 呼び出し
const { state, action } = use{Page}Reducer();            // 状態管理
const contexts = { service: { fetchItem, request }, reducer: { state, action } };
use{Page}Controller(contexts);                           // 副作用管理
const { viewModel } = use{Page}Composer(contexts);      // ViewModel 生成
```

- **Service**: API・Repository・Usecase の呼び出しが責務。状態を持たない純粋な非同期関数群を `fetchItem`（読み取り系）と `request`（書き込み系）に分けて提供。
- **Reducer**: `useReducer` / `useState` による状態管理。`state` と `action` を返す。処理量が増えた場合はドメイン単位のサブリデューサー（例: `usePanelReducer`）を内部で呼び出す。
- **Controller**: `contexts` を受け取り `use{Page}Initialize`（初期化 `useEffect`）と `use{Page}Effects`（状態副作用 `useEffect`）を呼び出す。
- **Composer**: `contexts` を受け取り `use{Page}Properties`（プロパティ・ラベル情報）と `use{Page}Handlers`（ハンドラ情報）を呼び出し、最終的な ViewModel を生成して返す。`ViewModel` 型の定義もここに置く。

`use{Page}ViewModel` が返す型（例: `EditorViewModel`）は `use{Page}Composer.ts` 内で定義し、`use{Page}ViewModel.ts` から re-export します。`{Page}ViewModel` は UI コンポーネント単位のオブジェクトを各プロパティに対応させた構造体として定義し、`{Page}Properties` と `{Page}Handlers` から必要な値を明示的にマッピングして組み立てます（spread による合成は行いません）。`{Page}Properties` 型は `use{Page}Properties.ts`、`{Page}Handlers` 型は `use{Page}Handlers.ts` でそれぞれ定義します。

### 4-5. ネストフィールドのラベルパース方式

Orders / Select の子アイテム更新には、ネストパスをラベル文字列としてエンコードするパターンを採用しています。

```
// Orders の例
`child:${childId}:item:${itemDataId}:complexItem:${complexItemId}:value`

// Select の例
`child:${childId}:listItem:${listItemId}:prompt`
```

`useOrdersReducer` の `CHANGE_ITEM_FORM` ハンドラーがこの文字列を正規表現でパースし、適切なネスト位置を更新します。これにより、汎用アクション 1 種類でネスト全深度の更新が可能になっています。

---

## 5. コンポーネント設計（Atomic Design）

### Atoms — 最小単位の UI 要素

ドメインに依存しない、再利用可能な基本 UI コンポーネントです。MUI コンポーネントのラッパーとして機能し、Molecules・Organisms が MUI を直接インポートしなくて済むようにします。

| ファイル | 役割 |
|---|---|
| `AddButtonPanel` | 「追加」ボタン（リストの末尾に配置） |
| `CheckChip` | ON/OFF 切り替え可能なチップ（選択・非選択で見た目変化） |
| `TextFieldPanel` | ラベル + TextField のペア（横並びレイアウト） |
| `RadioGroupPanel` | 水平ラジオボタングループ |
| `RemoveIconButton` | 削除ボタン（`RemoveCircleOutlineIcon` + `IconButton`） |
| `DeleteIconButton` | 削除ボタン（`DeleteOutlineIcon` + `IconButton`） |
| `ExpandIconButton` | 開閉トグルボタン（`ExpandLess` / `ExpandMore` + `IconButton`） |

### Molecules — ドメイン複合コンポーネント

Atoms を組み合わせた中粒度のコンポーネント。ドメイン（`orders/`, `select/`, `switch/`）ごとにサブディレクトリに整理。

| ファイル | 役割 |
|---|---|
| `panel/PanelList` | ヘッダー + 子要素リスト + 追加ボタンのコンテナ |
| `panel/PanelListItem` | 折りたたみ可能な key/label 入力 + 削除ボタン |
| `orders/OrdersTextFieldPanel` | Orders の子フィールド（type 別コンテンツ切替） |
| `orders/OrdersItemFieldPanel` | Orders のアイテムデータフィールド（複合データ対応） |
| `select/SelectTextFieldPanel` | Select の子フィールド |
| `select/ListItemTextFieldPanel` | Select のリストアイテムフィールド |
| `switch/SwitchTextFieldPanel` | Switch の子フィールド（4フィールド横並び） |

### Organisms — 複雑なドメインコンポーネント

ドメインロジックを包含する複雑なコンポーネント。

| ファイル | 役割 |
|---|---|
| `bloc/BlocPanelListItem` | Bloc パネル 1 件（Orders/Select/Switch の切替チップを持つ） |
| `editor/YamlEditorPanel` | YAML テキストエディタパネル（`/editor` 画面固有） |
| `orders/OrdersPanelList` | Orders パネルのリスト |
| `orders/OrdersPanelListItem` | Orders パネル 1 件 |
| `select/SelectPanelList` | Select パネルのリスト |
| `select/SelectPanelListItem` | Select パネル 1 件（Shuffle チップ付き） |
| `switch/SwitchPanelList` | Switch パネルのリスト |
| `switch/SwitchPanelListItem` | Switch パネル 1 件（Randomize チップ付き） |
| `viewer/OrdersViewerPanel` | オーダービューパネル（`/viewer` 画面固有） |
| `SaveLoadToolbar` | 保存・ロード UI（保存選択ドロップダウン + ロードボタン） |
| `YamlPreviewDialog` | YAML プレビューダイアログ（コピー・ダウンロード機能付き） |

### Providers — アプリ全体横断プロバイダー

MUI テーマや Emotion の SSR 対応など、UI には直接関係しないアプリ基盤コンポーネント。

| ファイル | 役割 |
|---|---|
| `EmotionRegistry` | Emotion CSS-in-JS の SSR 対応キャッシュプロバイダー |
| `ThemeRegistry` | `EmotionRegistry` + `ThemeProvider` + `CssBaseline` のラッパー |

---

## 6. 型設計

### 型の配置ルール

| 型カテゴリ | 配置場所 | 例 |
|---|---|---|
| ドメイン状態型・ビュー型・エンティティ型 | `types/` | `PanelItem`, `BlocViewItem`, `OrderJsonRecord` |
| 基底パネル型 | `types/editor/panel.ts` | `PanelBaseItem` |
| JSON バリデーション状態型 | `types/viewer/orderJson.ts` | `JsonValidationStatus` |
| ViewModel / Properties / Handlers 型 | 各 `viewModel/` フック内 | `EditorViewModel`, `EditorProperties` |
| Contexts / ReducerReturn / ServiceReturn 型 | 各フック内（アーキテクチャ指定） | `EditorContexts`, `EditorServiceReturn` |

### 状態型（State types） と ビュー型（View types）の分離

**`types/editor/panel.ts`** には useReducer が扱う状態型を定義します。内部 ID やフラグ（`state: boolean` など）を含みます。`PanelBaseItem`（ドメインチップを持たない基底パネル型）もここで定義します。

**`types/editor/bloc.ts`, `orders.ts`, `select.ts`, `switch.ts`** にはコンポーネントが受け取るビュー型を定義します。コールバック関数が既にバインドされた形で含まれています。

```
panel.ts (State)       →   usePanelData (変換)   →   bloc.ts / orders.ts / select.ts / switch.ts (View)
PanelDataStateType         BlocViewItem[]              コールバック付き View 型
```

**`types/editor/panelSave.ts`** にはパネル保存データの型（`PanelSaveItem`・`PanelSaveDetail`）を定義します。

**`types/viewer/orderJson.ts`** には DB に保存するオーダー JSON レコード型（`OrderJsonRecord`）と、JSON テキストのバリデーション状態型（`JsonValidationStatus`）を定義します。

**`types/viewer/yamlData.ts`** には localStorage の YAML 文字列をパースした際のデータ構造型を定義します。

### `ChipType`

`"orders" | "select" | "switch"` の Union 型。アクションのルーティングキーとして使用。

### Action Union 型

各リデューサーの Action は discriminated union として定義します。内部実装の型であるため `types/` には置かず、各リデューサーファイル内に `type` として定義します。

```ts
type Action =
  | { type: "ADD_ITEM"; payload: { panelId: number } }
  | { type: "DELETE_ITEM"; payload: { panelId: number; itemId: number } };
```

### ViewModel 型

`EditorViewModel` 型は `useEditorComposer.ts` 内で定義し、`useEditorViewModel.ts` から re-export します。`EditorViewModel` は UI コンポーネント単位のオブジェクトを各プロパティに対応させた構造体として定義し、`EditorProperties`（`useEditorProperties.ts` で定義）と `EditorHandlers`（`useEditorHandlers.ts` で定義）から必要な値を明示的にマッピングして組み立てます（spread による合成は行いません）。画面固有のインターフェースであるため `types/` には置きません。同様に `ViewerViewModel` は `useViewerComposer.ts` 内で `ViewerProperties` と `ViewerHandlers` から明示的にマッピングして定義します。

### Contexts 型（フック間依存注入）

`EditorContexts` / `ViewerContexts` は Service と Reducer の情報を bundle してフック間で伝搬する型です。`use{Page}Reducer.ts` 内で定義し、controller・viewModel 各フックから import します（アーキテクチャ仕様により hooks 内に置く）。

---

## 7. YAML 出力設計

`utils/generateYaml.ts` は状態を YAML に変換する純粋関数です。

- 内部状態（`id`, `state` フラグ, コールバック）は出力に含めない。
- 選択済み（`selected === true`）かつデータが存在するドメインのみ出力。
- 各ドメインはヘルパー関数群（`serialize*`）で直列化し、最後に `yaml.stringify()` で文字列化。

**出力 YAML の構造**:

```yaml
blocs:
  - key: panel-key
    label: Panel Label
    orders:
      - key: item-key
        label: Item Label
        fields:
          - key: field-key
            label: Field Label
            type: Random
            options:
              - value: "..."
                prompt: "..."
                weight: "1"
    select:
      - key: select-key
        label: Select Label
        shuffle: false
        fields:
          - key: field-key
            label: Field Label
            options:
              - prompt: "..."
                value: "..."
    switch:
      - key: switch-key
        label: Switch Label
        randomize: true
        fields:
          - key: field-key
            label: Field Label
            value: "on-value"
            altValue: "off-value"
```

---

## 8. テーマ設計

アプリ全体のデザインは **`MUI の createTheme`** で一元管理します。`theme/theme.ts` にテーマオブジェクト（`acmnTheme`）を定義し、`components/providers/ThemeRegistry.tsx` 経由でアプリ全体に適用します。主な設定：

- **カラーパレット**: Primary（ブルー系）、Secondary（ティール系）
- **タイポグラフィ**: コンパクトな文字サイズ（0.72〜0.85rem）
- **スペーシング**: 基本単位 6px
- **コンポーネントデフォルト**: TextField は small / outlined、Chip は高さ 22px 固定

テーマ実装の詳細は [`IMPLEMENT_THEME_RULE.md`](../implement/IMPLEMENT_THEME_RULE.md) を参照してください。

---

## 9. 新規コンポーネント追加時のガイド

1. **Atom か Molecule か Organism かを判断** する。
   - 汎用的な UI 要素 → `atoms/`
   - 複数 Atom の組み合わせ、特定ドメイン向け → `molecules/<domain>/`
   - reducer state やコールバックを props として受け取る複雑なコンポーネント → `organisms/<domain>/`
   - 特定画面にのみ使われる大型コンポーネント → `organisms/<screen>/`（例: `organisms/editor/`）

2. **Named export** を使用する（`export function MyComponent`）。

3. **Props 型** をファイル内 `interface` として `<コンポーネント名>Props` という名前で定義する。`children` を除くすべてのプロパティは `props` フィールドにまとめる。View 型をそのまま受け取る場合は `props: <ViewType>` の単一 prop にまとめる。

4. ドメイン固有コンポーネントは適切な **ドメインサブディレクトリ**（`orders/`, `select/`, `switch/`, `panel/`, `bloc/`）に配置する。画面固有の場合は画面名のサブディレクトリ（`editor/`, `viewer/`）に配置する。

5. コンポーネントは **描画のみ** 行う。データ変換・状態管理は hooks 層に任せる。

---

## 10. 新規 Hook 追加時のガイド

1. ファイルを `hooks/` ディレクトリに配置し、`use` プレフィックスを付ける。
2. **Named export** を使用する（`export function useFoo()`）。
3. `useReducer` を使う場合、Action は discriminated union で定義する。
4. アクション関数は `useMemo` でメモ化する（React 19 Compiler との競合を避けるため、`useMemo` 内に副関数を同居させること）。
5. ドメインリデューサーを新規追加する場合は `usePanelReducer.ts` でオーケストレーションに組み込む。
6. 画面固有の ViewModel は、以下の **5 種のフック** で構成する（詳細は [`GUIDELINES.md`](./GUIDELINES.md) の「ViewModel Logic Design」を参照）。
   - `use{Page}Service` — API 呼び出し（`fetchItem` / `request` を返す）
   - `use{Page}Reducer` — 状態管理（`state` / `action` を返す）; `{Page}Contexts` 型もここで定義する
   - `use{Page}Controller` — 副作用管理（`use{Page}Initialize` + `use{Page}Effects` を呼ぶ）
   - `use{Page}Composer` — ViewModel 生成（`{ viewModel }` を返す）; ViewModel 型もここで定義する
     - `use{Page}Properties` — プロパティ・ラベル情報提供（`{Page}Properties` 型もここで定義する）
     - `use{Page}Handlers` — ハンドラ情報提供（`{Page}Handlers` 型もここで定義する）
   - `use{Page}ViewModel` — 上記 4 フックを束ねるオーケストレーター

---

コーディング規約の詳細は [`GUIDELINES.md`](./GUIDELINES.md) を参照してください。  
実装ルールの詳細は [`IMPLEMENT_BASIC_RULE.md`](../implement/IMPLEMENT_BASIC_RULE.md)・[`IMPLEMENT_COMPONENT_RULE.md`](../implement/IMPLEMENT_COMPONENT_RULE.md)・[`IMPLEMENT_VIEWMODEL.md`](../implement/IMPLEMENT_VIEWMODEL.md)・[`IMPLEMENT_SERVICE.md`](../implement/IMPLEMENT_SERVICE.md)・[`IMPLEMENT_CONTROLLER_RULE.md`](../implement/IMPLEMENT_CONTROLLER_RULE.md)・[`IMPLEMENT_COMPOSER_RULE.md`](../implement/IMPLEMENT_COMPOSER_RULE.md)・[`IMPLEMENT_REDUCER_RULE.md`](../implement/IMPLEMENT_REDUCER_RULE.md)・[`IMPLEMENT_THEME_RULE.md`](../implement/IMPLEMENT_THEME_RULE.md) を参照してください。  
→ [README.md](../../README.md) に戻る
