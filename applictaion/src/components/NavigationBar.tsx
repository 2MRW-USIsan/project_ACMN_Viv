"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "YAMLエディタ", href: "/editor" },
  { label: "オーダービュー", href: "/viewer" },
];

export const NavigationBar = () => {
  const pathname = usePathname();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ mr: 3 }}>
          ACMN
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          {NAV_ITEMS.map(({ label, href }) => (
            <Button
              key={href}
              component={Link}
              href={href}
              color="inherit"
              variant={pathname === href ? "outlined" : "text"}
            >
              {label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
