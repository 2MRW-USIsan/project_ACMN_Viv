import type { PanelDataStateType } from "./panel";

export type PanelSaveItem = {
  id: string;
  name: string;
  createdAt: string;
};

export type PanelSaveDetail = PanelSaveItem & {
  data: PanelDataStateType;
};
