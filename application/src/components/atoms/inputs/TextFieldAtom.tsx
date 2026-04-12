"use client";

import { TextFieldAtomType } from "@/types/ui";
import { TextField } from "@mui/material";
import { useEffect, useRef } from "react";

export interface TextFieldAtomProps {
  props: TextFieldAtomType;
}

export function TextFieldAtom({ props }: TextFieldAtomProps) {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const currentValue = props.value ?? props.defaultValue ?? "";

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = currentValue;
  }, [currentValue]);

  const handleBlur = () => {
    if (!inputRef.current) return;

    const latestValue = inputRef.current.value;
    props.onChange?.(latestValue);
    props.onBlur?.(latestValue);
  };

  return (
    <TextField
      inputRef={inputRef}
      onBlur={handleBlur}
      defaultValue={currentValue}
      label={props.label}
      placeholder={props.placeholder}
      fullWidth={props.fullWidth ?? true}
      size={props.size ?? "small"}
      multiline={props.multiline ?? false}
      rows={props.rows}
    />
  );
}
