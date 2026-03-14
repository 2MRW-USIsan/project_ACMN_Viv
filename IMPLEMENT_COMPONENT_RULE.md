# Component 実装ルール

`/components` 以下のコンポーネント実装に関するルールを定義します。

---

## MVVM 設計方針

- 原則として、コンポーネント内での状態制御は行わない。
- 状態（State）およびイベントハンドラは、ViewModelフック（`use{Page}ViewModel`）から受け取ったものを利用する。
- コンポーネントは表示とユーザー操作の委譲のみを担い、ビジネスロジックや副作用を持たない。

---

## Atomic Design 設計方針

Atomic Design の階層に従い、以下の粒度でコンポーネントを分類する。

### pages

- Next.js App Router の制約により `/app` 以下に配置する。
- ViewModelフック（`use{Page}ViewModel`）を呼び出し、取得した State とハンドラを下位コンポーネントへ渡す。
- 表示ロジックは持たず、ViewModel の結果をそのまま template コンポーネントへ伝播させる。

```tsx
// 例: /app/editor/page.tsx
export default function EditorPage() {
  const viewModel = useEditorViewModel();
  return <EditorTemplate {...viewModel} />;
}
```

### template

- ViewModelから pages 経由で props として渡ってきた State をもとに、ページ全体のレイアウトや表示の切り替えを行う。
- 複数の organisms を組み合わせてページ構造を構成する。
- 自身で状態を持たない。

```tsx
// 例: /components/templates/EditorTemplate.tsx
export const EditorTemplate = ({ isLoading, panels, ...handlers }: EditorViewModel) => (
  isLoading ? <LoadingOrganism /> : <EditorOrganism panels={panels} {...handlers} />
);
```

### organisms

- template 同様に、受け取った State をもとに表示を切り替える。
- **機能単位**の粒度を持つコンポーネント（例：フォーム全体、パネルリスト全体など）。
- 複数の molecules / atoms を組み合わせて1つの機能ブロックを構成する。
- 自身で状態を持たない。

```tsx
// 例: /components/organisms/PanelListOrganism.tsx
export const PanelListOrganism = ({ panels, onSelect }: PanelListProps) => (
  <Stack>
    {panels.map((panel) => (
      <PanelCardMolecule key={panel.id} panel={panel} onSelect={onSelect} />
    ))}
  </Stack>
);
```

### molecules

- 複数の atoms で構成された**部品単位**の粒度を持つコンポーネント。
- 特定のUIパターン（例：ラベル付き入力フィールド、アイコン付きボタンなど）を表現する。
- 自身で状態を持たない。

```tsx
// 例: /components/molecules/LabeledInputMolecule.tsx
export const LabeledInputMolecule = ({ label, value, onChange }: LabeledInputProps) => (
  <Stack direction="row" alignItems="center">
    <LabelAtom text={label} />
    <TextFieldAtom value={value} onChange={onChange} />
  </Stack>
);
```

### atoms

- コンポーネントの**最小単位**。原則として MUI コンポーネントのラッパーとして実装する。
- 例外として、MUI コンポーネント単体で完結する**UI内部状態**（例：開閉状態、ホバー状態など）を持ってもよい。
- パフォーマンス上の理由から DOM を直接操作してもよいが、その際は `useRef` や `useEffect` で管理し、外部に隠蔽すること。

```tsx
// 例: /components/atoms/TextFieldAtom.tsx（MUIラッパー）
export const TextFieldAtom = ({ value, onChange }: TextFieldAtomProps) => (
  <TextField value={value} onChange={onChange} />
);

// 例: /components/atoms/CollapseButtonAtom.tsx（例外：開閉状態を内部に持つ）
export const CollapseButtonAtom = ({ label }: CollapseButtonAtomProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen((prev) => !prev)}>{label}</Button>
      <Collapse in={open}>...</Collapse>
    </>
  );
};

// 例: /components/atoms/CanvasAtom.tsx（例外：DOM操作をuseRef/useEffectで隠蔽）
export const CanvasAtom = ({ data }: CanvasAtomProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    // DOM操作はここで完結させ、外部に露出しない
  }, [data]);
  return <canvas ref={canvasRef} />;
};
```

---

## 階層サマリー

| 階層 | 粒度 | 状態管理 | 配置 |
|------|------|----------|------|
| pages | ページ単位 | ViewModelフックを呼び出す | `/app/**/page.tsx` |
| template | ページレイアウト単位 | 持たない | `/components/templates/` |
| organisms | 機能単位 | 持たない | `/components/organisms/` |
| molecules | 部品単位（複数atoms） | 持たない | `/components/molecules/` |
| atoms | 最小単位（MUIラッパー） | 例外的にUI内部状態のみ可 | `/components/atoms/` |
