import type { OrdersPanelChip, OrdersPanelItem } from "@/types/editor/panel";

type State = Record<number, OrdersPanelChip>;

const getChip = (state: State, panelId: number): OrdersPanelChip =>
  state[panelId] ?? { selected: false, data: [] };

const createOrdersPanelItem = (): OrdersPanelItem => ({
  id: Date.now(),
  state: false,
  values: { key: "", label: "--" },
  data: [],
});

export const removeOrdersPanel = (state: State, panelId: number): State =>
  Object.fromEntries(
    Object.entries(state).filter(([k]) => Number(k) !== panelId),
  ) as State;

export const changeOrdersChip = (state: State, panelId: number): State => {
  const chip = getChip(state, panelId);
  const selected = !chip.selected;
  return {
    ...state,
    [panelId]: { ...chip, selected, data: selected ? chip.data : [] },
  };
};

export const addOrdersItem = (state: State, panelId: number): State => {
  const chip = getChip(state, panelId);
  return {
    ...state,
    [panelId]: { ...chip, data: [...chip.data, createOrdersPanelItem()] },
  };
};

export const addOrdersChildItem = (
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
          ? {
              ...item,
              data: [
                ...item.data,
                {
                  id: Date.now(),
                  values: { key: "", label: "", type: "Random" },
                  data: [],
                },
              ],
            }
          : item,
      ),
    },
  };
};

export const addOrdersItemData = (
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
              data: item.data.map((child) =>
                child.id === childItemId
                  ? {
                      ...child,
                      data: [
                        ...child.data,
                        {
                          id: Date.now(),
                          values: { value: "", prompt: "", weight: "0" },
                          complexData: [],
                        },
                      ],
                    }
                  : child,
              ),
            }
          : item,
      ),
    },
  };
};

export const addOrdersComplexItemData = (
  state: State,
  panelId: number,
  parentItemId: number,
  childItemId: number,
  itemDataId: number,
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
              data: item.data.map((child) =>
                child.id === childItemId
                  ? {
                      ...child,
                      data: child.data.map((itemData) =>
                        itemData.id === itemDataId
                          ? {
                              ...itemData,
                              complexData: [
                                ...(itemData.complexData ?? []),
                                {
                                  id: Date.now(),
                                  values: { value: "", prompt: "", weight: "0" },
                                },
                              ],
                            }
                          : itemData,
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

export const deleteOrdersItemData = (
  state: State,
  panelId: number,
  parentItemId: number,
  childItemId: number,
  itemDataId: number,
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
              data: item.data.map((child) =>
                child.id === childItemId
                  ? {
                      ...child,
                      data: child.data.filter(
                        (itemData) => itemData.id !== itemDataId,
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

export const deleteOrdersComplexItemData = (
  state: State,
  panelId: number,
  parentItemId: number,
  childItemId: number,
  itemDataId: number,
  complexItemId: number,
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
              data: item.data.map((child) =>
                child.id === childItemId
                  ? {
                      ...child,
                      data: child.data.map((itemData) =>
                        itemData.id === itemDataId
                          ? {
                              ...itemData,
                              complexData: (
                                itemData.complexData ?? []
                              ).filter(
                                (complexItem) =>
                                  complexItem.id !== complexItemId,
                              ),
                            }
                          : itemData,
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

export const deleteOrdersChildItem = (
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

export const changeOrdersItem = (
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

export const changeOrdersItemForm = (
  state: State,
  panelId: number,
  itemId: number,
  label: string,
  value: string,
): State => {
  const chip = getChip(state, panelId);
  const childMatch = label.match(/^child:(\d+):(.+)$/);
  if (childMatch) {
    const childId = Number(childMatch[1]);
    const childLabel = childMatch[2];
    const itemMatch = childLabel.match(/^item:(\d+):(.+)$/);
    if (itemMatch) {
      const itemDataId = Number(itemMatch[1]);
      const itemLabel = itemMatch[2];
      const nestedComplexMatch = itemLabel.match(/^complexItem:(\d+):(.+)$/);
      if (nestedComplexMatch) {
        const complexItemId = Number(nestedComplexMatch[1]);
        const complexItemField = nestedComplexMatch[2];
        return {
          ...state,
          [panelId]: {
            ...chip,
            data: chip.data.map((item) =>
              item.id === itemId
                ? {
                    ...item,
                    data: item.data.map((child) =>
                      child.id === childId
                        ? {
                            ...child,
                            data: child.data.map((itemData) =>
                              itemData.id === itemDataId
                                ? {
                                    ...itemData,
                                    complexData: (
                                      itemData.complexData ?? []
                                    ).map((complexItem) =>
                                      complexItem.id === complexItemId
                                        ? {
                                            ...complexItem,
                                            values: {
                                              ...complexItem.values,
                                              [complexItemField]: value,
                                            },
                                          }
                                        : complexItem,
                                    ),
                                  }
                                : itemData,
                            ),
                          }
                        : child,
                    ),
                  }
                : item,
            ),
          },
        };
      }
      return {
        ...state,
        [panelId]: {
          ...chip,
          data: chip.data.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  data: item.data.map((child) =>
                    child.id === childId
                      ? {
                          ...child,
                          data: child.data.map((itemData) =>
                            itemData.id === itemDataId
                              ? {
                                  ...itemData,
                                  values: {
                                    ...itemData.values,
                                    [itemLabel]: value,
                                  },
                                }
                              : itemData,
                          ),
                        }
                      : child,
                  ),
                }
              : item,
          ),
        },
      };
    }
    return {
      ...state,
      [panelId]: {
        ...chip,
        data: chip.data.map((item) =>
          item.id === itemId
            ? {
                ...item,
                data: item.data.map((child) =>
                  child.id === childId
                    ? {
                        ...child,
                        values: { ...child.values, [childLabel]: value },
                        ...(childLabel === "type" && { data: [] }),
                      }
                    : child,
                ),
              }
            : item,
        ),
      },
    };
  }
  return {
    ...state,
    [panelId]: {
      ...chip,
      data: chip.data.map((item) =>
        item.id === itemId
          ? { ...item, values: { ...item.values, [label]: value } }
          : item,
      ),
    },
  };
};

export const deleteOrdersItem = (
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
