import { Box } from "@mui/material";

interface AlignLayoutProps {
  style?: AlignType;
  column?: number;
  children: React.ReactNode;
}
type AlignType = "START" | "CENTER" | "END";
export function AlignLayout({
  children,
  column,
  style = "START",
}: AlignLayoutProps) {
  type MuiAlignType = "start" | "center" | "end";

  const aligns: Record<AlignType, MuiAlignType> = {
    START: "start",
    CENTER: "center",
    END: "end",
  };

  return (
    <Box
      width={"100%"}
      display={"flex"}
      justifyContent={aligns[style]}
      paddingInline={"0.25rem"}
      gap={column ? `${column}rem` : 0}
      flexDirection={column ? "column" : "row"}
    >
      {children}
    </Box>
  );
}
