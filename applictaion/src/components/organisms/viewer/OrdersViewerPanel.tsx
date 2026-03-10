"use client";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useOrdersViewer } from "@/hooks/useOrdersViewer";

export function OrdersViewerPanel() {
  const { leftText, rightText, errorMessage, refresh, applyRight } = useOrdersViewer();

  return (
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h5" component="h1">
        オーダービュー
      </Typography>

      <Stack direction="row" spacing={1}>
        <Button variant="contained" onClick={refresh}>
          更新
        </Button>
        {/* TODO: Add more control buttons when requirements are clarified */}
        <Button variant="outlined" onClick={applyRight}>
          右エリアに適用 (TODO)
        </Button>
      </Stack>

      {errorMessage && (
        <Alert severity="error" sx={{ width: "fit-content" }}>
          {errorMessage}
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid size={6}>
          <Typography variant="subtitle1" gutterBottom>
            オーダー (JSON)
          </Typography>
          <TextField
            label="オーダー情報"
            multiline
            rows={20}
            value={leftText}
            inputProps={{ readOnly: true, style: { fontFamily: "monospace" } }}
            fullWidth
          />
        </Grid>

        <Grid size={6}>
          {/* TODO: Define right text area content and controls when requirements are clarified */}
          <Typography variant="subtitle1" gutterBottom>
            (TODO: 右エリアの用途は未定義)
          </Typography>
          <TextField
            label="TODO"
            multiline
            rows={20}
            value={rightText}
            inputProps={{ readOnly: true, style: { fontFamily: "monospace" } }}
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
}
