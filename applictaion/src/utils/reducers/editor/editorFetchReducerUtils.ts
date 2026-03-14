import type { PanelSaveDetail, PanelSaveItem } from "@/types/editor/panelSave";

type State = {
  saveList: PanelSaveItem[] | null;
  saveDetail: PanelSaveDetail | null;
  saveListVersion: number;
  saveDetailRequest: { id: string; ver: number } | null;
};

type REQUEST_SAVE_DETAIL = { id: string };

export const incrementSaveListVersion = (state: State): State => ({
  ...state,
  saveListVersion: state.saveListVersion + 1,
});

export const requestSaveDetail = (
  state: State,
  payload: REQUEST_SAVE_DETAIL,
): State => ({
  ...state,
  saveDetail: null,
  saveDetailRequest: {
    id: payload.id,
    ver: (state.saveDetailRequest?.ver ?? 0) + 1,
  },
});
