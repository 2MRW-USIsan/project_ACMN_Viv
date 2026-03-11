import { useCallback, useEffect, useRef, useState } from 'react';
import type { Order, OrderItem, YamlData } from '@/types/yaml';
import type { OrderSave } from '@/types/order';
import { useOrderReducer } from './useOrderReducer';

export type ViewerViewModel = {
  readonly requestJson: string;
  readonly yamlTitle: string;
  readonly orderJson: string;
  readonly savedOrderJson: string | null;
  readonly isJsonValid: boolean;
  readonly isSaving: boolean;
  readonly isDeleting: boolean;
  readonly hasDiff: boolean;
  readonly canRegister: boolean;
  readonly canNext: boolean;
  readonly onShuffle: () => void;
  readonly onCopyRequest: () => Promise<void>;
  readonly onPasteOrder: () => Promise<void>;
  readonly onClearOrder: () => void;
  readonly onResetOrder: () => void;
  readonly onRegisterOrder: () => Promise<void>;
  readonly onDeleteOrder: () => Promise<void>;
  readonly showConfirmDialog: boolean;
  readonly confirmDialogMessage: string;
  readonly onConfirmDialogOk: () => void;
  readonly onConfirmDialogCancel: () => void;
};

const weightedRandom = (items: readonly OrderItem[]): OrderItem => {
  if (items.length === 0) throw new Error('weightedRandom: items must not be empty');
  const totalWeight = items.reduce((sum, item) => sum + (item.weight ?? 1), 0);
  let random = Math.random() * totalWeight;
  for (const item of items) {
    random -= item.weight ?? 1;
    if (random <= 0) return item;
  }
  return items[items.length - 1];
};

const generateFromOrders = (orders: readonly Order[]): string => {
  const result = orders.reduce(
    (acc, order) => {
      const value =
        ({
          Random: () => weightedRandom(order.items).label,
          Complex: () => {
            const first = weightedRandom(order.items);
            const subitems = first.subitems ?? [];
            return subitems.length > 0
              ? `${first.label} ${weightedRandom(subitems).label}`
              : first.label;
          },
          // Scripts and Color both use the first item's label as-is (no random selection)
          Scripts: () => order.items[0]?.label ?? '',
          Color: () => order.items[0]?.label ?? '',
        }[order.type]?.() ?? '');
      return { ...acc, [order.property]: value };
    },
    {} as Record<string, string>,
  );
  return JSON.stringify(result, null, 2);
};

const tryParseJson = (text: string): boolean => {
  if (!text.trim()) return false;
  try {
    JSON.parse(text);
    return true;
  } catch {
    return false;
  }
};

type ConfirmAction = 'register' | 'delete' | null;

export const useViewerViewModel = (): ViewerViewModel => {
  const [state, dispatch] = useOrderReducer();
  const ordersRef = useRef<readonly Order[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);

  const hasDiff = state.orderJson !== (state.savedOrderJson ?? '');
  const canRegister = state.isJsonValid;
  const canNext =
    !hasDiff && state.isJsonValid && state.savedOrderJson !== null;

  const confirmDialogMessage = {
    register: 'Existing data found. Overwrite with current content?',
    delete: 'Are you sure you want to delete the saved data?',
    null: '',
  }[confirmAction ?? 'null'];

  const shuffle = useCallback(() => {
    const orders = ordersRef.current;
    if (orders.length === 0) return;
    dispatch({ type: 'SET_REQUEST_JSON', payload: generateFromOrders(orders) });
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      const [yamlRes, orderRes] = await Promise.all([
        fetch('/api/yaml'),
        fetch('/api/orderSaves'),
      ]);

      if (yamlRes.ok) {
        const yaml = (await yamlRes.json()) as YamlData;
        ordersRef.current = yaml.Orders;
        dispatch({ type: 'SET_YAML_TITLE', payload: yaml.title });
        dispatch({
          type: 'SET_REQUEST_JSON',
          payload: generateFromOrders(yaml.Orders),
        });
      }

      if (orderRes.ok) {
        const save = (await orderRes.json()) as OrderSave;
        dispatch({ type: 'SET_SAVED_ORDER_JSON', payload: save.data });
        dispatch({ type: 'SET_ORDER_JSON', payload: save.data });
        dispatch({ type: 'SET_JSON_VALID', payload: tryParseJson(save.data) });
      }
    };

    fetchData().catch(console.error);
  }, [dispatch]);

  const onShuffle = useCallback(() => shuffle(), [shuffle]);

  const onCopyRequest = useCallback(async () => {
    await navigator.clipboard.writeText(state.requestJson);
  }, [state.requestJson]);

  const onPasteOrder = useCallback(async () => {
    const text = await navigator.clipboard.readText();
    dispatch({ type: 'SET_ORDER_JSON', payload: text });
    dispatch({ type: 'SET_JSON_VALID', payload: tryParseJson(text) });
  }, [dispatch]);

  const onClearOrder = useCallback(() => {
    dispatch({ type: 'SET_ORDER_JSON', payload: '' });
    dispatch({ type: 'SET_JSON_VALID', payload: false });
  }, [dispatch]);

  const onResetOrder = useCallback(() => {
    const value = state.savedOrderJson ?? '';
    dispatch({ type: 'SET_ORDER_JSON', payload: value });
    dispatch({ type: 'SET_JSON_VALID', payload: tryParseJson(value) });
  }, [dispatch, state.savedOrderJson]);

  const executeRegister = useCallback(async () => {
    dispatch({ type: 'SET_SAVING', payload: true });
    try {
      const res = await fetch('/api/orderSaves', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: state.orderJson }),
      });
      if (res.ok) {
        dispatch({ type: 'SET_SAVED_ORDER_JSON', payload: state.orderJson });
      }
    } finally {
      dispatch({ type: 'SET_SAVING', payload: false });
    }
  }, [dispatch, state.orderJson]);

  const onRegisterOrder = useCallback(async () => {
    if (state.savedOrderJson !== null && hasDiff) {
      setConfirmAction('register');
      setShowConfirmDialog(true);
    } else {
      await executeRegister();
    }
  }, [state.savedOrderJson, hasDiff, executeRegister]);

  const executeDelete = useCallback(async () => {
    dispatch({ type: 'SET_DELETING', payload: true });
    try {
      await fetch('/api/orderSaves/default', { method: 'DELETE' });
      dispatch({ type: 'SET_SAVED_ORDER_JSON', payload: null });
    } finally {
      dispatch({ type: 'SET_DELETING', payload: false });
    }
  }, [dispatch]);

  const onDeleteOrder = useCallback(async () => {
    setConfirmAction('delete');
    setShowConfirmDialog(true);
  }, []);

  const onConfirmDialogOk = useCallback(() => {
    setShowConfirmDialog(false);
    const action = confirmAction;
    setConfirmAction(null);
    if (action === 'register') executeRegister().catch(console.error);
    if (action === 'delete') executeDelete().catch(console.error);
  }, [confirmAction, executeRegister, executeDelete]);

  const onConfirmDialogCancel = useCallback(() => {
    setShowConfirmDialog(false);
    setConfirmAction(null);
  }, []);

  return {
    requestJson: state.requestJson,
    yamlTitle: state.yamlTitle,
    orderJson: state.orderJson,
    savedOrderJson: state.savedOrderJson,
    isJsonValid: state.isJsonValid,
    isSaving: state.isSaving,
    isDeleting: state.isDeleting,
    hasDiff,
    canRegister,
    canNext,
    onShuffle,
    onCopyRequest,
    onPasteOrder,
    onClearOrder,
    onResetOrder,
    onRegisterOrder,
    onDeleteOrder,
    showConfirmDialog,
    confirmDialogMessage,
    onConfirmDialogOk,
    onConfirmDialogCancel,
  };
};
