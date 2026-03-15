import { NextResponse } from "next/server";
import {
  getSampleItemById,
  updateSampleItem,
  deleteSampleItem,
} from "@/business/sampleItem";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: Request,
  { params }: RouteParams,
): Promise<NextResponse> {
  const { id } = await params;
  const item = getSampleItemById(id);
  if (!item) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }
  return NextResponse.json(item);
}

export async function PUT(
  request: Request,
  { params }: RouteParams,
): Promise<NextResponse> {
  const { id } = await params;
  const body = await request.json();
  const { title, description } = body as { title: string; description: string };
  if (!title.trim() || !description.trim()) {
    return NextResponse.json(
      { error: "title and description are required" },
      { status: 400 },
    );
  }
  const updated = updateSampleItem(id, { title, description });
  if (!updated) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: RouteParams,
): Promise<NextResponse> {
  const { id } = await params;
  const deleted = deleteSampleItem(id);
  if (!deleted) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
