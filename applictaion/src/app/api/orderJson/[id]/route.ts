import { deleteOrderJson } from "@/business/orderJson";
import { NextResponse } from "next/server";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const success = await deleteOrderJson(id);
  if (!success) {
    return NextResponse.json({ error: "Record not found" }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
}
