import { Alert } from "@mui/material";

interface AlertPanelProps {
  props: {
    severity: "error" | "warning" | "info" | "success";
    /** py: 0 のコンパクト表示にする場合は true */
    compact?: boolean;
  };
  children: React.ReactNode;
}

export function AlertPanel({ props, children }: AlertPanelProps) {
  const { severity, compact } = props;
  return (
    <Alert severity={severity} sx={compact ? { py: 0 } : undefined}>
      {children}
    </Alert>
  );
}
