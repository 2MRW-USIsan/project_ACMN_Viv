import { SampleItem, SampleItemInput } from "@/types/sampleItem";

export const fetchSampleItems = async (): Promise<SampleItem[]> => {
  const res = await fetch("/api/sampleItems");
  if (!res.ok) throw new Error("Failed to fetch sample items");
  return res.json() as Promise<SampleItem[]>;
};

export const postSampleItem = async (
  input: SampleItemInput,
): Promise<SampleItem> => {
  const res = await fetch("/api/sampleItems", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Failed to create sample item");
  return res.json() as Promise<SampleItem>;
};

export const putSampleItem = async (
  id: string,
  input: SampleItemInput,
): Promise<SampleItem> => {
  const res = await fetch(`/api/sampleItems/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Failed to update sample item");
  return res.json() as Promise<SampleItem>;
};

export const deleteSampleItemRequest = async (id: string): Promise<void> => {
  const res = await fetch(`/api/sampleItems/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete sample item");
};
