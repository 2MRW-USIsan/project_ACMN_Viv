import { NextResponse } from "next/server";
import { getAllSampleItems, createSampleItem } from "@/business/sampleItem";

export function GET(): NextResponse {
  const items = getAllSampleItems();
  return NextResponse.json(items);
}

export async function POST(request: Request): Promise<NextResponse> {
  const body = await request.json();
  const { title, description } = body as { title: string; description: string };
  if (!title.trim() || !description.trim()) {
    return NextResponse.json(
      { error: "title and description are required" },
      { status: 400 },
    );
  }
  const newItem = createSampleItem({ title, description });
  return NextResponse.json(newItem, { status: 201 });
}
