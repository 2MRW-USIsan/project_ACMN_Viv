import DownloadIcon from "@mui/icons-material/Download";
import { IconButton } from "@mui/material";

interface DownloadIconButtonProps {
  props: { onClick: () => void };
}

export function DownloadIconButton({
  props: { onClick },
}: DownloadIconButtonProps) {
  return (
    <IconButton size="small" onClick={onClick}>
      <DownloadIcon fontSize="small" />
    </IconButton>
  );
}
