import { Collapse } from "@mui/material";

interface CollapseContainerProps {
  props: boolean;
  children: React.ReactNode;
}
export function CollapseContainer({ props, children }: CollapseContainerProps) {
  return (
    <Collapse in={props} timeout="auto" unmountOnExit>
      {children}
    </Collapse>
  );
}
