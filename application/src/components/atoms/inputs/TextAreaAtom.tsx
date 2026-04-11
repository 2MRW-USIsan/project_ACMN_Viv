"use client";

import { TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import { TextAreaAtomType } from "@/types/ui";

export interface TextAreaAtomProps {
  props: TextAreaAtomType;
}

export function TextAreaAtom({ props }: TextAreaAtomProps) {
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
      label={props.label}
      placeholder={props.placeholder}
      fullWidth
      size="small"
      multiline
      rows={props.rows}
    />
  );
}
