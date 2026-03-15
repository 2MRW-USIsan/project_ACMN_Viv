import { ThemeProvider } from "@/components/providers/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="acmn-application">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
