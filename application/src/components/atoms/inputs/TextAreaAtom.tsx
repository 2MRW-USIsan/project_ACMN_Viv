"use client";

import { TextAreaAtomType } from "@/types/ui";
import { TextField } from "@mui/material";
import { useEffect, useRef } from "react";

export interface TextAreaAtomProps {
  props: TextAreaAtomType;
  style?: { rows: number };
}

export function TextAreaAtom({ props, style }: TextAreaAtomProps) {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const currentValue = props.value ?? props.defaultValue ?? "";
  const styles = style ?? { rows: props.rows ?? 2 };

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
      size="small"
      multiline={props.multiline ?? true}
      rows={styles.rows}
    />
  );
}
