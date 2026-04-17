import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
interface ExpandMarkProps {
  props: boolean;
}
export function ExpandMark({ props }: ExpandMarkProps) {
  return props ? (
    <ExpandLessIcon fontSize={"medium"} color={"info"} />
  ) : (
    <ExpandMoreIcon fontSize={"medium"} color={"info"} />
  );
}
