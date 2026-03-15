# ViewModel Hook 実装ルール

viewModel提供用のフックを実装するにあたっては、下記の構造を守って実装してほしい。

```ts
interface {Page}ViewModelReturns {
  viewModel: {Page}ViewModel;
}
export function use{Page}ViewModel():{Page}ViewModelReturns {
  // Context(DI Container)の呼び出し（Service + StateReducer を統合）
  const { contexts } = use{Page}Context();
  // Controllerの呼び出し（初期化制御、副作用管理）
  use{Page}Controller(contexts);
  // Composerの呼び出し（ViewModel(Props+UIハンドラ)の生成）
  const { viewModel } = use{Page}Composer(contexts);

  return { viewModel };
}
```

`use{Page}Context` は `state/` レイヤーに配置し、`use{Page}Service` と `use{Page}StateReducer` を統合して `{ contexts }` を返す:

```ts
export function use{Page}Context(): {Page}ContextReturns {
  const { fetchItem, request } = use{Page}Service();
  const { state, action } = use{Page}StateReducer();

  const contexts: {Page}Contexts = {
    service: { fetchItem, request },
    reducer: { state, action },
  };

  return { contexts };
}
```

---

関連ドキュメント: [`IMPLEMENT_SERVICE.md`](./IMPLEMENT_SERVICE.md)・[`IMPLEMENT_CONTROLLER_RULE.md`](./IMPLEMENT_CONTROLLER_RULE.md)・[`IMPLEMENT_COMPOSER_RULE.md`](./IMPLEMENT_COMPOSER_RULE.md)・[`IMPLEMENT_REDUCER_RULE.md`](./IMPLEMENT_REDUCER_RULE.md)・[`GUIDELINES.md`](../architecture/GUIDELINES.md)・[`ARCHITECTURE.md`](../architecture/ARCHITECTURE.md)  
→ [README.md](../../README.md) に戻る
