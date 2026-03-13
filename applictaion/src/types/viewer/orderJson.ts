// [オーダー用JSON情報] snapshot persisted to DB

export type OrderJsonRecord = {
  id: string;
  jsonData: string;
  createdAt: string;
  updatedAt: string;
};

// Validation status of the order JSON text field
export type JsonValidationStatus = "empty" | "valid" | "invalid";
