"use client";

import { Box, Stack } from "@mui/material";

interface GridLayoutAtomProps {
  props: {
    container?: boolean;
    maxWidth?: number;
    width?: number | string;
    flex?: number | string;
    minWidth?: number | string;
  };
  children?: React.ReactNode;
}

export function GridLayoutAtom({ props, children }: GridLayoutAtomProps) {
  if (props.container) {
    return (
      <Stack spacing={2} p={3} maxWidth={props.maxWidth ?? 960} mx="auto">
        {children}
      </Stack>
    );
  }

  return (
    <Box
      sx={{
        ...(props.width !== undefined && { width: props.width }),
        ...(props.flex !== undefined && { flex: props.flex }),
        ...(props.maxWidth !== undefined && { maxWidth: props.maxWidth }),
        ...(props.minWidth !== undefined && { minWidth: props.minWidth }),
      }}
    >
      {children}
    </Box>
  );
}
