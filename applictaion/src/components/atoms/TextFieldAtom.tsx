"use client";

import { useRef, useEffect } from "react";
import { TextField } from "@mui/material";

interface TextFieldAtomProps {
  props: {
    defaultValue: string;
    onBlur: (value: string) => void;
    placeholder?: string;
    size?: "small" | "medium";
    fullWidth?: boolean;
  };
}

export function TextFieldAtom({ props }: TextFieldAtomProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = props.defaultValue;
  }, [props.defaultValue]);

  const handleBlur = () => {
    if (inputRef.current) props.onBlur(inputRef.current.value);
  };

  return (
    <TextField
      inputRef={inputRef}
      defaultValue={props.defaultValue}
      onBlur={handleBlur}
      placeholder={props.placeholder}
      size={props.size ?? "small"}
      fullWidth={props.fullWidth}
    />
  );
}
