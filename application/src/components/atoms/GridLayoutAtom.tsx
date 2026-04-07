"use client";

import { Box, Stack } from "@mui/material";

interface GridLayoutAtomProps {
  props?: {
    container?: boolean;
    maxWidth?: number;
    width?: number | string;
    flex?: number | string;
    minWidth?: number | string;
    mt?: number;
    px?: number;
    py?: number;
    display?: string;
    justifyContent?: string;
  };
  children?: React.ReactNode;
}

export function GridLayoutAtom({ props = {}, children }: GridLayoutAtomProps) {
  if (props.container) {
    return (
      <Stack spacing={2} p={3} maxWidth={props.maxWidth ?? 960} mx="auto">
        {children}
      </Stack>
    );
  }

  const { width, flex, maxWidth, minWidth, mt, px, py, display, justifyContent } = props;

  return (
    <Box
      sx={{
        ...(width !== undefined && { width }),
        ...(flex !== undefined && { flex }),
        ...(maxWidth !== undefined && { maxWidth }),
        ...(minWidth !== undefined && { minWidth }),
        ...(mt !== undefined && { mt }),
        ...(px !== undefined && { px }),
        ...(py !== undefined && { py }),
        ...(display !== undefined && { display }),
        ...(justifyContent !== undefined && { justifyContent }),
      }}
    >
      {children}
    </Box>
  );
}
