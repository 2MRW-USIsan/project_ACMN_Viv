import Grid from "@mui/material/Grid";

export interface GridLayoutProps {
  style: { size: number | "CONTAINER" };
  children: React.ReactNode;
}

export function GridLayout({ style, children }: GridLayoutProps) {
  return (
    <Grid
      container={style.size === "CONTAINER"}
      size={style.size === "CONTAINER" ? 1 : style.size}
    >
      {children}
    </Grid>
  );
}
