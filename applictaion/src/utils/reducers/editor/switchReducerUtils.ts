import type { SwitchDataItem, SwitchPanelChip, SwitchPanelItem } from "@/types/editor/panel";

type State = Record<number, SwitchPanelChip>;

const getChip = (state: State, panelId: number): SwitchPanelChip =>
  state[panelId] ?? { selected: false, data: [] };

const createSwitchPanelItem = (): SwitchPanelItem => ({
  id: Date.now(),
  state: false,
  randomize: false,
  values: { key: "", label: "--" },
  data: [],
});

const createSwitchDataItem = (): SwitchDataItem => ({
  key: "",
  label: "",
  value: "",
  altValue: "",
});

export const removeSwitchPanel = (state: State, panelId: number): State =>
  Object.fromEntries(
    Object.entries(state).filter(([k]) => Number(k) !== panelId),
  ) as State;

export const changeSwitchChip = (state: State, panelId: number): State => {
  const chip = getChip(state, panelId);
  const selected = !chip.selected;
  return {
    ...state,
    [panelId]: { ...chip, selected, data: selected ? chip.data : [] },
  };
};

export const addSwitchItem = (state: State, panelId: number): State => {
  const chip = getChip(state, panelId);
  return {
    ...state,
    [panelId]: { ...chip, data: [...chip.data, createSwitchPanelItem()] },
  };
};

export const addSwitchChildItem = (
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
          ? { ...item, data: [...item.data, createSwitchDataItem()] }
          : item,
      ),
    },
  };
};

export const deleteSwitchChildItem = (
  state: State,
  panelId: number,
  parentItemId: number,
  childIndex: number,
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
              data: item.data.filter((_, index) => index !== childIndex),
            }
          : item,
      ),
    },
  };
};

export const changeSwitchItem = (
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

export const changeSwitchItemForm = (
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
        if (childMatch) {
          const childIndex = Number(childMatch[1]);
          const childLabel = childMatch[2] as keyof SwitchDataItem;
          return {
            ...item,
            data: item.data.map((child, index) =>
              index === childIndex
                ? { ...child, [childLabel]: value }
                : child,
            ),
          };
        }

        return { ...item, values: { ...item.values, [label]: value } };
      }),
    },
  };
};

export const deleteSwitchItem = (
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

export const toggleSwitchRandomize = (
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
        item.id === itemId ? { ...item, randomize: !item.randomize } : item,
      ),
    },
  };
};
