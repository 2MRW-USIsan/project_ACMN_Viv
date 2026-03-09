"use client";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useYamlEditor } from "@/hooks/useYamlEditor";

export const YamlEditorPanel = () => {
  const { content, savedMessage, setContent, save, createNew, download } = useYamlEditor();

  return (
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h5" component="h1">
        YAMLエディタ
      </Typography>

      <Stack direction="row" spacing={1}>
        <Button variant="contained" onClick={save}>
          保存
        </Button>
        <Button variant="outlined" onClick={createNew}>
          新規
        </Button>
        <Button variant="outlined" onClick={download}>
          ダウンロード
        </Button>
        {/* TODO: Add file load (upload) button when requirements are clarified */}
      </Stack>

      {savedMessage && (
        <Alert severity="success" sx={{ width: "fit-content" }}>
          {savedMessage}
        </Alert>
      )}

      <TextField
        label="YAMLコンテンツ"
        multiline
        rows={24}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        inputProps={{ style: { fontFamily: "monospace" } }}
        fullWidth
      />
    </Box>
  );
};
