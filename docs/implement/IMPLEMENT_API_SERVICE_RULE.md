# API Service 実装ルール

`/services` 以下のクライアントサイド API 呼び出し関数に関するルールを定義します。

---

## 概要

`services/` ディレクトリには、`use{Page}Service` フックから呼び出す純粋な非同期関数を配置します。  
フック・副作用・状態管理は一切持たず、**HTTP リクエストの送受信とレスポンスのバリデーション**のみを担います。

---

## 基本ルール

- `export function` で宣言する（`export const` は使用しない）。
- ファイル名は `{domain}Service.ts`（camelCase）とする。
- `async` 関数として実装する。
- レスポンスのバリデーションには **Zod スキーマ**を使用する。型アサーション（`as SomeType`）は使用しない。
- HTTP エラーは `!res.ok` でチェックし、説明的なメッセージとともに `Error` をスローする。

```ts
// ✅ Good
export async function fetchSampleItems(): Promise<SampleItem[]> {
  const res = await fetch("/api/sampleItems");
  if (!res.ok) throw new Error("Failed to fetch sample items");
  return sampleItemArraySchema.parse(await res.json());
}

// ❌ Bad — 型アサーションによる unsafe なキャスト
export const fetchSampleItems = async (): Promise<SampleItem[]> => {
  const res = await fetch("/api/sampleItems");
  if (!res.ok) throw new Error("Failed to fetch sample items");
  return res.json() as Promise<SampleItem[]>;
};
```

---

## Zod スキーマ

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

```ts
// src/services/sampleItemService.ts
import { SampleItem, SampleItemInput } from "@/types/sampleItem";
import { sampleItemSchema, sampleItemArraySchema } from "@/schemas/sampleItem";

export async function fetchSampleItems(): Promise<SampleItem[]> {
  const res = await fetch("/api/sampleItems");
  if (!res.ok) throw new Error("Failed to fetch sample items");
  return sampleItemArraySchema.parse(await res.json());
}

export async function postSampleItem(
  input: SampleItemInput,
): Promise<SampleItem> {
  const res = await fetch("/api/sampleItems", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Failed to create sample item");
  return sampleItemSchema.parse(await res.json());
}
```

---

## バリデーション失敗時の挙動

`schema.parse(data)` はバリデーション失敗時に `ZodError` をスローします。  
呼び出し元の `use{Page}Service` フックでキャッチし、エラー状態として Reducer に伝えてください。

```ts
// use{Page}Service 内での呼び出し例
useEffect(() => {
  fetchSampleItems()
    .then((items) => dispatch({ type: "SET_ITEMS", payload: items }))
    .catch((err) => dispatch({ type: "SET_ERROR", payload: String(err) }));
}, []);
```

---

## ファイル・ディレクトリ配置

| 種別 | 配置先 |
|------|--------|
| API 呼び出し関数 | `src/services/{domain}Service.ts` |
| Zod スキーマ | `src/schemas/{domain}.ts` |
| TypeScript 型定義 | `src/types/{domain}.ts` |

---

関連ドキュメント: [`IMPLEMENT_BASIC_RULE.md`](./IMPLEMENT_BASIC_RULE.md)・[`IMPLEMENT_SERVICE.md`](./IMPLEMENT_SERVICE.md)・[`GUIDELINES.md`](../architecture/GUIDELINES.md)  
→ [README.md](../../README.md) に戻る
