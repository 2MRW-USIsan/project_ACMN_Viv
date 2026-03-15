# Service フック実装ルール

このドキュメントは、`state/` 層の `use{Page}Service` フックと、それが呼び出す `services/` の API 関数を実装する際の規約を定義します。

---

## ファイル配置

| 種別 | 配置先 |
|------|--------|
| Service フック | `src/hooks/{page}/state/use{Page}Service.ts` |
| API 呼び出し関数 | `src/services/{domain}Service.ts` |
| Zod スキーマ | `src/schemas/{domain}.ts` |
| TypeScript 型定義 | `src/types/{domain}.ts` |

---

## 1. Service フック（`use{Page}Service`）

### 責務

- `use{Page}FetchReducer` を呼び出してフェッチ状態を管理する。
- `services/` の API 関数を呼び出す。
- マウント時に初期データを取得する（`useEffect` with `[]`）。
- `fetchItem`（取得データ状態）と `request`（更新操作）を返す。

### 基本構造

```ts
import { fetch~~~~, post~~~~ } from "@/services/{Page}";

export interface {Page}FetchItem {
  itemList: {Domain}Item[] | null;
}

export interface {Page}Request {
  createItem: (...) => Promise<void>;
  // ...
}

export interface {Page}ServiceReturns {
  fetchItem: {Page}FetchItem;
  request: {Page}Request;
}

export function use{Page}Service(): {Page}ServiceReturns {
  // FetchReducer の呼び出し（状態管理定義、状態情報、制御ハンドラ）
  const { state: fetchState, action: fetchAction } = use{Page}FetchReducer();

  useEffect(() => {
    // マウント時（初回のみ）データを取得する
    fetch~~~~().then((items) => {
      fetchAction.setItemList(items);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleXxxxxx = async (...) => {
    await post~~~~(...);
    const items = await fetch~~~~();
    fetchAction.setItemList(items);
  };

  return {
    fetchItem: { itemList: fetchState.itemList },
    request: {
      xxxx: handleXxxxxx,
      // ...
    },
  };
}
```

### ルール詳細

- `useEffect` の依存配列が空（`[]`）の場合は、マウント時のみ実行されることを示すコメントを残す。
- API 呼び出し後はリストを再取得して `fetchAction` で状態を更新する。
- `{Page}FetchItem` 型・`{Page}Request` 型はこのファイルで定義・export する。

---

## 2. API Service 関数（`services/{domain}Service.ts`）

### 責務

- `use{Page}Service` フックから呼び出される純粋な非同期関数を配置する。
- フック・副作用・状態管理は一切持たず、**HTTP リクエストの送受信とレスポンスのバリデーション**のみを担う。

### 基本ルール

- `export async function` で宣言する（`export const` は使用しない）。
- ファイル名は `{domain}Service.ts`（camelCase）とする。
- レスポンスのバリデーションには **Zod スキーマ**を使用する。型アサーション（`as SomeType`）は使用しない。
- HTTP エラーは `!res.ok` でチェックし、説明的なメッセージとともに `Error` をスローする。

```ts
// ✅ Good
export async function fetchSampleItems(): Promise<SampleItem[]> {
  const res = await fetch("/api/sampleItems");
  if (!res.ok) throw new Error("Failed to fetch sample items");
  return sampleItemArraySchema.parse(await res.json());
}

export async function postSampleItem(input: SampleItemInput): Promise<SampleItem> {
  const res = await fetch("/api/sampleItems", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Failed to create sample item");
  return sampleItemSchema.parse(await res.json());
}

// ❌ Bad — 型アサーションによる unsafe なキャスト
export const fetchSampleItems = async (): Promise<SampleItem[]> => {
  const res = await fetch("/api/sampleItems");
  return res.json() as Promise<SampleItem[]>;
};
```

---

## 3. Zod スキーマ（`schemas/{domain}.ts`）

- スキーマは `src/schemas/{domain}.ts` に配置する。
- スキーマは `{Domain}Schema` または `{Domain}ArraySchema` として命名し、`export` する。
- TypeScript 型定義（`types/`）と Zod スキーマ（`schemas/`）は分離して管理する。

```ts
// src/schemas/sampleItem.ts
import { z } from "zod";

export const sampleItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const sampleItemArraySchema = z.array(sampleItemSchema);
```

---

## 4. バリデーション失敗時の挙動

`schema.parse(data)` はバリデーション失敗時に `ZodError` をスローします。  
呼び出し元の `use{Page}Service` フックでキャッチし、エラー状態として FetchReducer に伝えてください。

```ts
// use{Page}Service 内での呼び出し例
useEffect(() => {
  fetchSampleItems()
    .then((items) => fetchAction.setItemList(items))
    .catch((err) => console.error(err));
}, []);
```

---

## 参考：既存の実装例

- [`application/src/hooks/sample/state/useSampleService.ts`](../../../../application/src/hooks/sample/state/useSampleService.ts)
- [`application/src/services/sampleItemService.ts`](../../../../application/src/services/sampleItemService.ts)
- [`application/src/schemas/sampleItem.ts`](../../../../application/src/schemas/sampleItem.ts)

関連ドキュメント: [`CONTEXT_RULE.md`](./CONTEXT_RULE.md)・[`FETCH_REDUCER_RULE.md`](./FETCH_REDUCER_RULE.md)・[`../CONTROLLER_RULE.md`](../CONTROLLER_RULE.md)・[`../../BACKEND_RULE.md`](../../BACKEND_RULE.md)・[`GUIDELINES.md`](../../../architecture/GUIDELINES.md)  
→ [README.md](../../../../README.md) に戻る
