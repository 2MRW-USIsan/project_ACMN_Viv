import Grid from "@mui/material/Grid";

export interface GridLayoutProps {
  style: { size: number | "CONTAINER" };
  children: React.ReactNode;
}

export function GridLayout({ style, children }: GridLayoutProps) {
  return (
    <Grid
    bgcolor={"#ff000022"}
      display={"flex"}
      container={style.size === "CONTAINER"}
      size={style.size === "CONTAINER" ? undefined : style.size}
    >
      {children}
    </Grid>
  );
}
