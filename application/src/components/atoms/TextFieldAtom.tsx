"use client";

import { TextField } from "@mui/material";
import { useEffect, useRef } from "react";

export interface TextFieldAtomProps {
  props: {
    label?: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    size?: "small" | "medium";
  };
}

export function TextFieldAtom({ props }: TextFieldAtomProps) {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = props.value;
  }, [props.value]);

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
