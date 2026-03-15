"use client";

import { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { acmnTheme } from "@/theme/theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [{ cache, flush }] = useState(() => {
    const emotionCache = createCache({ key: "mui" });
    emotionCache.compat = true;
    const prevInsert = emotionCache.insert.bind(emotionCache);
    let inserted: string[] = [];
    emotionCache.insert = (...args) => {
      const serialized = args[1];
      if (emotionCache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flushInserted = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache: emotionCache, flush: flushInserted };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <MuiThemeProvider theme={acmnTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  );
}
