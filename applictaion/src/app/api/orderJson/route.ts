import { createOrderJson, fetchOrderJson, updateOrderJson } from "@/business/orderJson";
import type { OrderJsonRecord } from "@/types/viewer/orderJson";
import { NextResponse } from "next/server";

export async function GET() {
  const record = await fetchOrderJson();
  return NextResponse.json(record);
}

export async function POST(request: Request) {
  const body = (await request.json()) as { jsonData: string };
  const existing = await fetchOrderJson();
  let result: OrderJsonRecord;
  if (existing) {
    const updated = await updateOrderJson(existing.id, body.jsonData);
    if (!updated) {
      return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
    result = updated;
  } else {
    result = await createOrderJson(body.jsonData);
  }
  return NextResponse.json(result, { status: existing ? 200 : 201 });
}
