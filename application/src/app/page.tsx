"use client";

import Link from "next/link";

export default function Home() {
  const screens = [
    { href: "/configurations", label: "Configurations" },
    { href: "/posting-clerk", label: "Posting Clerk" },
    { href: "/preset-builder", label: "Preset Builder" },
    { href: "/prompt-forger", label: "Prompt Forger" },
    { href: "/sample", label: "Sample" },
  ];

  return (
    <main style={{ padding: "24px" }}>
      <h1 style={{ marginBottom: "12px" }}>Available Screens</h1>
      <ul style={{ display: "grid", gap: "8px", paddingLeft: "20px" }}>
        {screens.map((screen) => (
          <li key={screen.href}>
            <Link href={screen.href}>{screen.label}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
