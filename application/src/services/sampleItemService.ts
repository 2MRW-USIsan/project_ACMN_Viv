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

export async function putSampleItem(
  id: string,
  input: SampleItemInput,
): Promise<SampleItem> {
  const res = await fetch(`/api/sampleItems/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Failed to update sample item");
  return sampleItemSchema.parse(await res.json());
}

export async function deleteSampleItemRequest(id: string): Promise<void> {
  const res = await fetch(`/api/sampleItems/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete sample item");
}
