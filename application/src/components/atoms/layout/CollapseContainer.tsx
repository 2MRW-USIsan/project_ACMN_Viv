import { CollapseContainerType } from "@/types/components/ui";
import { Collapse } from "@mui/material";

interface CollapseContainerProps {
  props: CollapseContainerType;
  children: React.ReactNode;
}
export function CollapseContainer({ props, children }: CollapseContainerProps) {
  return (
    <Collapse in={props.isExpanded} timeout="auto" unmountOnExit>
      {children}
    </Collapse>
  );
}
