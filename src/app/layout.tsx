import type { Metadata } from "next";
import ThemeRegistry from "@/components/template/ThemeRegistry";

export const metadata: Metadata = {
  title: "TODO App",
  description: "Minimal CRUD TODO application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
