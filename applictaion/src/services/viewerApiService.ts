import type { OrderJsonRecord } from "@/types/viewer/orderJson";

export async function fetchOrderJson(): Promise<OrderJsonRecord | null> {
  const res = await fetch("/api/orderJson");
  if (!res.ok) return null;
  return (await res.json()) as OrderJsonRecord | null;
}

export async function registerOrderJson(
  jsonData: string,
): Promise<OrderJsonRecord> {
  const res = await fetch("/api/orderJson", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonData }),
  });
  if (!res.ok) throw new Error(`Failed to register: ${res.status}`);
  return (await res.json()) as OrderJsonRecord;
}

export async function deleteOrderJson(id: string): Promise<void> {
  const res = await fetch(`/api/orderJson/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Failed to delete: ${res.status}`);
}
