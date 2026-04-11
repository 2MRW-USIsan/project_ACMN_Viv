"use client";

import { TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import { TextFieldAtomType } from "@/types/ui";

export interface TextFieldAtomProps {
  props: TextFieldAtomType;
}

export function TextFieldAtom({ props }: TextFieldAtomProps) {
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
      defaultValue={props.value}
      label={props.label}
      placeholder={props.placeholder}
      fullWidth
      size="small"
    />
  );
}
