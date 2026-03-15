"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { acmnTheme } from "@/theme/theme";
import { EmotionRegistry } from "./EmotionRegistry";

interface ThemeRegistryProps {
  children: React.ReactNode;
}

export function ThemeRegistry({ children }: ThemeRegistryProps) {
  return (
    <EmotionRegistry>
      <ThemeProvider theme={acmnTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </EmotionRegistry>
  );
}
