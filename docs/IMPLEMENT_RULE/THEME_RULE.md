# テーマ実装ルール

このドキュメントは MUI テーマの実装規約を定義します。

---

## 基本方針

アプリ全体のデザインは **`MUI の createTheme`** で一元管理します。  
テーマ設定は `theme/theme.ts` に集約し、`ThemeProvider` プロバイダー経由でアプリ全体に適用します。

---

## ファイル構成

```
src/
├── theme/
│   └── theme.ts                      # createTheme によるテーマ定義
└── components/
    └── providers/
        └── ThemeProvider.tsx          # Emotion SSR + MUI ThemeProvider を一体化したプロバイダー
```

---

## テーマ定義（`theme/theme.ts`）

`createTheme` を使用してテーマオブジェクトを生成し、名前付きエクスポートします。

```ts
import { createTheme } from "@mui/material/styles";

export const acmnTheme = createTheme({
  palette: { ... },
  typography: { ... },
  spacing: 6,
  components: { ... },
});
```

### 命名規則

- テーマオブジェクトは **`acmnTheme`** という名前で named export する。
- デフォルトエクスポートは使用しない。

### カスタマイズ対象

| 設定項目 | 内容 |
|---|---|
| `palette.primary` | ブルー系（`#1976d2`） |
| `palette.secondary` | ティール系（`#00897b`） |
| `typography` | コンパクトな文字サイズ（0.72〜0.85 rem） |
| `spacing` | 基本単位 6px |
| `components.MuiTextField` | デフォルト `size="small"` / `variant="outlined"` |
| `components.MuiChip` | 高さ 22px 固定 |

---

## プロバイダー構成

### ThemeProvider

Emotion キャッシュの SSR 対応（`useServerInsertedHTML`）と MUI の `ThemeProvider`・`CssBaseline` を一つのファイルにまとめたプロバイダーです。  
`app/layout.tsx` からのみ呼び出します。

```tsx
"use client";

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Emotion キャッシュの生成と useServerInsertedHTML による注入
  ...
  return (
    <CacheProvider value={cache}>
      <MuiThemeProvider theme={acmnTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  );
}
```

---

## layout.tsx での適用

`app/layout.tsx` は Server Component として実装し、`<body>` 直下で `ThemeProvider` を適用します。

```tsx
// app/layout.tsx  ← "use client" は付けない（Server Component）
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export default function RootLayout({ children }: ...) {
  return (
    <html lang="en">
      <body className="acmn-application">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

---

## テーマ値の参照方法

コンポーネント内でテーマ値を参照する場合は、MUI の `useTheme` フックまたは `sx` prop を使用します。

```tsx
// ✅ Good — sx prop でテーマ値を参照
<Box sx={{ color: "primary.main", p: 1 }} />

// ✅ Good — useTheme でテーマオブジェクトを取得
const theme = useTheme();
const primaryColor = theme.palette.primary.main;

// ❌ Bad — テーマ値をハードコード
<Box sx={{ color: "#1976d2" }} />
```

---

## 禁止事項

- `acmnTheme` を直接インポートしてコンポーネント内で参照してはならない（`useTheme` / `sx` を使用する）。
- テーマ設定を `theme/theme.ts` 以外のファイルに分散させてはならない。
- `createTheme` の呼び出しを複数箇所で行ってはならない。

---

→ [README.md](../../README.md) に戻る
