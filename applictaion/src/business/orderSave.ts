import type { OrderSave } from '@/types/order';

const DEFAULT_ID = 'default';

const store = new Map<string, OrderSave>();

export const getOrderSave = (): OrderSave | null => store.get(DEFAULT_ID) ?? null;

export const createOrUpdateOrderSave = (data: string): OrderSave => {
  const now = new Date().toISOString();
  const existing = store.get(DEFAULT_ID);
  const save: OrderSave = {
    id: DEFAULT_ID,
    data,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
  store.set(DEFAULT_ID, save);
  return save;
};

export const deleteOrderSave = (): void => {
  store.delete(DEFAULT_ID);
};
