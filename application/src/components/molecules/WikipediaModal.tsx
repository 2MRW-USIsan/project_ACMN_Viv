import { WikipediaSearchResult } from "@/types/wikipedia";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";

interface WikipediaModalProps {
  open: boolean;
  result: WikipediaSearchResult | null;
  onClose: () => void;
}

export function WikipediaModal({ open, result, onClose }: WikipediaModalProps) {
  if (!result) return null;

  const summaryText = result.extract ?? result.snippet;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>{result.title}</DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 1 }}>
        <Box sx={{ display: "flex", gap: 1.5, mb: 1 }}>
          {result.thumbnail && (
            <Box
              component="img"
              src={result.thumbnail}
              alt={result.title}
              sx={{
                width: 100,
                height: 120,
                objectFit: "cover",
                flexShrink: 0,
                borderRadius: 1,
              }}
            />
          )}
          <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
            {summaryText}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 2, pb: 1.5 }}>
        <Button onClick={onClose} size="small" variant="outlined">
          閉じる
        </Button>
        <Button
          component="a"
          href={result.url}
          target="_blank"
          rel="noopener noreferrer"
          size="small"
          variant="contained"
          onClick={onClose}
        >
          Wikipedia で開く
        </Button>
      </DialogActions>
    </Dialog>
  );
}
