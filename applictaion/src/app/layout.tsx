import { NavigationBar } from "@/components/NavigationBar";
import { ThemeRegistry } from "@/components/providers/ThemeRegistry";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`acmn-application`}>
        <ThemeRegistry>
          <NavigationBar />
          {children}
        </ThemeRegistry>
        {children}
      </body>
    </html>
  );
}
