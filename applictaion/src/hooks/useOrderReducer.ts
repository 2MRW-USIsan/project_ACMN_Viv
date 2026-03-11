import { useReducer } from 'react';

type OrderState = {
  readonly requestJson: string;
  readonly orderJson: string;
  readonly savedOrderJson: string | null;
  readonly isJsonValid: boolean;
  readonly isSaving: boolean;
  readonly isDeleting: boolean;
  readonly yamlTitle: string;
};

type Action =
  | { readonly type: 'SET_REQUEST_JSON'; readonly payload: string }
  | { readonly type: 'SET_ORDER_JSON'; readonly payload: string }
  | { readonly type: 'SET_SAVED_ORDER_JSON'; readonly payload: string | null }
  | { readonly type: 'SET_JSON_VALID'; readonly payload: boolean }
  | { readonly type: 'SET_SAVING'; readonly payload: boolean }
  | { readonly type: 'SET_DELETING'; readonly payload: boolean }
  | { readonly type: 'SET_YAML_TITLE'; readonly payload: string };

const initialState: OrderState = {
  requestJson: '',
  orderJson: '',
  savedOrderJson: null,
  isJsonValid: false,
  isSaving: false,
  isDeleting: false,
  yamlTitle: '',
};

const handlers: {
  [K in Action['type']]: (
    state: OrderState,
    action: Extract<Action, { type: K }>,
  ) => OrderState;
} = {
  SET_REQUEST_JSON: (s, a) => ({ ...s, requestJson: a.payload }),
  SET_ORDER_JSON: (s, a) => ({ ...s, orderJson: a.payload }),
  SET_SAVED_ORDER_JSON: (s, a) => ({ ...s, savedOrderJson: a.payload }),
  SET_JSON_VALID: (s, a) => ({ ...s, isJsonValid: a.payload }),
  SET_SAVING: (s, a) => ({ ...s, isSaving: a.payload }),
  SET_DELETING: (s, a) => ({ ...s, isDeleting: a.payload }),
  SET_YAML_TITLE: (s, a) => ({ ...s, yamlTitle: a.payload }),
};

const reducer = (state: OrderState, action: Action): OrderState =>
  (handlers[action.type] as (s: OrderState, a: Action) => OrderState)?.(
    state,
    action,
  ) ?? state;

export const useOrderReducer = (): [OrderState, React.Dispatch<Action>] =>
  useReducer(reducer, initialState);
