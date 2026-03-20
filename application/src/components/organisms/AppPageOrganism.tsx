"use client";

import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

const DRAWER_WIDTH = 240;

interface AppPageOrganismProps {
  props: {
    todoDrawerOpen: boolean;
    todoDrawerOnToggle: () => void;
    todoRouteList: { label: string; href: string }[];
  };
  children?: React.ReactNode;
}

export function AppPageOrganism({ props, children }: AppPageOrganismProps) {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={props.todoDrawerOnToggle}
            aria-label="Toggle navigation menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        open={props.todoDrawerOpen}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: DRAWER_WIDTH, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <List>
          {props.todoRouteList.map((route) => (
            <ListItem key={route.href} disablePadding>
              <ListItemButton component={Link} href={route.href}>
                <ListItemText primary={route.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
