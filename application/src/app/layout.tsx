import { ThemeRegistry } from "@/components/providers/ThemeRegistry";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="acmn-application">
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
