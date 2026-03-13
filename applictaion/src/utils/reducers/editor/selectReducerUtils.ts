import type {
  SelectDataItem,
  SelectListDataItem,
  SelectPanelChip,
  SelectPanelItem,
} from "@/types/editor/panel";

type State = Record<number, SelectPanelChip>;

const getChip = (state: State, panelId: number): SelectPanelChip =>
  state[panelId] ?? { selected: false, data: [] };

const createSelectPanelItem = (): SelectPanelItem => ({
  id: Date.now(),
  state: false,
  shuffle: false,
  values: { key: "", label: "--" },
  data: [],
});

const createSelectDataItem = (): SelectDataItem => ({
  id: Date.now(),
  values: { key: "", label: "" },
  data: [],
});

const createSelectListDataItem = (): SelectListDataItem => ({
  id: Date.now(),
  values: { prompt: "", value: "" },
});

export const removeSelectPanel = (state: State, panelId: number): State =>
  Object.fromEntries(
    Object.entries(state).filter(([k]) => Number(k) !== panelId),
  ) as State;

export const changeSelectChip = (state: State, panelId: number): State => {
  const chip = getChip(state, panelId);
  const selected = !chip.selected;
  return {
    ...state,
    [panelId]: { ...chip, selected, data: selected ? chip.data : [] },
  };
};

export const addSelectItem = (state: State, panelId: number): State => {
  const chip = getChip(state, panelId);
  return {
    ...state,
    [panelId]: { ...chip, data: [...chip.data, createSelectPanelItem()] },
  };
};

export const addSelectChildItem = (
  state: State,
  panelId: number,
  parentItemId: number,
): State => {
  const chip = getChip(state, panelId);
  return {
    ...state,
    [panelId]: {
      ...chip,
      data: chip.data.map((item) =>
        item.id === parentItemId
          ? { ...item, data: [...item.data, createSelectDataItem()] }
          : item,
      ),
    },
  };
};

export const addSelectListItem = (
  state: State,
  panelId: number,
  selectItemId: number,
  childItemId: number,
): State => {
  const chip = getChip(state, panelId);
  return {
    ...state,
    [panelId]: {
      ...chip,
      data: chip.data.map((item) =>
        item.id === selectItemId
          ? {
              ...item,
              data: item.data.map((child) =>
                child.id === childItemId
                  ? {
                      ...child,
                      data: [...child.data, createSelectListDataItem()],
                    }
                  : child,
              ),
            }
          : item,
      ),
    },
  };
};

export const deleteSelectListItem = (
  state: State,
  panelId: number,
  selectItemId: number,
  childItemId: number,
  listItemId: number,
): State => {
  const chip = getChip(state, panelId);
  return {
    ...state,
    [panelId]: {
      ...chip,
      data: chip.data.map((item) =>
        item.id === selectItemId
          ? {
              ...item,
              data: item.data.map((child) =>
                child.id === childItemId
                  ? {
                      ...child,
                      data: child.data.filter(
                        (listItem) => listItem.id !== listItemId,
                      ),
                    }
                  : child,
              ),
            }
          : item,
      ),
    },
  };
};

export const deleteSelectChildItem = (
  state: State,
  panelId: number,
  parentItemId: number,
  childItemId: number,
): State => {
  const chip = getChip(state, panelId);
  return {
    ...state,
    [panelId]: {
      ...chip,
      data: chip.data.map((item) =>
        item.id === parentItemId
          ? {
              ...item,
              data: item.data.filter((child) => child.id !== childItemId),
            }
          : item,
      ),
    },
  };
};

export const changeSelectItem = (
  state: State,
  panelId: number,
  itemId: number,
): State => {
  const chip = getChip(state, panelId);
  return {
    ...state,
    [panelId]: {
      ...chip,
      data: chip.data.map((item) =>
        item.id === itemId ? { ...item, state: !item.state } : item,
      ),
    },
  };
};

export const changeSelectItemForm = (
  state: State,
  panelId: number,
  itemId: number,
  label: string,
  value: string,
): State => {
  const chip = getChip(state, panelId);
  return {
    ...state,
    [panelId]: {
      ...chip,
      data: chip.data.map((item) => {
        if (item.id !== itemId) return item;

        const childMatch = label.match(/^child:(\d+):(.*)$/);
        if (!childMatch) {
          return { ...item, values: { ...item.values, [label]: value } };
        }

        const childId = Number(childMatch[1]);
        const rest = childMatch[2];

        const listItemMatch = rest.match(/^listItem:(\d+):(.*)$/);
        if (!listItemMatch) {
          return {
            ...item,
            data: item.data.map((child) =>
              child.id === childId
                ? { ...child, values: { ...child.values, [rest]: value } }
                : child,
            ),
          };
        }

        const listItemId = Number(listItemMatch[1]);
        const fieldLabel = listItemMatch[2];
        return {
          ...item,
          data: item.data.map((child) =>
            child.id === childId
              ? {
                  ...child,
                  data: child.data.map((listItem) =>
                    listItem.id === listItemId
                      ? {
                          ...listItem,
                          values: {
                            ...listItem.values,
                            [fieldLabel]: value,
                          },
                        }
                      : listItem,
                  ),
                }
              : child,
          ),
        };
      }),
    },
  };
};

export const deleteSelectItem = (
  state: State,
  panelId: number,
  itemId: number,
): State => {
  const chip = getChip(state, panelId);
  return {
    ...state,
    [panelId]: {
      ...chip,
      data: chip.data.filter((item) => item.id !== itemId),
    },
  };
};

export const toggleSelectShuffle = (
  state: State,
  panelId: number,
  itemId: number,
): State => {
  const chip = getChip(state, panelId);
  return {
    ...state,
    [panelId]: {
      ...chip,
      data: chip.data.map((item) =>
        item.id === itemId ? { ...item, shuffle: !item.shuffle } : item,
      ),
    },
  };
};
