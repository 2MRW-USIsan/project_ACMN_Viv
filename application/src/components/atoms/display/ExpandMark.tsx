import { ExpandMarkType } from "@/types/components/ui";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
interface ExpandMarkProps {
  props: ExpandMarkType;
}
export function ExpandMark({ props }: ExpandMarkProps) {
  return props.isExpanded ? (
    <ExpandLessIcon fontSize={"medium"} color={"info"} />
  ) : (
    <ExpandMoreIcon fontSize={"medium"} color={"info"} />
  );
}
