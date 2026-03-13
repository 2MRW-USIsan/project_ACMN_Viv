# Service実装ルール

## Service提供用フック (`use{Page}Service`)

Service提供用のフックを実装するにあたっては、下記の構造を守って実装してほしい。

```ts
import { fetch~~~~, post~~~~ } from "@/services/{Page}"

interface {Page}ServiceReturns {
  fetchItem: {Page}FetchItemState;
  request: {Page}Request;
}

export function use{Page}Service(): {Page}ServiceReturns {
  // FetchReducerの呼び出し（状態管理定義、状態情報、制御ハンドラ）
  // Reducer実装ルールに従う
  const { state: fetchItem, action: requestHandler } = use{Page}FetchReducer();

  useEffect(() => {
    // マウント(画面入場処理) ※依存配列が空のため初回マウント時のみ実行される
    // 依存値が必要な場合は依存配列に追加すること
  }, [])

  const handleXxxxxx = (...) => {
    ...
    post~~~~(...).then((result) => {
      // 非同期処理の結果とfetchReducerの状態を同期させる
      requestHandler.~~~~(...)
    })
  }
  ...

  return {
    fetchItem,
    request: {
      xxxx: handleXxxxxx,
      ...
    }
  };
}
```
