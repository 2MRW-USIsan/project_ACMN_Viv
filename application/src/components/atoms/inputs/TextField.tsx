"use client";

import { TextFieldType } from "@/types/components/ui";
import { TextField as MuiTextField } from "@mui/material";
import { useEffect, useRef } from "react";

export interface TextFieldProps {
  props: TextFieldType;
}

export function TextField({ props }: TextFieldProps) {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const currentValue = props.value ?? "";

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = currentValue;
  }, [currentValue]);

  const handleBlur = () => {
    if (!inputRef.current) return;

    const latestValue = inputRef.current.value;
    props.onChange?.(latestValue);
  };

  return (
    <MuiTextField
      inputRef={inputRef}
      onBlur={handleBlur}
      defaultValue={currentValue}
      size={"small"}
      fullWidth={true}
      multiline={false}
    />
  );
}
