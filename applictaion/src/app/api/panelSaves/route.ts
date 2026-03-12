import {
  createPanelSave,
  fetchPanelSaves,
} from "@/business/panelSave";
import type { PanelDataStateType } from "@/types/editor/panel";
import { NextResponse } from "next/server";

export async function GET() {
  const saves = await fetchPanelSaves();
  return NextResponse.json(saves);
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    name: string;
    data: PanelDataStateType;
  };
  const result = await createPanelSave(body.name, body.data);
  return NextResponse.json(result, { status: 201 });
}
