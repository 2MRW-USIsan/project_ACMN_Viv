import type {
  JsonValidationStatus,
  OrderJsonRecord,
} from "@/types/viewer/orderJson";

type OrderInternalState = {
  text: string;
  dbRecord: OrderJsonRecord | null;
  validationStatus: JsonValidationStatus;
  validationError: string;
};

export const validateJson = (
  text: string,
): { status: JsonValidationStatus; error: string } => {
  if (text.trim() === "") return { status: "empty", error: "" };
  try {
    JSON.parse(text);
    return { status: "valid", error: "" };
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    return { status: "invalid", error: detail };
  }
};

export const applyTextToState = (
  state: OrderInternalState,
  text: string,
): OrderInternalState => {
  const { status, error } = validateJson(text);
  return { ...state, text, validationStatus: status, validationError: error };
};

export const loadFromDbToState = (
  state: OrderInternalState,
  record: OrderJsonRecord | null,
): OrderInternalState => {
  const text = record?.jsonData ?? "";
  const { status, error } = validateJson(text);
  return {
    text,
    dbRecord: record,
    validationStatus: status,
    validationError: error,
  };
};
