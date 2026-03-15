import { SampleItem, SampleItemInput } from "@/types/sampleItem";

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

export const getAllSampleItems = (): SampleItem[] => [...store];

export const getSampleItemById = (id: string): SampleItem | undefined =>
  store.find((item) => item.id === id);

export const createSampleItem = (input: SampleItemInput): SampleItem => {
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
};

export const updateSampleItem = (
  id: string,
  input: SampleItemInput,
): SampleItem | undefined => {
  const index = store.findIndex((item) => item.id === id);
  if (index === -1) return undefined;
  const updated: SampleItem = {
    ...store[index],
    title: input.title,
    description: input.description,
    updatedAt: new Date().toISOString(),
  };
  store = store.map((item) => (item.id === id ? updated : item));
  return updated;
};

export const deleteSampleItem = (id: string): boolean => {
  const exists = store.some((item) => item.id === id);
  if (!exists) return false;
  store = store.filter((item) => item.id !== id);
  return true;
};
