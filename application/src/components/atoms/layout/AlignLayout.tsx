import { Box } from "@mui/material";

interface AlignLayoutProps {
  style?: AlignType;
  column?: number;
  indent?: boolean;
  children: React.ReactNode;
}
type AlignType = "START" | "CENTER" | "END";
type MuiAlignType = "start" | "center" | "end";

export function AlignLayout({
  children,
  column,
  indent,
  style = "START",
}: AlignLayoutProps) {
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
      paddingBlock={"0.1rem"}
      paddingInline={"0.25rem"}
      paddingLeft={indent ? "1.00rem" : "0.25rem"}
      gap={column ? `${column}rem` : "0.1rem"}
      flexDirection={column ? "column" : "row"}
    >
      {children}
    </Box>
  );
}
