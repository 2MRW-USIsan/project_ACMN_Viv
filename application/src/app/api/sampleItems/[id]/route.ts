import { NextResponse } from "next/server";
import {
  getSampleItemById,
  updateSampleItem,
  deleteSampleItem,
} from "@/business/sampleItem";
import { sampleItemInputSchema } from "@/schemas/sampleItem";
import { ZodError } from "zod";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: Request,
  { params }: RouteParams,
): Promise<NextResponse> {
  const { id } = await params;
  const item = await getSampleItemById(id);
  if (!item) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }
  return NextResponse.json(item);
}

export async function PUT(
  request: Request,
  { params }: RouteParams,
): Promise<NextResponse> {
  try {
    const { id } = await params;
    const body: unknown = await request.json();
    const input = sampleItemInputSchema.parse(body);
    const updated = await updateSampleItem(id, input);
    if (!updated) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ error: err.errors }, { status: 400 });
    }
    throw err;
  }
}

export async function DELETE(
  _request: Request,
  { params }: RouteParams,
): Promise<NextResponse> {
  const { id } = await params;
  const deleted = await deleteSampleItem(id);
  if (!deleted) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
