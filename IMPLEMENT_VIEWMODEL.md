# ViewModel Hook 実装ルール

viewModel提供用のフックを実装するにあたっては、下記の構造を守って実装してほしい。

```ts
interface {Page}ViewModelReturns {
  viewModels: {Page}ViewModel;
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
  const { viewModels } = use{Page}Composer(contexts);

  return { viewModels };
}
```
