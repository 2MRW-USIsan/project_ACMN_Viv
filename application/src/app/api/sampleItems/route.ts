import { NextResponse } from "next/server";
import { getAllSampleItems, createSampleItem } from "@/business/sampleItem";
import { sampleItemInputSchema } from "@/schemas/sampleItem";
import { ZodError } from "zod";

export async function GET(): Promise<NextResponse> {
  const items = await getAllSampleItems();
  return NextResponse.json(items);
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body: unknown = await request.json();
    const input = sampleItemInputSchema.parse(body);
    const newItem = await createSampleItem(input);
    return NextResponse.json(newItem, { status: 201 });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ error: err.errors }, { status: 400 });
    }
    throw err;
  }
}
