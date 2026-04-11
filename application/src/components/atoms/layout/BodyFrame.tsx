import { Stack, Toolbar } from "@mui/material";

interface BodyFrameProps {
  children: React.ReactNode;
}
export function BodyFrame({ children }: BodyFrameProps) {
  return (
    <Stack spacing={2} p={3} maxWidth={960} mx="auto">
      <Toolbar />
      {children}
    </Stack>
  );
}
