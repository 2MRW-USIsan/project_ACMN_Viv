import { Toolbar } from "@mui/material";
import { AlignLayout } from "./AlignLayout";

interface BodyFrameProps {
  children: React.ReactNode;
}
export function BodyFrame({ children }: BodyFrameProps) {
  return (
    <AlignLayout column={0.1}>
      <Toolbar />
      {children}
      <Toolbar />
      <Toolbar />
    </AlignLayout>
  );
}
