import type { PanelDataStateType } from "@/types/editor/panel";
import type { PanelSaveDetail, PanelSaveItem } from "@/types/editor/panelSave";

// In-memory mock store. Replaced with Prisma/SQLite integration in the future.
const mockSaves: PanelSaveDetail[] = [
  {
    id: "save-mock-1",
    name: "サンプル設定 1",
    createdAt: "2026-01-01T00:00:00.000Z",
    data: {
      panels: [
        {
          id: 1000001,
          label: "Panel 1",
          state: false,
          values: { key: "panel-1", label: "Panel 1" },
          orders: { selected: false, data: [] },
          select: { selected: false, data: [] },
          switch: { selected: false, data: [] },
        },
      ],
    },
  },
  {
    id: "save-mock-2",
    name: "サンプル設定 2",
    createdAt: "2026-01-15T00:00:00.000Z",
    data: {
      panels: [
        {
          id: 1000002,
          label: "Panel A",
          state: false,
          values: { key: "panel-a", label: "Panel A" },
          orders: { selected: false, data: [] },
          select: { selected: false, data: [] },
          switch: { selected: false, data: [] },
        },
        {
          id: 1000003,
          label: "Panel B",
          state: false,
          values: { key: "panel-b", label: "Panel B" },
          orders: { selected: false, data: [] },
          select: { selected: false, data: [] },
          switch: { selected: false, data: [] },
        },
      ],
    },
  },
];

export async function fetchPanelSaves(): Promise<PanelSaveItem[]> {
  return mockSaves.map(({ id, name, createdAt }) => ({ id, name, createdAt }));
}

export async function fetchPanelSaveDetail(
  id: string,
): Promise<PanelSaveDetail | null> {
  return mockSaves.find((s) => s.id === id) ?? null;
}

export async function createPanelSave(
  name: string,
  data: PanelDataStateType,
): Promise<PanelSaveItem> {
  const newSave: PanelSaveDetail = {
    id: `save-${Date.now()}`,
    name,
    createdAt: new Date().toISOString(),
    data,
  };
  mockSaves.push(newSave);
  return { id: newSave.id, name: newSave.name, createdAt: newSave.createdAt };
}
