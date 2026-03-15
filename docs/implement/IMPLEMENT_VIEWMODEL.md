# ViewModel Hook 実装ルール

viewModel提供用のフックを実装するにあたっては、下記の構造を守って実装してほしい。

```ts
interface {Page}ViewModelReturns {
  viewModel: {Page}ViewModel;
}
export function use{Page}ViewModel():{Page}ViewModelReturns {
  // Serviceの呼び出し（API, repository, I/O 管理）
  const { fetchItem, request } = use{Page}Service();
  // StateReducerの呼び出し（状態管理定義、状態情報、制御ハンドラ）
  const { state, action } = use{Page}Reducer();
  // context(DI Container)定義
  const contexts = { service: { fetchItem, request }, reducer: { state, action } };
  // Controllerの呼び出し（初期化制御、副作用管理）  
  use{Page}Controller(contexts);
  // Composerの呼び出し（ViewModel(Props+UIハンドラ)の生成）  
  const { viewModel } = use{Page}Composer(contexts);

  return { viewModel };
}
```

---

## ディレクトリ配置ルール

`use{Page}Service` と `use{Page}Reducer` の配置先はファイル数に応じて選択する。

| 状況 | 配置先 |
|------|--------|
| Service・Reducer がそれぞれ **1 ファイル** で完結する場合 | `hooks/{page}/state/` に統合（`useSampleService.ts` + `useSampleReducer.ts`） |
| Service または Reducer に **複数ファイル** が必要な場合 | `hooks/{page}/service/` と `hooks/{page}/reducer/` に分割 |

```
# state/ 統合パターン（ファイル数が少ない場合）
hooks/sample/
├── state/
│   ├── useSampleService.ts   # Service + Reducer を同じ state/ に配置
│   └── useSampleReducer.ts
├── controller/
└── viewModel/

# service/ + reducer/ 分割パターン（ファイル数が多い場合）
hooks/editor/
├── service/
│   └── useEditorService.ts
├── reducer/
│   ├── useEditorReducer.ts
│   ├── usePanelReducer.ts
│   └── ...
├── controller/
└── viewModel/
```

---

関連ドキュメント: [`IMPLEMENT_SERVICE.md`](./IMPLEMENT_SERVICE.md)・[`IMPLEMENT_CONTROLLER_RULE.md`](./IMPLEMENT_CONTROLLER_RULE.md)・[`IMPLEMENT_COMPOSER_RULE.md`](./IMPLEMENT_COMPOSER_RULE.md)・[`IMPLEMENT_REDUCER_RULE.md`](./IMPLEMENT_REDUCER_RULE.md)・[`GUIDELINES.md`](../architecture/GUIDELINES.md)・[`ARCHITECTURE.md`](../architecture/ARCHITECTURE.md)  
→ [README.md](../../README.md) に戻る
