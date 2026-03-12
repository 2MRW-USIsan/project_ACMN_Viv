import type { OrderJsonRecord } from "@/types/viewer/orderJson";

// In-memory mock store. Replaced with Prisma/SQLite integration in the future.
// TBD: Future support for multiple records (list selection)
let mockRecord: OrderJsonRecord | null = null;

export async function fetchOrderJson(): Promise<OrderJsonRecord | null> {
  return mockRecord;
}

export async function createOrderJson(jsonData: string): Promise<OrderJsonRecord> {
  const now = new Date().toISOString();
  mockRecord = {
    id: `order-json-${Date.now()}`,
    jsonData,
    createdAt: now,
    updatedAt: now,
  };
  return mockRecord;
}

export async function updateOrderJson(
  id: string,
  jsonData: string,
): Promise<OrderJsonRecord | null> {
  if (!mockRecord || mockRecord.id !== id) return null;
  mockRecord = { ...mockRecord, jsonData, updatedAt: new Date().toISOString() };
  return mockRecord;
}

export async function deleteOrderJson(id: string): Promise<boolean> {
  if (!mockRecord || mockRecord.id !== id) return false;
  mockRecord = null;
  return true;
}
