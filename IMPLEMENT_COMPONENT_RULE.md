# Component 実装ルール

`/components` 以下のコンポーネント実装に関するルールを定義します。

---

## MVVM 設計方針

- 原則として、コンポーネント内での状態制御は行わない。
- 状態（State）およびイベントハンドラは、ViewModelフック（`use{Page}ViewModel`）から受け取ったものを利用する。
- コンポーネントは表示とユーザー操作の委譲のみを担い、ビジネスロジックや副作用を持たない。

---

## コンポーネント実装の基本ルール

`IMPLEMENT_BASIC_RULE.md` の汎用ルールに加え、コンポーネント固有の追加ルールを以下に定義する。

- コンポーネントは `const` で宣言し、`export { Name }` で名前付きエクスポートする（`export const` は使用しない）。ただし `/app` 以下の pages は Next.js の要求に従い `export default function` とする。
- Props は `interface {ComponentName}Props` で定義する。
- コンポーネントへ渡す情報は原則すべて `props` プロパティにまとめて渡す（`children` などの `ReactNode` はその限りではない）。

```tsx
// OK
interface ExampleProps {
  props: {
    label: string;
    onClick: () => void;
  };
}
const Example = ({ props }: ExampleProps) => <button onClick={props.onClick}>{props.label}</button>;
export { Example };

// NG: export const の使用
export const Example = ({ props }: ExampleProps) => <button onClick={props.onClick}>{props.label}</button>;

// NG: Props をそれぞれ個別に受け取る（props プロパティにまとめていない）
interface ExampleProps {
  label: string;
  onClick: () => void;
}
const Example = ({ label, onClick }: ExampleProps) => <button onClick={onClick}>{label}</button>;
```

---



Atomic Design の階層に従い、以下の粒度でコンポーネントを分類する。

### pages

- Next.js App Router の制約により `/app` 以下に配置する。
- ViewModelフック（`use{Page}ViewModel`）を呼び出し、取得した State とハンドラを下位コンポーネントへ渡す。
- 表示ロジックは持たず、ViewModel の結果をそのまま template コンポーネントへ伝播させる。

```tsx
// 例: /app/editor/page.tsx
export default function EditorPage() {
  const viewModel = useEditorViewModel();
  return <EditorTemplate props={viewModel} />;
}
```

### template

- ViewModelから pages 経由で props として渡ってきた State をもとに、ページ全体のレイアウトや表示の切り替えを行う。
- 複数の organisms を組み合わせてページ構造を構成する。
- 自身で状態を持たない。

```tsx
// 例: /components/templates/EditorTemplate.tsx
interface EditorTemplateProps {
  props: EditorViewModel;
}

const EditorTemplate = ({ props }: EditorTemplateProps) => (
  props.isLoading ? <LoadingOrganism /> : <EditorOrganism props={props} />
);

export { EditorTemplate };
```

### organisms

- template 同様に、受け取った State をもとに表示を切り替える。
- **機能単位**の粒度を持つコンポーネント（例：フォーム全体、パネルリスト全体など）。
- 複数の molecules / atoms を組み合わせて1つの機能ブロックを構成する。
- 自身で状態を持たない。

```tsx
// 例: /components/organisms/PanelListOrganism.tsx
interface PanelListOrganismProps {
  props: {
    panels: Panel[];
    onSelect: (id: string) => void;
  };
}

const PanelListOrganism = ({ props }: PanelListOrganismProps) => (
  <Stack>
    {props.panels.map((panel) => (
      <PanelCardMolecule key={panel.id} props={{ panel, onSelect: props.onSelect }} />
    ))}
  </Stack>
);

export { PanelListOrganism };
```

### molecules

- 複数の atoms で構成された**部品単位**の粒度を持つコンポーネント。
- 特定のUIパターン（例：ラベル付き入力フィールド、アイコン付きボタンなど）を表現する。
- 自身で状態を持たない。

```tsx
// 例: /components/molecules/LabeledInputMolecule.tsx
interface LabeledInputMoleculeProps {
  props: {
    label: string;
    value: string;
    onChange: (value: string) => void;
  };
}

const LabeledInputMolecule = ({ props }: LabeledInputMoleculeProps) => (
  <Stack direction="row" alignItems="center">
    <LabelAtom props={{ text: props.label }} />
    <TextFieldAtom props={{ value: props.value, onChange: props.onChange }} />
  </Stack>
);

export { LabeledInputMolecule };
```

### atoms

- コンポーネントの**最小単位**。原則として MUI コンポーネントのラッパーとして実装する。
- 例外として、MUI コンポーネント単体で完結する**UI内部状態**（例：開閉状態、ホバー状態など）を持ってもよい。
- パフォーマンス上の理由から DOM を直接操作してもよいが、その際は `useRef` や `useEffect` で管理し、外部に隠蔽すること。

```tsx
// 例: /components/atoms/TextFieldAtom.tsx（MUIラッパー）
interface TextFieldAtomProps {
  props: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

const TextFieldAtom = ({ props }: TextFieldAtomProps) => (
  <TextField value={props.value} onChange={props.onChange} />
);

export { TextFieldAtom };

// 例: /components/atoms/CollapseButtonAtom.tsx（例外：開閉状態を内部に持つ）
interface CollapseButtonAtomProps {
  props: {
    label: string;
  };
}

const CollapseButtonAtom = ({ props }: CollapseButtonAtomProps) => {
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen((prev) => !prev);
  return (
    <>
      <Button onClick={handleToggle}>{props.label}</Button>
      <Collapse in={open}>...</Collapse>
    </>
  );
};

export { CollapseButtonAtom };

// 例: /components/atoms/CanvasAtom.tsx（例外：DOM操作をuseRef/useEffectで隠蔽）
interface CanvasAtomProps {
  props: {
    data: unknown;
  };
}

const CanvasAtom = ({ props }: CanvasAtomProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    // DOM操作はここで完結させ、外部に露出しない
  }, [props.data]);
  return <canvas ref={canvasRef} />;
};

export { CanvasAtom };
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
