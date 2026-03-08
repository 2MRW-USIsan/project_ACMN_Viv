import EmotionRegistry from "@/components/EmotionRegistry";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`acmn-application`}>
        <EmotionRegistry>{children}</EmotionRegistry>
      </body>
    </html>
  );
}
