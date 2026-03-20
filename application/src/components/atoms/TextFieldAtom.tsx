"use client";

import { Box, TextField } from "@mui/material";
import { useRef, useEffect } from "react";

interface TextFieldAtomProps {
  props: {
    label: string;
    defaultValue: string;
    onBlur: (value: string) => void;
    multiline?: boolean;
    rows?: number;
  };
}

export function TextFieldAtom({ props }: TextFieldAtomProps) {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = props.defaultValue;
  }, [props.defaultValue]);

  const handleBlur = () => {
    if (inputRef.current) props.onBlur(inputRef.current.value);
  };

  return (
    <Box sx={{ flex: 1, minWidth: 0, width: "100%" }}>
      <TextField
        inputRef={inputRef}
        label={props.label}
        defaultValue={props.defaultValue}
        onBlur={handleBlur}
        multiline={props.multiline}
        rows={props.rows}
        fullWidth
      />
    </Box>
  );
}
