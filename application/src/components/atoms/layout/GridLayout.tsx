import Grid from "@mui/material/Grid";

export interface GridLayoutProps {
  style: number | "CONTAINER";
  children: React.ReactNode;
}

export function GridLayout({ style, children }: GridLayoutProps) {
  return (
    <Grid
      display={"flex"}
      container={style === "CONTAINER"}
      size={style === "CONTAINER" ? undefined : style}
    >
      {children}
    </Grid>
  );
}
