# バックエンド実装ルール

`business/` ビジネスロジック層と `app/api/` ルートハンドラに関するルールを定義します。

---

## 概要

バックエンドは **Next.js API Routes**（App Router）で実装します。  
ビジネスロジックは `business/` に純粋な非同期関数として外部化し、API ルートはリクエスト/レスポンスの入出力制御のみを担います。

現在の実装はインメモリモックですが、将来的に **Prisma + SQLite3**（本番環境ではPostgreSQL等）へ移行することを前提とした設計を維持してください。

---

## business/ 層のルール

### 基本ルール

- `export async function` で宣言する（`export const` は使用しない）。
- すべての関数は `Promise<T>` を返す（同期的に解決できる場合も `async` にする）。
- 単一レコードの取得・更新・削除で存在しない場合は `null` を返す（`undefined` は使用しない）。
- ファイル名は `{domain}.ts`（camelCase）とする。

```ts
// ✅ Good — async function / Promise<T> / null
export async function getSampleItemById(id: string): Promise<SampleItem | null> {
  return store.find((item) => item.id === id) ?? null;
}

// ❌ Bad — 同期関数 / undefined
export const getSampleItemById = (id: string): SampleItem | undefined =>
  store.find((item) => item.id === id);
```

### Prisma 移行時の対応方針

`business/` 関数の**シグネチャ（引数・戻り値の型）は変えない**。  
実装内のモックロジックを Prisma クライアント呼び出しに置き換えるだけで移行が完了するよう設計する。

| 現在（モック）| Prisma 移行後 |
|---|---|
| `return [...store]` | `return prisma.sampleItem.findMany()` |
| `return store.find(...) ?? null` | `return prisma.sampleItem.findUnique({ where: { id } })` |
| `store = [...store, newItem]; return newItem` | `return prisma.sampleItem.create({ data: input })` |
| `store = store.map(...); return updated` | `return prisma.sampleItem.update({ where: { id }, data: input })` |
| `store = store.filter(...); return true` | `await prisma.sampleItem.delete({ where: { id } }); return true` |

> **注意**: Prisma の `update` / `delete` は存在しない `id` に対して例外をスローします。  
> 移行時は呼び出し元（API ルート）で `try/catch` を追加するか、`findUnique` で存在確認を行ってください。

### Prisma クライアントのシングルトン

Prisma 移行時は `src/lib/prisma.ts` にシングルトンを作成し、`business/` からインポートします。

```ts
// src/lib/prisma.ts（Prisma 移行時に追加）
import { PrismaClient } from "@prisma/client";

declare global {
  // TypeScript のグローバル型拡張には var が必要（let/const は使用不可）
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
```

---

## app/api/ 層のルール

### 基本ルール

- すべてのルートハンドラは `export async function` で宣言し、`Promise<NextResponse>` を返す。
- リクエストボディのバリデーションは **Zod スキーマ**を使用する。型アサーション（`as { ... }`）は使用しない。
- `ZodError` は `status: 400` でクライアントに返す。
- その他の例外は `throw err` で Next.js のエラーハンドラに委譲する。
- business/ 層の関数は必ず `await` して呼び出す。

```ts
// ✅ Good — Zod バリデーション / async / await
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body: unknown = await request.json();
    const input = sampleItemInputSchema.parse(body);
    const newItem = await createSampleItem(input);
    return NextResponse.json(newItem, { status: 201 });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ error: err.errors }, { status: 400 });
    }
    throw err;
  }
}

// ❌ Bad — 型アサーション / 同期 business 呼び出し / 手動バリデーション
export async function POST(request: Request): Promise<NextResponse> {
  const body = await request.json();
  const { title, description } = body as { title: string; description: string };
  if (!title.trim() || !description.trim()) {
    return NextResponse.json({ error: "..." }, { status: 400 });
  }
  const newItem = createSampleItem({ title, description }); // await 忘れ
  return NextResponse.json(newItem, { status: 201 });
}
```

### リクエストボディ用 Zod スキーマ

リクエストボディの Zod スキーマは `src/schemas/{domain}.ts` に定義し、`{domain}InputSchema` と命名する。

```ts
// src/schemas/sampleItem.ts
export const sampleItemInputSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
});
```

### HTTP ステータスコード規約

| 操作 | 成功 | 存在しない ID | バリデーションエラー |
|------|------|--------------|---------------------|
| GET（一覧） | 200 | — | — |
| GET（詳細） | 200 | 404 | — |
| POST（作成） | 201 | — | 400 |
| PUT（更新） | 200 | 404 | 400 |
| DELETE（削除） | 200 | 404 | — |

---

## ファイル・ディレクトリ配置

| 種別 | 配置先 |
|------|--------|
| ビジネスロジック関数 | `src/business/{domain}.ts` |
| API ルートハンドラ（一覧・作成） | `src/app/api/{domain}s/route.ts` |
| API ルートハンドラ（詳細・更新・削除） | `src/app/api/{domain}s/[id]/route.ts` |
| Prisma クライアント（移行時） | `src/lib/prisma.ts` |
| Zod スキーマ（リクエスト・レスポンス） | `src/schemas/{domain}.ts` |

---

関連ドキュメント: [`IMPLEMENT_BASIC_RULE.md`](./IMPLEMENT_BASIC_RULE.md)・[`IMPLEMENT_API_SERVICE_RULE.md`](./IMPLEMENT_API_SERVICE_RULE.md)・[`GUIDELINES.md`](../architecture/GUIDELINES.md)  
→ [README.md](../../README.md) に戻る
