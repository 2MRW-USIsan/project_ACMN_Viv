"use client";

import { Stack } from "@mui/material";

interface StackAtomProps {
  props?: {
    direction?: "row" | "column";
    spacing?: number;
    alignItems?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline";
    justifyContent?:
      | "flex-start"
      | "flex-end"
      | "center"
      | "space-between"
      | "space-around"
      | "space-evenly";
    flexWrap?: "wrap" | "nowrap";
    flex?: number;
    gap?: number;
    pl?: number;
    pt?: number;
    pb?: number;
    py?: number;
    mb?: number;
    mt?: number;
  };
  children?: React.ReactNode;
}

export function StackAtom({ props = {}, children }: StackAtomProps) {
  const {
    direction,
    spacing,
    alignItems,
    justifyContent,
    flexWrap,
    flex,
    gap,
    pl,
    pt,
    pb,
    py,
    mb,
    mt,
  } = props;

  return (
    <Stack
      direction={direction}
      spacing={spacing}
      alignItems={alignItems}
      justifyContent={justifyContent}
      flexWrap={flexWrap}
      flex={flex}
      gap={gap}
      pl={pl}
      pt={pt}
      pb={pb}
      py={py}
      mb={mb}
      mt={mt}
    >
      {children}
    </Stack>
  );
}
