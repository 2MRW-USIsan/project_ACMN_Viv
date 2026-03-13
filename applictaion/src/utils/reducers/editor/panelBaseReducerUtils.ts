import type { PanelBaseItem } from "@/types/editor/panel";

type State = { panels: PanelBaseItem[] };

type ChangeFormPayload = { id: number; label: string; value: string };

export const addPanelItem = (state: State): State => ({
  ...state,
  panels: [
    ...state.panels,
    {
      id: Date.now(),
      label: `Panel ${state.panels.length + 1}`,
      values: { key: `key-${Date.now()}`, label: `label-${Date.now()}` },
      state: false,
    },
  ],
});

export const changePanelItem = (
  state: State,
  payload: { id: number },
): State => ({
  ...state,
  panels: state.panels.map((p) =>
    p.id === payload.id ? { ...p, state: !p.state } : p,
  ),
});

export const deletePanelItem = (
  state: State,
  payload: { id: number },
): State => ({
  ...state,
  panels: state.panels.filter((p) => p.id !== payload.id),
});

export const changeFormItem = (
  state: State,
  payload: ChangeFormPayload,
): State => ({
  ...state,
  panels: state.panels.map((p) =>
    p.id === payload.id
      ? {
          ...p,
          values: {
            ...p.values,
            [payload.label]: payload.value,
          },
        }
      : p,
  ),
});
