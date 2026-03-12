import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton } from "@mui/material";

interface ContentCopyIconButtonProps {
  props: { onClick: () => void };
}

export function ContentCopyIconButton({
  props: { onClick },
}: ContentCopyIconButtonProps) {
  return (
    <IconButton size="small" onClick={onClick}>
      <ContentCopyIcon fontSize="small" />
    </IconButton>
  );
}
