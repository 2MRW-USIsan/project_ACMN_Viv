import ThemeRegistry from "@/components/ThemeRegistry";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme/theme";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`acmn-application`}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
