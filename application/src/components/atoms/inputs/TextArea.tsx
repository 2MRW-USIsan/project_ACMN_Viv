"use client";

import { TextAreaType } from "@/types/components/ui";
import { TextField } from "@mui/material";
import { useEffect, useRef } from "react";

export interface TextAreaProps {
  props: TextAreaType;
  style?: number;
}

export function TextArea({ props, style = 2 }: TextAreaProps) {
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
    <TextField
      inputRef={inputRef}
      onBlur={handleBlur}
      defaultValue={currentValue}
      size="small"
      fullWidth={true}
      multiline={true}
      rows={style}
    />
  );
}
