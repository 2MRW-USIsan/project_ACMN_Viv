# コンポーネント追加成果物仕様書テンプレート（工程2）

このドキュメントは **工程2「コンポーネント追加」** の AI 成果物報告書フォーマットです。  
本工程のスコープは **UI コンポーネントの追加** と **StateReducer への状態・アクション追加** です。

> 工程2の依頼書は [`REQUEST_TEMPLATE.md`](./REQUEST_TEMPLATE.md) を参照してください。  
> 前工程は [`../01_SCREEN_ADD/`](../01_SCREEN_ADD/)、次工程は [`../03_CRUD_ADD/`](../03_CRUD_ADD/) です。

---

## テンプレート

---

### 1. 対象画面

| 項目 | 内容 |
|---|---|
| 画面パス | `/xxx` |
| 画面名称 | （画面名） |

---

### 2. 追加コンポーネント一覧

本工程で新規作成したコンポーネントを Atomic Design 階層ごとに列挙する。

#### templates

| コンポーネント名 | ファイルパス | 役割 |
|---|---|---|
| `{Page}Template` | `components/templates/{Page}Template.tsx` | （説明） |

#### organisms

| コンポーネント名 | ファイルパス | 役割 |
|---|---|---|
| `{Name}Organism` | `components/organisms/{Name}Organism.tsx` | （説明） |

#### molecules

| コンポーネント名 | ファイルパス | 役割 |
|---|---|---|
| `{Name}Molecule` | `components/molecules/{Name}Molecule.tsx` | （説明） |

#### atoms

| コンポーネント名 | ファイルパス | 役割 |
|---|---|---|
| `{Name}Atom` | `components/atoms/{Name}Atom.tsx` | （説明） |

---

### 3. StateReducer への変更内容

#### 追加した state フィールド

```ts
// 変更前
export interface {Page}ReducerState {
  // （既存フィールド）
}

// 変更後
export interface {Page}ReducerState {
  // （既存フィールド）
  selectedItem: {Domain}Item | null;  // 追加
  editorTitle: string;                // 追加
}
```

#### 追加した ACTION 型

```ts
type SELECT_ITEM = { item: {Domain}Item | null };
type SET_EDITOR_TITLE = { title: string };

type ACTION =
  // （既存アクション）
  | { type: "SELECT_ITEM"; payload: SELECT_ITEM }     // 追加
  | { type: "SET_EDITOR_TITLE"; payload: SET_EDITOR_TITLE } // 追加
  | { type: "INITIALIZE" };
```

#### 追加したアクション（{Page}ReducerAction）

| アクション名 | シグネチャ | 説明 |
|---|---|---|
| `selectItem` | `(item: {Domain}Item \| null) => void` | アイテムを選択する |
| `setEditorTitle` | `(title: string) => void` | タイトル入力値を更新する |

---

### 4. コンポーネント階層

追加したコンポーネントの階層と props の受け渡し関係を記述する。

```
app/xxx/page.tsx
  └─ {Page}Template（SampleViewModel を props として受け取る）
       ├─ {Name}ListOrganism（一覧表示）
       │    └─ {Name}CardMolecule × N
       └─ {Name}EditorOrganism（編集フォーム）
            ├─ TextFieldAtom（タイトル）
            └─ TextFieldAtom（詳細）
```

---

### 5. Composer / Properties / Handlers への追加内容

本工程での追加に伴い拡張した ViewModel 関連フックの変更内容を記述する。

#### `use{Page}Properties` への追加

```ts
export interface {Page}Properties {
  // （既存）
  selectedItem: {Domain}Item | null;  // 追加
  editorTitle: string;               // 追加
}
```

#### `use{Page}Handlers` への追加

```ts
export interface {Page}Handlers {
  // （既存）
  onSelectItem: (item: {Domain}Item | null) => void;  // 追加
  onEditorTitleChange: (title: string) => void;       // 追加
}
```

#### `use{Page}Composer` への追加（ViewModel へのマッピング）

```ts
export interface {Page}ViewModel {
  // （既存）
  editor: {
    selectedItem: {Domain}Item | null;
    title: string;
    onTitleChange: (title: string) => void;
  };
}
```

---

---

## `/sample` 画面コンポーネント追加成果物仕様書

---

### 1. 対象画面

| 項目 | 内容 |
|---|---|
| 画面パス | `/sample` |
| 画面名称 | サンプル管理画面 |

---

### 2. 追加コンポーネント一覧

#### templates

| コンポーネント名 | ファイルパス | 役割 |
|---|---|---|
| `SampleTemplate` | `components/templates/SampleTemplate.tsx` | ページ全体のレイアウト。一覧とエディタを横並びに配置する |

#### organisms

| コンポーネント名 | ファイルパス | 役割 |
|---|---|---|
| `SampleListOrganism` | `components/organisms/SampleListOrganism.tsx` | サンプルアイテムの一覧表示。追加ボタンを含む |
| `SampleEditorOrganism` | `components/organisms/SampleEditorOrganism.tsx` | 選択中アイテムの編集フォーム。タイトル・詳細・保存ボタンを含む |

#### molecules

| コンポーネント名 | ファイルパス | 役割 |
|---|---|---|
| `SampleItemCardMolecule` | `components/molecules/SampleItemCardMolecule.tsx` | アイテム1件の表示カード（タイトル・選択ボタン） |

---

### 3. StateReducer への変更内容

#### 追加した state フィールド

```ts
// 変更後（useSampleStateReducer.ts）
export interface SampleReducerState {
  selectedItem: SampleItem | null;  // 追加: 選択中のアイテム
  editorTitle: string;              // 追加: エディタのタイトル入力値
  editorDetail: string;             // 追加: エディタの詳細入力値
  isEditorOpen: boolean;            // 追加: エディタパネルの開閉状態
}
```

#### 追加した ACTION 型

```ts
type SELECT_ITEM = { item: SampleItem | null };
type SET_EDITOR_TITLE = { title: string };
type SET_EDITOR_DETAIL = { detail: string };
type SET_IS_EDITOR_OPEN = { open: boolean };

type ACTION =
  | { type: "SELECT_ITEM"; payload: SELECT_ITEM }
  | { type: "SET_EDITOR_TITLE"; payload: SET_EDITOR_TITLE }
  | { type: "SET_EDITOR_DETAIL"; payload: SET_EDITOR_DETAIL }
  | { type: "SET_IS_EDITOR_OPEN"; payload: SET_IS_EDITOR_OPEN }
  | { type: "INITIALIZE" };
```

#### 追加したアクション（SampleReducerAction）

| アクション名 | シグネチャ | 説明 |
|---|---|---|
| `selectItem` | `(item: SampleItem \| null) => void` | アイテムを選択する |
| `setEditorTitle` | `(title: string) => void` | タイトル入力値を更新する |
| `setEditorDetail` | `(detail: string) => void` | 詳細入力値を更新する |
| `setIsEditorOpen` | `(open: boolean) => void` | エディタパネルの開閉状態を切り替える |

---

### 4. コンポーネント階層

```
app/sample/page.tsx
  └─ SampleTemplate（SampleViewModel を props として受け取る）
       ├─ SampleListOrganism（vm.list を受け取り一覧表示）
       │    └─ SampleItemCardMolecule × N
       └─ SampleEditorOrganism（vm.editor を受け取り編集フォーム表示）
```

---

### 5. Composer / Properties / Handlers への追加内容

#### `useSampleProperties` への追加

```ts
export interface SampleProperties {
  selectedItem: SampleItem | null;
  editorTitle: string;
  editorDetail: string;
  isEditorOpen: boolean;
}
```

#### `useSampleHandlers` への追加

```ts
export interface SampleHandlers {
  onSelectItem: (item: SampleItem | null) => void;
  onEditorTitleChange: (title: string) => void;
  onEditorDetailChange: (detail: string) => void;
  onEditorOpenChange: (open: boolean) => void;
}
```

#### `useSampleComposer` への追加（ViewModel へのマッピング）

```ts
export interface SampleViewModel {
  list: {
    // 工程3で追加
  };
  editor: {
    selectedItem: SampleItem | null;
    title: string;
    detail: string;
    isOpen: boolean;
    onTitleChange: (title: string) => void;
    onDetailChange: (detail: string) => void;
    onOpenChange: (open: boolean) => void;
  };
}
```

---

→ [README.md](../../../README.md) に戻る
