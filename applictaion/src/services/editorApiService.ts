import type { PanelDataStateType } from "@/types/editor/panel";
import type { PanelSaveDetail, PanelSaveItem } from "@/types/editor/panelSave";

export async function fetchSaveList(): Promise<PanelSaveItem[]> {
  const res = await fetch("/api/panelSaves");
  if (!res.ok) throw new Error(`Failed to fetch save list: ${res.status}`);
  return (await res.json()) as PanelSaveItem[];
}

export async function fetchSaveDetail(id: string): Promise<PanelSaveDetail> {
  const res = await fetch(`/api/panelSaves/${id}`);
  if (!res.ok) throw new Error(`Failed to load save: ${res.status}`);
  return (await res.json()) as PanelSaveDetail;
}

export async function registerSave(
  name: string,
  data: PanelDataStateType,
): Promise<void> {
  const res = await fetch("/api/panelSaves", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, data }),
  });
  if (!res.ok) throw new Error(`Failed to register save: ${res.status}`);
}
