import { SampleItem, SampleItemInput } from "@/types/sampleItem";

// TODO: Prisma 移行時は `let store` と `let nextId` を削除し、
//       各関数内の実装を対応する Prisma クライアント呼び出しに置き換える。
//       例: `return prisma.sampleItem.findMany()`
//       関数シグネチャ（引数・戻り値の型）は変更不要。

let store: SampleItem[] = [
  {
    id: "1",
    title: "サンプルアイテム 1",
    description: "これは最初のサンプルです。",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "サンプルアイテム 2",
    description: "これは2番目のサンプルです。",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

let nextId = 3;

export async function getAllSampleItems(): Promise<SampleItem[]> {
  // Prisma: return prisma.sampleItem.findMany();
  return [...store];
}

export async function getSampleItemById(
  id: string,
): Promise<SampleItem | null> {
  // Prisma: return prisma.sampleItem.findUnique({ where: { id } });
  return store.find((item) => item.id === id) ?? null;
}

export async function createSampleItem(
  input: SampleItemInput,
): Promise<SampleItem> {
  // Prisma: return prisma.sampleItem.create({ data: input });
  const now = new Date().toISOString();
  const newItem: SampleItem = {
    id: String(nextId++),
    title: input.title,
    description: input.description,
    createdAt: now,
    updatedAt: now,
  };
  store = [...store, newItem];
  return newItem;
}

export async function updateSampleItem(
  id: string,
  input: SampleItemInput,
): Promise<SampleItem | null> {
  // Prisma: return prisma.sampleItem.update({ where: { id }, data: { title: input.title, description: input.description } });
  //         ※ 存在しない id の場合 Prisma は例外をスローするため、呼び出し元でハンドリングすること。
  const index = store.findIndex((item) => item.id === id);
  if (index === -1) return null;
  const updated: SampleItem = {
    ...store[index],
    title: input.title,
    description: input.description,
    updatedAt: new Date().toISOString(),
  };
  store = store.map((item) => (item.id === id ? updated : item));
  return updated;
}

export async function deleteSampleItem(id: string): Promise<boolean> {
  // Prisma: await prisma.sampleItem.delete({ where: { id } }); return true;
  //         ※ 存在しない id の場合 Prisma は例外をスローするため、呼び出し元でハンドリングすること。
  const exists = store.some((item) => item.id === id);
  if (!exists) return false;
  store = store.filter((item) => item.id !== id);
  return true;
}
